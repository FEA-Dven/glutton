<template>
<div>
<div class="blank"></div>
  <div class="tabbar">
    <div class="tabitem" :class="{'tabcheck':indexCheck}" @click="tabclick($event,'one')"><img :src="[indexCheck ? require('../assets/r_index.png') : require('../assets/g_index.png')]" class="tabicon" alt=""><span>首页</span></div>
    <div class="tabitem" :class="{'tabcheck':sendCheck}" @click="tabclick($event,'two')"><img :src="[sendCheck ? require('../assets/r_send.png') : require('../assets/g_send.png')]" class="tabicon" alt=""><span>分享</span></div>
    <div class="tabitem" :class="{'tabcheck':mineCheck}" @click="tabclick($event,'three')"><img :src="[mineCheck ? require('../assets/r_mine.png') : require('../assets/g_mine.png')]" class="tabicon" alt=""><span>我的</span></div>
  </div>
  </div>
</template>

<script>
export default {
  components:{
    
  },
  data(){
  	return {
  	}
  },
  computed:{
    indexCheck:{
      get(){
        let RouteName = this.$route.name;
        if(RouteName=='home'){
          return true
        }else{
          false
        }
      },
      set(){

      }
    },
    sendCheck:{
      get(){
        let RouteName = this.$route.name;
        if(RouteName=='send'){
          return true
        }else{
          false
        }
      },
      set(){
        
      }
    },
    mineCheck:{
      get(){
        let RouteName = this.$route.name;
        if(RouteName=='mine'){
          return true
        }else{
          false
        }
      },
      set(){
        
      } 
    }
  },
  methods:{
  	tabclick(e,key){
  		let self = this
      let uid = true
      if(localStorage.getItem('username')==null){
        uid = false
      }
  		if(key=='one'){
        if(uid==false){
          self.$message({
            message:'请登录账号',
            type:'warning',
            duration:1200
          })
          setTimeout(function(){
            self.$router.push('/log');
           },1200)
        }else{
          this.$router.push('/home')
        }
  		}else if(key=='two'){
        if(uid==false){
          self.$message({
            message:'请登录账号',
            type:'warning',
            duration:1200
          })
          setTimeout(function(){
            self.$router.push('/log');
           },1200)
        }else{
          this.$router.push('/send')  
        }
  		}else{
        if(uid==false){
          self.$message({
            message:'请登录账号',
            type:'warning',
            duration:1200
          })
          setTimeout(function(){
            self.$router.push('/log');
           },1200)
        }else{
          this.$router.push('/mine')
        }
  		}
  	}
  }
}
</script>

<style lang="less">
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
.tabbar{
	width: 100%;
	border:1px solid #dadada;
	height: 40px;
	position: fixed;
	z-index: 2;
	bottom: 0px;
	left: 0;
	.vs(display,flex);
	.sv(flex-direction,row);
	flex-wrap: nowrap;
  background-color: white;
}
.tabitem{
	 .vs(display,flex);
	 flex:1;
	 width:0;
	 text-align: center;
 	 justify-content: center;
	 align-items: center;
	 font-size: 14px;
	 color:#515151;  
}
.tabcheck{
	color:#981818;
}
.tabicon{
	 width:20px;
	 height:20px;
}
.blank{
  width:100%;
  box-sizing: border-box;
  float: left;
  height: 50px;
}
</style>