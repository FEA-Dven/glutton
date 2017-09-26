const express = require('express');
const app = express()
const formidable = require('formidable')
const request = require('request')
const util = require('util')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const db =require('./fengzhuang2.js')
const ObjectId = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({extended:false}))
app.use('/user',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username;
	let password = req.body.password;
	let checkname = {username:username}
	db.find('user',checkname,function(err,result){
		if(err) console.log(err)
		console.log(result[0])
		if(result[0]==undefined){
			res.send('none')
		}else if(result[0].password!==password){
			res.send('error')
		}else{
			res.send('success')
		}
	})
	
})

app.use('/reg',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username;
	let password = req.body.password;
	let send = [];
	let collect = [];
	let qc = {
		username:username
	}
	db.find('user',qc,function(err,result){
        if(err){
            console.log(err)
        }
        if(result!=''){
        	res.send('have')
        }else{
        	let data = {
				username:username,
				password:password,
				sendinfo:send,
				collectinfo:collect
			}
			db.insertOne('user',data,function(err,result){
		        if(err){
		            console.log(err)
		        }
		        res.send('success');
		    })
        }
    })
})

app.use('/getallinfo',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let name = {};
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let allinfo = [];
		result.forEach((item,index)=>{
			for(var i=0;i<result[index].sendinfo.length;i++){
				allinfo.push(result[index].sendinfo[i])
			}
		}) 
		
		allinfo.sort(function(a,b){
		    return Date.parse(a.sendtime) - Date.parse(b.sendtime);//时间正序
		});
		allinfo.reverse()
		res.send(allinfo)
	})
	
})

app.use('/mysend',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username;
	let name = {
		username:username
	}
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let sendArr = [];
		result[0].sendinfo.forEach((item)=>{
			sendArr.push(item)
		})
		res.send(sendArr)
	})
})

app.use('/mycollect',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let name = {
		username:req.body.username
	}
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let collectArr = [];
		result[0].collectinfo.forEach((item)=>{
			collectArr.push(item)
		})
		res.send(collectArr)
	})
})

app.use('/setcollect',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let name = {
		username:req.body.localname
	}
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let cArr = result[0].collectinfo
		let cdata = {
			_id:req.body.id,
			username: req.body.username,
	        subject: req.body.subject,
	        sendtime:req.body.sendtime,
	        imggroup: [],
	        address: req.body.address,
	        commentcheck:false
		}

		for(var i=0;i<req.body.cd;i++){
			let imgobj = {
				id:req.body['imggroup['+i+'][id]'],
				imgurl:req.body['imggroup['+i+'][imgurl]'],
			}
			cdata.imggroup.push(imgobj)
		}
		cArr.push(cdata)
		db.updateMany(
			"user",
			{
				username:req.body.localname
			},
			{
				$set:{ collectinfo: cArr}
			},
			function(err,result){  
                if(err){
                    console.log(err);
                }
			    let oname = {
					username:req.body.username,
				}
				db.find('user',oname,function(err,result){
					if(err) console.log(err)
					let _obj = result
					for(var i=0;i<_obj[0].sendinfo.length;i++){
						if(_obj[0].sendinfo[i].subject==req.body.subject){
							_obj[0].sendinfo[i].star.push(name)
						}
					}
					db.updateMany(
						"user",
						{
							username:req.body.username
						},
						{
							$set:{ sendinfo: _obj[0].sendinfo}
						},
						function(err,result){  
			                if(err){
			                    console.log(err);
			                }
			                res.send('success');
			            }
					)
				})           


			}
		)
	})
	
	
})

