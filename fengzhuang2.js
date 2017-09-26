var MongoClient =require('mongodb').MongoClient;


//封装成为内部函数
function _connent(callback) {
     var url='mongodb://127.0.0.1:27017/glutton';
    //连接数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}

// 插入数据
exports.insertOne=function(collectionName,data,callback){
    _connent(function(err,db){
         db.collection(collectionName).insert(data,function(err,result){
            callback(err,result);
            db.close();
         })
    })
}

// 查找数据
exports.find = function (collectionName, json, callback) {
    var result = [];    //结果数组   
    //连接数据库，连接之后查找所有
    _connent(function (err, db) {
        var cursor = db.collection(collectionName).find(json);
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close(); //关闭数据库
                return;
            }
            if (doc != null) {
                result.push(doc);   //放入结果数组
            } else {
                //遍历结束，没有更多的文档了
                callback(null, result);
                db.close(); //关闭数据库
            }
        });
    });
}

//删除
exports.deleteMany = function (collectionName, json, callback) {
    _connent(function (err, db) {
        //删除
        db.collection(collectionName).deleteMany(
            json,
            function (err, results) {
                callback(err, results);
                db.close(); //关闭数据库
            }
        );
    });
}

//修改
exports.updateMany = function (collectionName, json1, json2, callback) {

    _connent(function (err, db) {
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err, results) {
                callback(err, results);
                db.close();
            });
    })
}

    
    

