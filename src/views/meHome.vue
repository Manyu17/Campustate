<template>
    <nv-head :header-name="headerText"
            :right-btn-type="rightBtnType"
            :left-btn-type="leftBtnType">
    </nv-head>
    <div class="me-container" v-if="!editMode">
        <me-base-info :base-data="baseData"></me-base-info>
        <div class="me-nav">
            <a v-link="{name:'meHome',query:{tab:'info'}}" :class="{'current':currentTab=='info'}">资料</a>
            <a v-link="{name:'meHome',query:{tab:'xuanxuan'}}" :class="{'current':currentTab=='xuanxuan'}">喧喧</a>
            <a v-link="{name:'meHome',query:{tab:'activity'}}" :class="{'current':currentTab=='activity'}">活动</a>
        </div>
        <div class="list-box">
            <personal-info v-if="currentTab=='info'" :info-data="infoData" transition="fade" :edit-mode.sync="editMode"></personal-info>
            <xuanxuan-list v-if="currentTab=='xuanxuan'" :xuanxuanitems="xuanxuanitems" transition="fade" ></xuanxuan-list>
            <activity-list v-if="currentTab=='activity'" :activityitems="activityitems" transition="fade"></activity-list>
        </div>
    </div>
    <edit-personal-info :info-data.sync="infoData" v-if="editMode"></edit-personal-info>
    <nv-foot :footeritems="footeritems" :if-main-footer="true" v-if="!editMode"></nv-foot>
    <toast :toast-info="toastInfo" v-if="showToast" transition="fade"></toast>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'',
                rightBtnType:'setting',
                leftBtnType:'addFriend',
                footeritems:[
                    {
                        class:'icon-tool',
                        text:'工具',
                        link:'toolsHome'
                    },
                    {
                        class:'icon-message',
                        text:'校园圈',
                        link:{name:'home',query:{tab:'topicList'}}
                    },
                    {
                        class:'icon-geren01',
                        text:'我',
                        link:{name:'meHome',query:{tab:'info'},params:{username:utils.getUseridAndToken().user_id}},
                        current:true
                    }
                ],
                currentTab:'',
                searchKey:{},
                baseData:'',
                infoData:'',
                xuanxuanitems:'',
                activityitems:'',
                editMode:false,
                toastInfo:{
                    icon:'icon-14',
                    text:'正在上传'
                },
                showToast:false
            }
        },
        ready(){
        },
        attached(){
            
        },
        route:{
            data (transition){
                let query = transition.to.query,tab = query.tab
                if(tab){
                    switch(tab){
                        case 'info':
                            this.headerText = ""
                            this.currentTab = 'info'
                            if(!this.infoData){
                                this.initSearchKey('info')
                                this.getUserInfo(this.searchKey)
                            }
                            break
                        case 'xuanxuan':
                            this.headerText = "喧喧"
                            this.currentTab = 'xuanxuan'
                            if(!this.xuanxuanitems){
                                this.initSearchKey('noisy')
                                this.getUserInfo(this.searchKey)
                            }
                            break
                        case 'activity':
                            this.headerText = "活动"
                            this.currentTab = 'activity'
                            if(!this.activityitems){
                                this.initSearchKey('activity')
                                this.getUserInfo(this.searchKey)
                            }
                            break
                        
                    }
                }
            }
        },
        methods:{
            initSearchKey:function(type) {
                if(this.searchKey.top == undefined){
                    this.searchKey = {
                        top:1
                    }
                }else{
                    this.searchKey = {
                        top:0
                    }
                }
                var localData = utils.getUseridAndToken()
                this.searchKey.user_id = localData.user_id
                this.searchKey.token = localData.token
                this.searchKey.type = type
            },
            getUserInfo:function(searchKey) {
                let params = $.param(searchKey)
                var __self = this
                $.ajax({
                    url: utils.urlpre+"User/getUserInfo",
                    type: "POST",
                    crossDomain: true,
                    data:params,
                    dataType: "json",
                    success: function (data) {
                        if(searchKey.top){
                            __self.baseData = {
                                header:data.data.header,
                                nickname:data.data.nickname,
                                focus:data.data.focus,
                                follow:data.data.follow,
                                introduction:data.data.introduction
                            }
                        }
                        switch(searchKey.type){
                            case 'info':
                                __self.infoData = data.data
                                console.log(__self.infoData)
                                break
                            case 'noisy':
                                __self.xuanxuanitems = data.data.noisy
                                break
                            case 'activity':
                            console.log(data.data)
                                __self.activityitems = data.data.activity
                                break
                        }
                        
                    },
                    error: function (xhr, status) {
                        console.log('getUserInfo error')
                    }
                })
            },
            hideToast:function() {
                this.showToast = false
            }
        },
        events:{
            'headerRightBtnClick':function() {
                if(this.editMode){
                    this.toastInfo.icon = 'icon-14'
                    this.toastInfo.text = '正在上传'
                    this.showToast = true
                    this.$broadcast('submitEdit')
                }else{
                    this.$route.router.go({name:'setting'})
                }
                
            },
            'headerLeftBtnClick':function() {
                if(this.editMode){
                    this.editMode = false
                }else{
                    this.$route.router.go({name:'addFriends'})
                }
            },
            'showToast':function(type) {
                switch(type){
                    case 'start':
                        this.toastInfo.icon = 'icon-14'
                        this.toastInfo.text = '正在上传'
                        this.showToast = true
                        break
                    case 'success':
                        this.toastInfo.icon = 'icon-14'
                        this.toastInfo.text = '上传成功'
                        setTimeout(this.hideToast,2000)
                        this.editMode = false
                        this.initSearchKey('info')
                        this.searchKey.top = 1
                        this.getUserInfo(this.searchKey)
                        break
                    case 'fail':
                        this.toastInfo.icon = 'icon-14'
                        this.toastInfo.text = '上传失败'
                        setTimeout(this.hideToast,2000)
                        break
                }
                
            }
        },
        watch:{
            editMode:function(val,old){
                if(val){
                    this.rightBtnType = 'submit'
                    this.leftBtnType = 'back'
                }else{
                    this.rightBtnType = 'setting'
                    this.leftBtnType = 'addFriend'
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue'),
            "meBaseInfo":require('../components/meBaseInfo.vue'),
            "personalInfo":require('../components/personalInfo.vue'),
            "xuanxuanList":require('../components/xuanxuanList.vue'),
            "activityList":require('../components/activityList.vue'),
            "editPersonalInfo":require('../components/editPersonalInfo.vue'),
            "toast":require('../components/toast.vue'),
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
.me-container{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5*16px;
    bottom: 6.125*16px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: @background-gray4;
}
.me-nav{
    .flexbox();
    width: 100%;
    background-color: @blue2;
    position: absolute;
    justify-content:center;
    margin-bottom: 20px;
    a{
        display: block;
        position: relative;
        height: 88px;
        line-height: 88px;
        width: 16%;
        color: @blue3;
        font-size: 22px;/*px*/

    }
    .current{
        color: @card-white5;
        font-size: 24px;/*px*/
        &:after{
            content: '';
            position: absolute;
            display: block;
            width: 60px;
            height: 6px;
            border-radius: 3px;
            bottom: -10px;
            left: 50%;
            transform:translateX(-50%);
            background-color: @blue1;

        }
    }
}
.list-box{
    width: 37.5*16px;
    margin: 0 auto;
    margin-top: 124px;
}
</style>