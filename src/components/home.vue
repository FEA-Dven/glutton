<template>
  <div>
    <div class="header">首页</div>
  
  <div class="box">
  
  
    <div class="infobox" v-for="(item,index) in allInfo">
       <div class="head">
        <div class="username">{{item.username}}</div>
        
      </div>
      
      <div class="subject">{{item.subject}}</div>
      <div class="imgbox">
        <div v-for="imgs in item.imggroup">
          <img :src="imgs.imgurl" alt="">
        </div>
      </div>
      
      <div class="foot">
        <el-badge :value="item.star.length" class="item">
          <img :src="[item.likeCheck ?require('../assets/r_like.png') : require('../assets/g_like.png')]" class="iconfont" alt="" :data-id="item._id" :data-dname="item.username" :data-index="index" @click="collect">
        </el-badge>
        <el-badge :value="item.comment.length" class="item">
          <img :data-index="index" src="../assets/comment.png"  @click="showInput" class="iconfont" alt="">
        </el-badge>
        
      </div>
      <div class="sendtime">{{item.sendtime}}</div>
      <div class="address">胃食地址:{{item.address}}</div>
      <ul class="commentdiv">
        <li v-for="com in item.comment">
          <span class="user">{{com.username}}</span>
          <span class="theme">:{{com.content}}</span>
        </li>
        <div class="inputdiv" v-if="item.commentcheck">
          <input type="text" v-model="reply" class="replyinput">
          <img src="../assets/sendimg.png" @click="replymsg" :data-id="item._id" :data-addname="item.username" :data-index="index" class="sendimg" alt="">
          <img src="../assets/clear.png" :data-index="index" @click="clear" alt="" class="clearimg">
        </div>
      </ul>
      
    </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from './tabbar.vue'
