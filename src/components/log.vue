<template>
  <div class="box">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>  
    <div class="mouth">
    <input type="text" @click="focusInput('u')" v-model="username" class="loginput" placeholder="请输入用户名" :class="{'inputcheck':usernameCheck}">
     <input type="text" @click="focusInput('p')" v-model="password" class="loginput password" placeholder="请输入密码" :class="{'inputcheck':passwordCheck}">
    </div>
    <div class="logform">
      <button class="logbtn" @click="loggin">登录</button>
       <button class="regbtn" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  components:{
    
  },
  computed:{
  },  
  data () {
    return {
      usernameCheck:false,
      passwordCheck:false,
      username:'',
      password:''
    }
  },
  methods:{
    loggin:function(){
      let self = this
      let data = {
          username:this.username,
          password:this.password,
      }
      this.$http.post('http://127.0.0.1:8888/user',data,{emulateJSON:true}).then((res)=>{
          if(res.body=="success"){
            localStorage.setItem('username',self.username);
            self.$router.push('/home')
          }else if(res.body=="none"){
            self.$message({
              message: '账号或者密码错误',
              type: 'error',
              duration:1000
            });
          }else if(res.body=="error"){
            self.$message({
              message: '账号或者密码错误',
              type: 'error',
              duration:1000
            });
          }
          
      })
      
    },
    focusInput(key){
      if(key=="p"){
        this.passwordCheck = true
        this.usernameCheck = false
      }else{
        this.passwordCheck = false
        this.usernameCheck = true
      }
    },
    register(){
      this.$router.push('/reg')
    }
  }
}
</script>
<style scoped>
.box{
  position:relative;
}
.logo{
  text-align:center;
  float:left;
  margin-top:20px;
  width:100%;
}
.logform{
  width:100%;
  padding:0 20px;
  box-sizing:border-box;

}
.logbtn{
  background-color: #981818;
  margin-top:50px;
  width:100%;
  height: 40px;
  line-height:40px;
  border:none;
  border-radius:7px;
  color:white;
  font-size:1rem;
  outline:none;
}
.mouth{
  width:100%;
  float:left;
  box-sizing:border-box;
  padding:0 20px;
  position:relative;
}

.loginput{
  width:100%;
  padding:0 15px;
  border:none;
  border-bottom:1px solid #dadada;
  height: 30px;
  float:left;
  box-sizing:border-box;
  background-color: transparent;
  outline:none;
  margin-top:30px;
  font-size:0.875rem;
}
.inputcheck{
  border-bottom:1px solid #981818;
}
.password{
  margin-top:50px;
}
.regbtn{
  background-color: #eee;
  margin-top:30px;
  width:100%;
  height: 40px;
  line-height:40px;
  border:1px solid #981818;
  border-radius:7px;
  color:#981818;
  font-size:16px;
  outline:none;
}

</style>
