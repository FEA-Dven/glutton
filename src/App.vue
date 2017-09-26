<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components:{
    
  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;  
  font-size:62.5%;
}
.el-badge__content.is-fixed {
      top: 0;
      right: 20px;
      position: absolute;
      -webkit-transform: translateY(-50%) translateX(100%);
      transform: translateY(-50%) translateX(100%);
    }
.el-dialog--tiny {
    width: 80%;
    top:20% !important;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 30%;
    height: 80px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 30%;
    height: 80px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    position:relative;
}
.el-upload--picture-card i {
    font-size: 28px;
    color: #8c939d;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -14px;
    margin-left: -14px;
}
</style>