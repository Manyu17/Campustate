<template>
    <div class="row img_row clearfix">
        <h3>图片</h3>
        <div class="imgs">
            <img v-for="item in images" v-bind:src="item" alt="">
            <div class="upload-btn">
                <a></a>
                <form id="uploadimgform" enctype="multipart/form-data" method="post">
                    <input id="uploadtoken" name="token" type="hidden" v-model="upLoadImgToken" />
                    <input id="uploadimg" type="file" accept="image/*" name="file" v-model="upLoadImgValue" @change="uploadImgChange"/>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        props: ['images','imagesKey'],
        data (){
            return {
                upLoadImgToken:'',
                upLoadImgValue:'',
                imgUploaded:{}
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            uploadImgChange:function(event) {
                var value = this.upLoadImgValue
                if (this.imgUploaded[value]==undefined) {
                    this.getUploadToken()
                    this.previewImg(event.target)
                    this.imgUploaded[value] = true
                }else{
                    alert("this is already chosen")
                }
                
            },
            getUploadToken:function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Index/getUploadToken",
                    type: "POST",
                    crossDomain: true,
                    data:localData,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        if (data.result == 'SUCCESS') {
                            if(__self.upLoadImgToken==''){
                                $("#uploadtoken").val(data.token)
                            }else{
                                __self.upLoadImgToken = data.token
                            }
                            __self.uploadImg()
                        }
                        
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            },
            uploadImg:function() {
                var __self = this
                if(__self.upLoadImgValue && $("#uploadtoken").val()){
                    var formData = new FormData($('#uploadimgform')[0])
                    $.ajax({
                        url: 'http://upload.qiniu.com',  //Server script to process data  
                        type: 'POST',  
                        //Ajax events  
                        //beforeSend: beforeSendHandler,  
                        //success: completeHandler,  
                        //error: errorHandler,  
                        // Form data  
                        data: formData,  
                        crossDomain: true,
                        //Options to tell jQuery not to process data or worry about content-type.  
                        cache: false,  
                        contentType: false,  
                        processData: false,
                        success: function (data) {
                            __self.imagesKey.push(data.key)
                            console.log(data)
                            console.log(__self.images)
                        },
                        error: function (xhr, status) {
                            console.log("error")
                        }  
                    })
                }
            },
            getObjectURL:function(file) {
                var url = null 
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) 
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) 
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) 
                }
                return url
            },
            previewImg:function(inputObj) {
                var imgkeyurl = this.getObjectURL(inputObj.files[0])
                this.images.push(imgkeyurl)
            }
        },
        events:{
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/componentBase.less';
</style>