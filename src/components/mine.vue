<template>
<div>
  <div class="header">我的</div>
  <div class="box">
    <div class="mineinfo">
      <div class="headphoto">
        <img src="../assets/userphoto.png" class="userphoto" alt="">
      </div>
      <div class="userdiv">
        <span class="name">{{username}}</span>

      </div>
    </div>
    <div class="tabpane">
      <div class="tabitem" :class="{'tabcheck':sendActive}" @click="getSend">已发送</div>
      <div class="tabitem" :class="{'tabcheck':collectActive}" @click="getCollect">已收藏</div>
    </div>
    <ul class="selectbox">
      <li class="infobox" v-for="(item,index) in allInfo">
      <div class="head">
        <div class="username">{{item.username}}</div>
        <img src="../assets/clear.png" class="likeicon" :data-dname="item.username" :data-id="item._id" @click="deleteItem" :data-index="index" alt="">
      </div>
      <div class="subject">{{item.subject}}</div>
      <div class="imgbox">
        <div v-for="imgs in item.imggroup">
          <img :src="imgs.imgurl" alt="">
        </div>
      </div>
      <div class="sendtime">{{item.sendtime}}</div>
      <div class="address">胃食地址:{{item.address}}</div>
      </li>
    </ul>
    <Tabbar></Tabbar>
  </div>
</div>
</template>

<script>
import Tabbar from './tabbar.vue'
export default {
  components:{
    Tabbar
  },
  beforeMount(){
    let self = this
    if(localStorage.getItem('username')==null){
       self.$message({
        message:'请登录账号',
        type:'warning',
        duration:1200
      })
       setTimeout(function(){
        self.$router.push('/log');
       },1200)
    }
  },
  mounted(){
    this.getAll()
  },
  computed:{
    username:{
      get(){
        return localStorage.getItem('username')
      },
      set(){
        
      }
    }
  },  
  data () {
    return {
      sendActive:true,
      collectActive:false,
      allInfo:'',
    }
  },
  methods:{
    getSend(){
      this.sendActive = true
      this.collectActive = false 
      let self = this 
      let url = 'http://localhost:8888/mysend'
      let data = {
        username:localStorage.getItem('username')
      }
      self.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        self.allInfo = res.body
      })
    },
    getCollect(){
      this.sendActive = false
      this.collectActive = true 
      let self = this 
      let url = 'http://localhost:8888/mycollect'
      let data = {
        username:localStorage.getItem('username')
      }
      self.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        self.allInfo = res.body
        console.log(res.body)
      })
    },
    getAll(){
      let self = this 
      let url = 'http://localhost:8888/mysend'
      let data = {
        username:localStorage.getItem('username')
      }
      self.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        self.allInfo = res.body
        console.log(self.allInfo)
      })
    },
    deleteItem(e){
      let sy = e.currentTarget.dataset.index;
      let self = this 
      
      let data = {
        username:localStorage.getItem('username'),
        index:sy,
        id:e.currentTarget.dataset.id,
        dname:e.currentTarget.dataset.dname
      }
      self.$http.post('http://localhost:8888/deleteitem',data,{emulateJSON:true}).then((res)=>{
        if(res.body=="success"){
          self.$message({
            message:'删除成功',
            type:'success',
            duration:1200
          })
          self.allInfo.splice(sy,1);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
*{
  margin:0;
  padding:0;
  list-style: none;
}
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
  position:relative;
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
.mineinfo{
  width:100%;
  padding:0 15px;
  box-sizing:border-box;
  background-color: #981818;
  height:160px;
}
.headphoto{
  width:50%;
  float:left;
  text-align:center;
  height:160px;
}
.userphoto{
  border-radius:50%;
  width:80px;
  height:80px;
  margin-top:40px;
}
.userdiv{
  width:50%;
  float:left;
  height: 160px;
 
}
.name{
  color:white;
  font-size:1rem;
  width:100%;
  text-align:left;
  height: 20px;
  line-height:20px;
  margin-top:70px;
  float:left;
}
.tabpane{
  width:100%;
  height: 40px;
  float:left;
  padding:0 15px;
  box-sizing:border-box;
}
.tabitem{
  width:50%;
  height: 40px;
  float:left;
  text-align:center;
  line-height:40px;
  font-size:0.875rem;
  box-sizing:border-box;
}
.tabcheck{
  border-bottom:1px solid #981818;
}
.selectbox{
  width:100%;
  float:left;
  height:auto;
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
      text-indent: 10px;
      height:20px;
      line-height:20px;
      color:#515151;
      font-size:0.875rem;
    }
    
  }
  .subject{
    width:100%;
    text-indent: 10px;
    height:auto;
    font-size:1rem;
    color:#000;
    float:left;
  }
  .likeicon{
    width:30px;
    height:30px;
    float:right;
    margin-right:10px;
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
      text-align:left;
      padding:0 10px;
      box-sizing:border-box;
      width:100%;
      height:20px;
      line-height:20px;
      color:#515151;
      font-size:0.875rem;
      margin-top:10px;
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
