<template>
    <nv-head header-name="发布活动"
            right-btn-type="submit"
            left-btn-type="back">
    </nv-head>
    <div class="add-container">
        <div class="createForm" id="addNewEvent">
            <div class="group">
                <div class="row">
                    <h3>活动标题</h3>
                    <input type="text" name="title" v-model="title">
                </div>
            </div>
            <div class="group">
                <div class="row">
                    <h3>活动开始时间</h3>
                    <input type="text" name="start" v-model="start">
                </div>
                <div class="row">
                    <h3>活动结束时间</h3>
                    <input type="text" name="end" v-model="end">
                </div>
                <div class="row">
                    <h3>报名截止时间</h3>
                    <input type="text" name="apply_end" v-model="apply_end">
                </div>
                <div class="row">
                    <h3>活动地点</h3>
                    <input type="text" name="place" v-model="place">
                </div>
            </div>
            <div class="group">
                <div class="row">
                    <h3>是否需要报名</h3>
                    <input type="radio" name="need_apply" v-model="need_apply">
                </div>
                <div class="row">
                    <h3>是否需要参与者填写手机号</h3>
                    <input type="radio" name="phone_needed" v-model="phone_needed">
                </div>
                <div class="row">
                    <h3>是否有名额限制</h3>
                    <input type="radio" name="require_need" v-model="require_need">
                </div>
                <div class="row">
                    <h3>填写限制人数</h3>
                    <input type="text" name="require" v-model="require">
                </div>
            </div>
            <div class="group">
                <div class="row long_row last_row">
                    <h3 class="h3_row">详情</h3>
                    <textarea name="content" id="" v-model="content" ></textarea>
                </div>
            </div>
            <div class="group">
                <choose-tag></choose-tag>
            </div>
            <div class="group">
                <upload-img :images.sync="images" :images-key.sync="imagesKey" head-text="图片"></upload-img>
            </div>
            <div class="group">
                <upload-img :images.sync="cover" :images-key.sync="coverKey" head-text="封面" :images-num=1></upload-img>
            </div>
        </div>
        <div>
            <input type="text" @click="showCalendar" v-model="calendar.value" placeholder="请输入日期">
            <calendar :show.sync="calendar.show" :value.sync="calendar.value" :x="calendar.x" :y="calendar.y" :begin.sync="calendar.begin" :end.sync="calendar.end" :range="calendar.range" :valuestart.sync="start" :valueend.sync="end"></calendar>
        </div>
    </div>
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
                apply_end:-1,//报名截止时间
                place:'',//活动地点
                need_apply:0,//是否需要报名
                phone_needed:0,//是否需要报名者填写联系电话
                topic_id:0,//活动所属话题id
                topic:'',//自定义话题
                require_need:0,//是否有名额限制
                require:0,//活动所需人数
                content:'',
                images:[],
                cover:[],
                coverKey:[],
                imagesKey:[],
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
                backPath:''
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
                    images:imagesstr
                }
                userdata.need_apply = this.need_apply=='on'?1:0
                userdata.phone_needed = this.phone_needed=='on'?1:0
                console.log(userdata.need_apply)
                $.ajax({
                    url: utils.urlpre+"Activity/addActivity",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
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
            "calendar":require('../components/calendar.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/addNew.less';
</style>