<template>
  <div class="box">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>  
    <div class="mouth">
    <input type="text" @click="focusInput('u')" v-model="username" class="loginput" placeholder="请输入用户名" :class="{'inputcheck':usernameCheck}">
     <input type="text" @click="focusInput('p')" v-model="password" class="loginput password" placeholder="请输入密码" :class="{'inputcheck':passwordCheck}">
     <input type="text" @click="focusInput('cp')" v-model="cfpassword" class="loginput password" placeholder="请输入密码" :class="{'inputcheck':cfpasswordCheck}">
    </div>
    <div class="logform">
      <button class="logbtn" @click="register">注册</button>
       <button class="regbtn" @click="loggin">登录</button>
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
      cfpasswordCheck:false,
      username:'',
      password:'',
      cfpassword:''
    }
  },
  methods:{
    register:function(){
      let self = this
      if(self.password !== self.cfpassword){
        self.$message({
          message: '两次密码不相等',
          type: 'error',
          duration:2000
        });
      }else{
        let data = {
          username:this.username,
          password:this.password,
        }
        this.$http.post('http://127.0.0.1:8888/reg',data,{emulateJSON:true}).then((res)=>{
            console.log(res)
            if(res.body=="success"){
              self.$message({
                message: '注册成功',
                type: 'success',
                duration:1000
              });
              setTimeout(function(){
                self.$router.push('/log')
              },1000)
            }else if(res.body=="have"){
              self.$message({
                message: '此账号已被注册',
                type: 'error',
                duration:1000
              });
            }
            
            
        })
      }
    },
    loggin(){
      this.$router.push('/log')
    },
    focusInput(key){
      if(key=="p"){
        this.passwordCheck = true
        this.usernameCheck = false
        this.cfpasswordCheck = false
      }else if(key=="u"){
        this.passwordCheck = false
        this.usernameCheck = true
        this.cfpasswordCheck = false
      }else{
        this.passwordCheck = false
        this.usernameCheck = false
        this.cfpasswordCheck = true
      }
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
