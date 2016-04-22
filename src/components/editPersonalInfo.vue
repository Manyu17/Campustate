<template>
<div>
<div class="add-container">
    <div class="createForm" id="addNewEvent">
        <div class="group headpic">
            <form id="uploadimgform" enctype="multipart/form-data" method="post">
                <input id="uploadtoken" name="token" type="hidden" v-model="upLoadImgToken" />
                <input id="uploadimg" type="file" accept="image/*" name="file"/>
            </form>
            <change-head-pic :images.sync="images" head-text="头像" :form-list.sync="formList"></change-head-pic>
        </div>
        <div class="group">
            <div class="row text-row">
                <h3>性别</h3>
                <input class="align-right" type="text" name="gender" v-model="infoData.gender|getGenderStr" disabled>
            </div>
            <div class="row text-row">
                <h3>学院</h3>
                <input class="align-right" type="text" name="department" v-model="infoData.department" disabled>
            </div>
            <div class="row text-row">
                <h3>年级</h3>
                <input class="align-right" type="text" name="grade" v-model="infoData.grade" disabled>
            </div>
            <div class="row text-row">
                <h3>地区</h3>
                <input class="align-right" type="text" name="place" v-model="infoData.place">
            </div>
            <div class="row text-row">
                <h3>是否公开个人资料</h3>
                <input class="align-right" type="text" name="is_public" v-model="infoData.is_public|getSecretStr" @click.prevent="showSelectBox">
            </div>
        </div>
        <div class="group">
            <div class="row text-row">
                <h3>昵称</h3>
                <input class="align-right" type="text" name="nickname" v-model="infoData.nickname">
            </div>
            <div class="row long_row last_row">
                <h3 class="h3_row">心情</h3>
                <textarea name="introduction" id="" v-model="infoData.introduction" ></textarea>
            </div>
        </div>
    </div>
</div>
<mask v-if="showMask"></mask>
<select-box :choose-list="chooseList" :show-box.sync="showSelect" v-if="showSelect"></select-box>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['infoData'],
        data (){
            return {
                images:this.infoData.header,
                imagesKey:'',
                upLoadImgToken:'',
                formList:'',
                backPath:'',
                showMask:false,
                showSelect:false,
                chooseList:'',
                hideList:['保密','公开']
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
            showSelectBox:function() {
                this.showMask = true
                this.chooseList = this.hideList
                this.showSelect = true
            },
            submitEvent:function() {
                if(this.formList){
                    this.$dispatch('showToast','start')
                    this.getUploadToken()
                }else{
                    this.submitAll()
                }
                
            },
            submitAll:function() {
                var __self = this
                var localData = utils.getUseridAndToken()
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    place:this.infoData.place,
                    nickname:this.infoData.nickname,
                    introduction:this.infoData.introduction,
                    is_public:this.infoData.is_public
                }
                //userdata.is_public = this.infoData.is_public=='公开'?0:1

                $.ajax({
                    url: utils.urlpre+"User/updateInfo",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        __self.$dispatch('showToast','success')
                    },
                    error: function (xhr, status) {
                        __self.$dispatch('showToast','fail')
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
            uploadImgAndAll:function() { //上传云存储 获取key
                var __self = this
                $('#uploadimg')[0].files = this.formList
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
                        __self.imagesKey = data.key
                        __self.submitHead()
                    },
                    error: function (xhr, status) {
                        console.log("error")
                    }  
                })
            },
            submitHead:function() {
                var __self = this
                var localData = utils.getUseridAndToken()
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    header:this.imagesKey
                }
                $.ajax({
                    url: utils.urlpre+"User/updateHeader",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        __self.submitAll()
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            }
        },
        events:{
            'selected':function(current) {
                this.infoData.is_public = current
                this.showMask = false
                this.showSelect = false
            },
            'submitEdit':function() {
                this.submitEvent()
            }
        },
        components:{
            "nvHead":require('./header.vue'),
            "changeHeadPic":require('./changeHeadPic.vue'),
            "selectBox":require('./selectBox.vue'),
            "mask":require('./mask.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/addNew.less';
.headpic .row.img_row .imgs{
    text-align: right;
    padding-right: 20px;
    padding-top: 16px;
    float: none;
    width: auto;
    margin-top: 0;
    flex:1;
}
.add-container .row.img_row{
    .flexbox();
}
input:disabled{
    background-color: transparent;
    color: @font-gray3;
}
</style>