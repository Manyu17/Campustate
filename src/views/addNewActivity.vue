<template>
    <nv-head header-name="发布活动"
            right-btn-type="submit"
            left-btn-type="back">
    </nv-head>
    <div class="add-container">
        <div class="createForm" id="addNewEvent">
            <div class="group">
                <div class="row text-row">
                    <h3>活动标题</h3>
                    <input type="text" name="title" v-model="title">
                </div>
            </div>
            <div class="group">
                <div class="row text-row">
                    <h3>活动开始时间</h3>
                    <input class="align-right" type="text" name="start" v-model="start" @click="showCalendar">
                </div>
                <div class="row text-row">
                    <h3>活动结束时间</h3>
                    <input class="align-right" type="text" name="end" v-model="end" @click="showCalendar">
                </div>
                <div class="row text-row">
                    <h3>报名截止时间</h3>
                    <input class="align-right" type="text" name="apply_end" v-model="apply_end">
                </div>
                <div class="row text-row">
                    <h3>活动地点</h3>
                    <input type="text" name="place" v-model="place">
                </div>
            </div>
            <div class="group">
                <div class="row text-row">
                    <h3>是否需要报名</h3>
                    <span class="icon iconfont icon-xuanzhong" :class="{'active':need_apply}" @click="needApply"></span>
                    <!-- <input type="checkbox" name="need_apply" v-model="need_apply"> -->
                </div>
                <div class="row text-row">
                    <h3>是否需要参与者填写手机号</h3>
                    <span class="icon iconfont icon-xuanzhong" :class="{'active':phone_needed}" @click="needPhone"></span>
                    <!-- <input type="checkbox" name="phone_needed" v-model="phone_needed"> -->
                </div>
                <div class="row text-row">
                    <h3>是否有名额限制</h3>
                    <span class="icon iconfont icon-xuanzhong" :class="{'active':require_need}" @click="needRequire"></span>
                    <!-- <input type="checkbox" name="require_need" v-model="require_need"> -->
                </div>
                <div class="row text-row" v-if="require_need">
                    <h3>填写限制人数</h3>
                    <input class="align-right" type="text" name="require" v-model="require">
                </div>
            </div>
            <div class="group">
                <div class="row long_row last_row">
                    <h3 class="h3_row">详情</h3>
                    <textarea name="content" v-model="content" ></textarea>
                </div>
            </div>
            <div class="group">
                <choose-tag></choose-tag>
            </div>
            <div class="group">
                <form id="uploadimgform" enctype="multipart/form-data" method="post">
                    <input id="imgtoken" name="token" type="hidden" v-model="upLoadImgToken" />
                    <input id="uploadimg" type="file" accept="image/*" name="file"/>
                </form>
                <upload-img :images.sync="images" head-text="图片" :form-list.sync="formList"></upload-img>
            </div>
            <div class="group">
                <form id="uploadcoverform" enctype="multipart/form-data" method="post">
                    <input id="covertoken" name="token" type="hidden" v-model="upLoadImgToken" />
                    <input id="uploadcover" type="file" accept="image/*" name="file"/>
                </form>
                <upload-img :images.sync="cover" head-text="封面" :images-num=1 :form-list.sync="formCover"></upload-img>
            </div>
        </div>
        <calendar v-if="calendar.show" :show.sync="calendar.show" :value.sync="calendar.value" :x="calendar.x" :y="calendar.y" :begin.sync="calendar.begin" :end.sync="calendar.end" :range="calendar.range" :valuestart.sync="start" :valueend.sync="end"></calendar>
       
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
                start:'',//活动开始时间
                end:'',//活动结束时间
                apply_end:'',//报名截止时间
                place:'',//活动地点
                need_apply:'',//是否需要报名
                phone_needed:'',//是否需要报名者填写联系电话
                topic_id:'',//活动所属话题id
                topic:'',//自定义话题
                require_need:'',//是否有名额限制
                require:'',//活动所需人数
                content:'',
                images:[],
                cover:[],
                coverKey:[],
                imagesKey:[],
                upLoadImgToken:'',
                formList:[],
                formCover:[],
                calendar:{
                    show:false,
                    type:"date",   //date datetime
                    value:"2016/3/26 ~ 2016/3/28",
                    begin:"2016/3/26",
                    end:"2016/3/28",
                    x:0,
                    y:0,
                    range:true    //是否多选
                },
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
            submitEvent:function() {
                var __self = this
                if(this.cover.length>0){
                    this.toastInfo.icon = 'icon-14'
                    this.toastInfo.text = '正在上传'
                    this.showToast = true
                    this.getUploadToken()
                }else{
                    this.toastInfo.icon = 'icon-14'
                    this.toastInfo.text = '必须上传封面'
                    this.showToast = true
                    setTimeout(__self.hideToast,2000)
                }
            },
            submitAll:function() {
                var __self = this
                var localData = utils.getUseridAndToken()
                var imagesstr = this.imagesKey.join("|*|")
                var coverstr = this.coverKey[0]
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    topic_id:this.topic_id,
                    title:this.title,
                    start:this.start,
                    end:this.end,
                    apply_end:this.apply_end,
                    place:this.place,
                    require:this.require,
                    content:this.content,
                    image:imagesstr,
                    cover:coverstr
                }
                userdata.need_apply = this.need_apply==true?1:0
                userdata.phone_needed = this.phone_needed==true?1:0
                if (!userdata.topic_id) {userdata.topic_id = 0}
                userdata.topic_id
                $.ajax({
                    url: utils.urlpre+"Activity/addActivity",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        __self.toastInfo.icon = 'icon-14'
                        __self.toastInfo.text = '上传成功'
                        __self.$route.router.go(__self.backPath)
                    },
                    error: function (xhr, status) {
                        __self.toastInfo.icon = 'icon-14'
                        __self.toastInfo.text = '上传失败'
                        setTimeout(__self.hideToast,2000)
                    }
                })
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
                                $("#imgtoken").val(data.token)
                                $("#covertoken").val(data.token)
                            }else{
                                __self.upLoadImgToken = data.token
                            }
                            __self.uploadCover()
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
                
            },
            uploadCover:function() {
                if(this.formCover.length>0){
                    var __self = this
                    $('#uploadcover')[0].files = this.formCover[0]
                    var formData = new FormData($('#uploadcoverform')[0])
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
                            __self.coverKey.push(data.key)
                            __self.uploadImgAndAll()
                            console.log(data)
                        },
                        error: function (xhr, status) {
                            console.log("error")
                        }  
                    })
                }
            },
            showCalendar:function(e){
                e.stopPropagation();
                var that=this;
                that.calendar.show=true;
                that.calendar.x=e.target.offsetLeft;
                that.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
                var bindHide=function(e){
                    e.stopPropagation();
                    that.calendar.show=false;
                    document.removeEventListener('click',bindHide,false);
                };
                setTimeout(function(){
                    document.addEventListener('click',bindHide,false);
                },500);
            },
            hideToast:function() {
                this.showToast = false
            },
            needApply:function() {
                this.need_apply = !this.need_apply
            },
            needPhone:function() {
                this.phone_needed = !this.phone_needed
            },
            needRequire:function() {
                this.require_need = !this.require_need
            }
        },
        events:{
            'headerRightBtnClick':function() {
                this.submitEvent()
            },
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "chooseTag":require('../components/chooseTag.vue'),
            "uploadImg":require('../components/uploadImg.vue'),
            "calendar":require('../components/calendar.vue'),
            "toast":require('../components/toast.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/addNew.less';
@import '../assets/less/common/transition.less';
</style>