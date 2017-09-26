<template>
<div>
<div class="header">分享</div>
  <div class="box">
   
   <div class="subjectdiv">
      <textarea type="text" class="subjectinput" v-model="subject" placeholder="想说点什么..." ></textarea>
    </div>
    <div class="addressdiv">
      <img src="../assets/star.png" class="starimg" alt="">
      <input type="text" class="addressinput" v-model="address" placeholder="分享您的美食地址" maxlength="26">
    </div>
    <div class="fontinfo">分享最多六张图片，图片大小不超过2M</div>
    <div class="shareform">
        <el-upload
          action="http://127.0.0.1:3000/headphoto"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          ref="upload"
          :auto-upload="false"
          :on-change="fileChange"
          
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    
    <button class="sendbtn" @click="btnupload">发送</button>
    <Tabbar></Tabbar>
  </div>
  </div>
</template>
<!-- :http-request="uploadImg" -->
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
  computed:{
  },  
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      geshi:true,
      daxiao:true,
      fileList:'',
      address:'',
      subject:''
    }
  },
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
       fileChange(file,filelist) {
        let self = this
        let isIMG;
        
        if(file.raw.type == 'image/jpeg'||file.raw.type == 'image/png'||file.raw.type == 'image/jpg'){
          isIMG = true
        }else{
          isIMG = false
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(filelist.length>6){
          self.$message({
            message: '最多上传六张图片',
            type: 'error',
            duration:1500
          });
          filelist.splice(filelist.length-1,1)
        }else{
          if (!isIMG) {
            self.geshi = false;
            self.$message({
              message: '请上传图片',
              type: 'error',
              duration:1500
            });
            filelist.splice(filelist.length-1,1)
          }else if (!isLt2M) {
            self.daxiao = false
            self.$message({
              message: '上传图片请小于2M',
              type: 'error',
              duration:1500
            });
            filelist.splice(filelist.length-1,1)
          }else{
            console.log(filelist)
            self.fileList = filelist
          }
        }
      },
      uploadImg(){
        let self = this
        
      },
      btnupload(){
        let self = this
        console.log(self.fileList.length)
        if(self.fileList.length<1){
          let data = {
            subject:self.subject,
            address:self.address,
            username:localStorage.getItem('username')
          }
          self.$http.post('http://127.0.0.1:8888/upload',data,{emulateJSON:true}).then((res)=>{
            console.log(res.data)
          })
        }else{
          let formdata = new FormData();
          for(var i=0;i<self.fileList.length;i++){
            formdata.append('file'+i,self.fileList[i].raw);
          }
          formdata.append('cd',self.fileList.length)
          formdata.append('subject',self.subject);
          formdata.append('address',self.address);
          formdata.append('username',localStorage.getItem('username'));
          self.$http.post('http://127.0.0.1:8888/upload',formdata).then((res)=>{
            console.log(res.data)
          })
        }
      },   
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
.header{
  width:100%;
  text-align:center;
  font-size:1rem;
  color:black;
  border-bottom:1px solid #981818;
  height:30px;
  line-height:30px;
}
.sendbtn{
  background-color: #981818;
  color:white;
  float: left;
  width:100%;
  height:40px;
  line-height: 40px;
  border:1px solid #981818;
  border-radius: 7px;
  outline: none;
  font-size:1rem;
  margin-top:40px;
}
.fontinfo{
  width:100%;
  font-size:0.875rem;
  color:#515151;
  float:left;
  margin-bottom: 10px;
  margin-top:20px;
}
.subjectdiv{
  width:100%;
  height:auto;
  float:left;
  margin-top: 20px;
}
.addressdiv{
  width:100%;
  float:left;
  margin-top:20px;
}
.starimg{
  width:8%;
  float:left;
  margin-top:5px;
}
.addressinput{
  border:none;
  background-color: transparent;
  border-bottom:1px solid #981818;
  height:30px;
  float:left;
  width:92%;
  padding:0 15px;
  .sv(box-sizing,border-box);
  outline:none;
}
.subjectinput{
  padding:0 15px;
  float:left;
  outline:none;
  border:none;
  height:100px;
  width:100%;
  .sv(box-sizing,border-box);
  font-size: 1.1rem;
  background-color: transparent;
  resize:none;
  border-bottom:1px solid #981818;
}

</style>