export default {
  components:{
    Tabbar
  },
  computed:{
  },  
  mounted(){
    this.getAll()
  },
  data () {
    return {
      allInfo:'',
      likenum:'',
      commentnum:'',
      reply:''
    }
  },
  methods:{
    getAll(){
      let self = this 
      let url = 'http://localhost:8888/getallinfo'
      let data = {}
      self.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        res.body.forEach((item)=>{
          item.likeCheck = false
        })
        let username = localStorage.getItem('username')
        res.body.forEach((item)=>{
          for(var i=0;i<item.star.length;i++){
            if(username==item.star[i].username){
              item.likeCheck = true
            }
          }
        })
        self.allInfo = res.body
        console.log(self.allInfo)
      })
    },
    showInput(e){
      let self = this;
      self.reply = '';
      let sy = e.currentTarget.dataset.index
      self.allInfo.forEach((item,index)=>{
        item.commentcheck = false
        if(sy==index){
          item.commentcheck = true
        }
      })
    },
    replymsg(e){
      let self = this
      let addname = e.currentTarget.dataset.addname
      let id = e.currentTarget.dataset.id
      let url = 'http://localhost:8888/addcomment'
      let data = {
        addname:addname,
        username:localStorage.getItem('username'),
        id:id,
        content:self.reply
      }
      self.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        if(res.body=="success"){
          self.$message({
            message:'评论成功',
            type:'success',
            duration:1200
          })
          this.getAll()
        }

      })
    },
    clear(e){
      let self = this;
      let sy = e.currentTarget.dataset.index
      self.reply = '';
      self.allInfo.forEach((item,index)=>{
        if(sy==index){
          item.commentcheck = false
        }
      })
    },
    collect(e){
        let self = this
        let sy = e.currentTarget.dataset.index
        let _id = e.currentTarget.dataset.id
        let dname =  e.currentTarget.dataset.dname
        if(self.allInfo[sy].likeCheck){
          
          let data = {
            username:localStorage.getItem('username'),
            id:_id,
            dname:dname
          }
          self.$http.post('http://localhost:8888/deletehomeitem',data,{emulateJSON:true}).then((res)=>{
            if(res.body=="success"){
              self.$message({
                message:'取消点赞成功',
                type:'success',
                duration:1200
              })
              self.allInfo[sy].likeCheck = false;
              self.allInfo[sy].star.length -= 1
            }
          })
        }else{
          let collectdata = {
          id:self.allInfo[sy]._id,
          localname:localStorage.getItem('username'),
          username: self.allInfo[sy].username,
          subject: self.allInfo[sy].subject,
          sendtime:self.allInfo[sy].sendtime,
          imggroup: self.allInfo[sy].imggroup,
          star: self.allInfo[sy].star,
          comment: self.allInfo[sy].comment,
          address: self.allInfo[sy].address,
          commentcheck:false,
          cd:self.allInfo[sy].imggroup.length,
          starcd:self.allInfo[sy].star.length,
          comcd:self.allInfo[sy].comment.length
        }
        let url = 'http://localhost:8888/setcollect'
        self.$http.post(url,collectdata,{emulateJSON:true}).then((res)=>{
          if(res.body=='success'){
            self.$message({
              message:'收藏成功',
              type:'success',
              duration:1000
            })
            self.allInfo[sy].likeCheck = true
            self.allInfo[sy].star.length += 1
          }else{
            
          }
        })
      }
    }
    
  }
}
</script>
<style lang="less" scoped>
.sv(@style,@value){
  -webkit-@{style}:@value;
  -moz-@{style}:@value;
  -ms-@{style}:@value;
  -o-@{style}:@value;
  @{style}:@value;
}
.vs(@style,@value){
  @{style}:-webkit-@value;
  @{style}:-moz-@value;
  @{style}:-ms-@value;
  @{style}:-o-@value;
  @{style}:@value;
}
.box{
  box-sizing:border-box;
  padding:0 10px;
}
*{
  margin:0;
  padding:0;
  list-style: none;
}
.header{
  width:100%;
  text-align:center;
  font-size:1rem;
  color:black;
  border-bottom:1px solid #981818;
  height:30px;
  line-height:30px;
}
.infobox{
  width:100%;
  border:1px solid #981818;
  .sv(border-radius,7px);
  padding-bottom: 5%;
  margin-top: 20px;
  float:left;
  .head{
    margin-top:5px;
    width:100%;
    float: left;
    height: 20px;
    .username{
      float:left;
      width:50%;
      text-indent: 20px;
      height:20px;
      line-height:20px;
      color:#515151;
      font-size:0.875rem;
    }
    
  }
  .subject{
    width:100%;
    text-indent: 20px;
    height:auto;
    font-size:1rem;
    color:#000;
    float:left;
  }
  .imgbox{
    width:100%;
    padding:0 20px;
    .vs(display,flex);
    box-sizing: border-box;
    justify-content: flex-start;
    .sv(flex-wrap,wrap);
    div{
      width:33%;
      height:auto;
      margin-top:0.0625rem;
      margin-left: 0.05rem;
      img{
        height: 120px;
        width:100%;
      }
    }
    
  }
  .foot{
    width:100%;
    margin-top:20px;
    float:left;
    height:30px;
    .iconfont{
      width:30px;
      height:26px;
      float:right;
      margin-right: 10px;
    }
    .item{
      float:right;
      margin-right:10px;
    }
  }
  .sendtime{
      float:left;
      text-align:right;
      padding:0 10px;
      box-sizing:border-box;
      width:100%;
      height:20px;
      line-height:20px;
      color:#515151;
      font-size:0.875rem;
    }
    .address{
      float:left;
      text-align:left;
      padding:0 10px;
      box-sizing:border-box;
      width:100%;
      height:auto;
      color:#981818;
      font-size:1rem;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .commentdiv{
      width:100%;
      height:auto;
      padding-bottom:10px;
      padding:0 10px;
      background-color:#eee;
      float:left;
      box-sizing:border-box;
      li{
        float:left;
        width:100%;
        height:auto;
        font-size:0.875rem;
        color:#000;
        .user{
          color:#981818;
          float:left;
        }
        .theme{
          float:left;
        }
      }
    }
    .inputdiv{
      width:100%;
      box-sizing:border-box;
      margin-top:5px;
      float:left
    }
    .replyinput{
      width:70%;
      height:25px;
      float:left;
      padding:0 15px;
      box-sizing:border-box;
      border:1px solid #981818;
      .sv(border-radius,6px); 
      outline:none;
    }
    .sendimg{
      width:20px;
      height:20px;
      float:left;
      margin-left:5px;
      margin-top: 3px;
    }
    .clearimg{
      width:28px;
      height:28px;
      float:left;
      margin-left:5px;
      margin-top:-1px;
    }

}

</style>
