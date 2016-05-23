<template>
    <nv-head header-name="发布喧喧"
            right-btn-type="submit"
            left-btn-type="back">
    </nv-head>
    <div class="add-container">
        <div class="createForm" id="addNewEvent">
            <div class="group">
                <div class="row text-row">
                    <h3>喧喧标题</h3>
                    <input type="text" name="title" v-model="title">
                </div>
                <div class="row long_row last_row">
                    <h3 class="h3_row">喧喧内容</h3>
                    <textarea name="content" id="" v-model="content" ></textarea>
                </div>
            </div>
            <div class="group">
                <form id="uploadimgform" enctype="multipart/form-data" method="post">
                    <input id="uploadtoken" name="token" type="hidden" v-model="upLoadImgToken" />
                    <input id="uploadimg" type="file" accept="image/*" name="file"/>
                </form>
                <upload-img :images.sync="images" head-text="图片" :form-list.sync="formList"></upload-img>
            </div>
        </div>
    </div>
    <toast :toast-info="toastInfo" v-if="showToast" transition="fade"></toast>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                title:'',//活动标题
                topic_id:0,//活动所属话题id
                topic:'',//自定义话题
                content:'',
                images:[],
                imagesKey:[],
                upLoadImgToken:'',
                formList:[],
                backPath:'',
                toastInfo:{
                    icon:'icon-14',
                    text:'正在上传'
                },
                showToast:false
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            submitXuanxuan:function() {
                if (this.images.length>0) {
                    this.getUploadToken()
                }else{
                    this.submitAll()
                }
                
            },
            submitAll:function() {
                var __self = this
                var localData = utils.getUseridAndToken()
                var imagesstr = this.imagesKey.join("|*|")
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    topic_id:this.topic_id,
                    title:this.title,
                    content:this.content,
                    image:imagesstr
                }
                $.ajax({
                    url: utils.urlpre+"Noisy/addNoisy",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        __self.toastInfo.icon = 'icon-14'
                        __self.toastInfo.text = '提交成功'
                        __self.$route.router.go(__self.backPath)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            },
            getUploadToken:function() {
                var localData = utils.getUseridAndToken()
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Mussy/getUploadToken",
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
                            __self.uploadImgAndAll()
                        }
                        
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            },
            uploadImgAndAll:function() {
                if (this.formList.length>0) {
                    var __self = this
                    $('#uploadimg')[0].files = this.formList[0]
                    //this.upLoadImgValue = this.formList[0]
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
                            __self.formList.shift()
                            __self.imagesKey.push(data.key)
                            console.log(__self.imagesKey)
                            __self.uploadImgAndAll()
                            console.log(data)
                            console.log(__self.images)
                        },
                        error: function (xhr, status) {
                            console.log("error")
                        }  
                    })
                }else{
                    this.submitAll()
                }
                
            }
        },
        events:{
            'headerRightBtnClick':function() {
                this.toastInfo.icon = 'icon-14'
                this.toastInfo.text = '正在上传'
                this.showToast = true
                this.submitXuanxuan()
            },
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "chooseTag":require('../components/chooseTag.vue'),
            "uploadImg":require('../components/uploadImg.vue'),
            "toast":require('../components/toast.vue')
        }
    }
</script>

<style lang="less" scope>
@import '../assets/less/common/func.less';
@import '../assets/less/common/addNew.less';
</style>