app.use('/upload',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username
	let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + date.getHours() + seperator2+ date.getMinutes()+ seperator2 + date.getSeconds();
	let timestamp = Date.parse(new Date(currentdate));
	if(req.body.subject!=undefined){
		let data = {
			_id:ObjectId(),
			username: username,
	        subject: req.body.subject,
	        sendtime:currentdate,
	        imggroup: [],
	        star: [],
	        comment: [],
	        address: req.body.address,
	        commentcheck:false
			}
		let name = {username:username}
		db.find('user',name,function(err,result){
			if(result[0].sendinfo==undefined){
				res.send('nopeople')
			}else{
				let arr = result[0].sendinfo
				arr.push(data)
				db.updateMany(
                    "user",
                    {
                        username:username
                    },
                    {
                        $set:{ sendinfo: arr}     //怎么改
                    },
                    function(err,result){   //改完之后做什么
                        if(err){
                            console.log(err);
                        }
                        res.send('success');
                    }
                );
			}
		})
	}else{
		var form = new formidable.IncomingForm();
	    // 第二步：设置我们的上传路径
	    form.uploadDir = "./uploads";
	    // 第三步：设置全部上传完毕后的执行函数
	    form.parse(req, function (err, fields, files) {
	    	let mydata = {
	    		_id:ObjectId(),
	    		username: fields.username,
		        subject: fields.subject,
		        sendtime:currentdate,
		        imggroup: [],
		        star: [],
		        comment: [],
		        address: fields.address,
		        commentcheck:false
	    	}
	    	let cd = fields.cd
	    	let name = {
	    		username:fields.username
	    	}
	    	for(var i=0;i<cd;i++){
	    		let oldpath = files['file'+i].path;
		        let extname = path.extname(files['file'+i].name);
		        let newpath = oldpath + extname;
		        let imgurl = '../../' + oldpath + extname;
		        let id = '00'+(i+1)
		        let infodata = {
			        	id:id,
			        	imgurl:imgurl
			        }
		        mydata.imggroup.push(infodata)
		        
		        fs.rename(oldpath, newpath, function (err) {
		            if (err) {
		               console.log('error')
		            }
		        })
	    	}
	    	db.find('user',name,function(err,result){
	    		if(err) console.log(err)
	    		let arr = result[0].sendinfo
				arr.push(mydata)
				db.updateMany(
                    "user",
                    {
                        username:fields.username
                    },
                    {
                        $set:{ sendinfo: arr}    
                    },
                    function(err,result){   
                        if(err){
                            console.log(err);
                        }
                        res.send('success');
                    }
                );
	    	})
	    })	
	}
})

app.use('/deletehomeitem',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username;
	let id = req.body.id;
	let dname = req.body.dname;
	let delname = {
		username:dname
	}
	let name = {
		username:username
	}
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let arr = result[0].collectinfo
		arr.forEach((item,index)=>{
			if(item._id == id){
				if(result[0].collectinfo.length<1){
					arr = []
				}else{
					arr.splice(index,1)
				}
			}
		})
		db.updateMany(
			'user',
			{
				username:username
			},
			{
				$set:{
					collectinfo:arr
				}
			},
			function(err,result){
				if(err) console.log(err)
				db.find('user',delname,function(err,result){
					if(err) console.log(err)
					let sendArr = result[0].sendinfo;
					for(var i=0;i<sendArr.length;i++){
						if(sendArr[i]._id==id){
							for(var j=0;j<sendArr[i].star.length;j++){
								if(sendArr[i].star[j].username==username){
									sendArr[i].star.splice(j,1)
								}
							}
						}
					}
					db.updateMany(
						'user',
						{
							username:dname
						},
						{
							$set:{sendinfo:sendArr}
						},
						function(err,result){
							if(err) console.log(err)
							res.send('success')
						}
					)
				})
			}
		)
	})
})

app.use('/deleteitem',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let username = req.body.username;
	let index = req.body.index;
	let id = req.body.id
	let dname = req.body.dname
	let name = {
		username:username
	}
	let delname = {
		username:dname
	}

	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let arr = [];
		if(arr.length==1){
			arr.splice(0,arr.length)
		}else{
			arr = []
		}
 		db.updateMany(
 			'user',
 			{
 				username:username,
 			},
 			{
 				$set:{collectinfo:arr}
 			},
 			function(err,result){
 				if(err){
                    console.log(err);
                }
                db.find('user',delname,function(err,result){
                	if(err) console.log(err)
                	let _obj = result[0].sendinfo;
                	for(var i=0;i<_obj.length;i++){
                		if(_obj[i]._id==id){
                			for(var j=0;j<_obj[i].star.length;j++){
                				if(_obj[i].star[j].username==username){
                					_obj[i].star.splice(j,1)
                				}
                			}
                		}else{
                			console.log('none')
                		}
                	}
					db.updateMany(
							'user',
							{
								username:dname
							},
							{
								$set:{sendinfo:_obj}
							},
							function(err,result){
								if(err) console.log(err)
								res.send('success')
							}
						)
                })
 			}
 		)
	})
})

app.use('/addcomment',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	let addname = req.body.addname
	let id = req.body.id
	let username = req.body.username
	let content = req.body.content
	let name = {
		username:addname
	}
	let comdata = {
		username:username,
		content:content
	}
	db.find('user',name,function(err,result){
		if(err) console.log(err)
		let arr = result[0].sendinfo;
		for(var i=0;i<arr.length;i++){
			if(arr[i]._id==id){
				arr[i].comment.push(comdata)
			}
		}
		db.updateMany(
			'user',
			{
				username:addname
			},
			{
				$set:{sendinfo:arr}
			},
			function(err,result){
				if(err) console.log(err)
				res.send('success')
			}
		)
	})
})

app.listen(8888,'127.0.0.1')