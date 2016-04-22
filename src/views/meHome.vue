<template>
    <nv-head :header-name="headerText"
            right-btn-type="showAddMenu"
            left-btn-type="">
    </nv-head>
    <div class="me-container">
        <me-base-info :base-data="baseData" :edit-mode="editMode"></me-base-info>
        <div class="me-nav">
            <a v-link="{name:'meHome',query:{tab:'info'}}" :class="{'current':currentTab=='info'}">资料</a>
            <a v-link="{name:'meHome',query:{tab:'xuanxuan'}}" :class="{'current':currentTab=='xuanxuan'}">喧喧</a>
            <a v-link="{name:'meHome',query:{tab:'activity'}}" :class="{'current':currentTab=='activity'}">活动</a>
        </div>
        <div class="list-box">
            <personal-info v-if="currentTab=='info'" :info-data="infoData" :edit-mode.sync="editMode" transition="fade"></personal-info>
            <xuanxuan-list v-if="currentTab=='xuanxuan'" :xuanxuanitems="xuanxuanitems" transition="fade" ></xuanxuan-list>
            <activity-list v-if="currentTab=='activity'" :activityitems="activityitems" transition="fade"></activity-list>
        </div>
    </div>
    <mask :show-mask="showMask"></mask>
    <select-box :choose-list="chooseList" :show-box.sync="showSelect"></select-box>
    <nv-foot :footeritems="footeritems" :if-main-footer="true" v-if="!editMode"></nv-foot>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'',
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
                        link:{name:'meHome',query:{tab:'info'}},
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
                showMask:false,
                showSelect:false,
                chooseList:'',
                hideList:['公开','保密']
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
            }
        },
        events:{
            'showSelectBox':function(type) {
                this.showMask = true
                this.showSelect = true
                switch(type){
                    case 'public':
                        this.chooseList = this.hideList
                        break
                }
                 
            },
            'selected':function(current) {
                this.infoData.is_public = current
                this.showMask = false
                this.showSelect = false
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue'),
            "meBaseInfo":require('../components/meBaseInfo.vue'),
            "personalInfo":require('../components/personalInfo.vue'),
            "xuanxuanList":require('../components/xuanxuanList.vue'),
            "activityList":require('../components/activityList.vue'),
            "selectBox":require('../components/selectBox.vue'),
            "mask":require('../components/mask.vue')
            
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