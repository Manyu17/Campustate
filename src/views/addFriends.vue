<template>
    <nv-head :header-name="headerText"
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <div class="add-friends-container">
        <search-box></search-box>
        <p class="search-fault-message" v-if="!userListData">未搜索到关键词，换个试试？</p>
        <div class="person-list-box" v-if="userListData">
            <h5>我可能认识的人</h5>
            <user-info-list :user-list-data.sync="userListData"></user-info-list>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'加关注',
                backPath:'',
                userListData:''
            }
        },
        ready(){
        },
        attached(){
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
            
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            },
            'getSearchAjax':function(searchKey) {
                console.log('aaaajax')
                var localData = utils.getUseridAndToken()
                var userData = {}
                var __self = this
                userData.user_id = localData.user_id
                userData.token = localData.token
                userData.keywords = searchKey
                if(!userData.keywords){
                    __self.userListData = ''
                }else{
                    $.ajax({
                        url: utils.urlpre+"Mussy/search",
                        type: "POST",
                        crossDomain: true,
                        data:userData,
                        dataType: "json",
                        success: function (data) {
                            if(data.result = 'SUCCESS'){
                                __self.userListData = data.data
                                console.log(__self.userListData)
                            }
                        },
                        error: function (xhr, status) {
                            console.log('getSearchUser error')
                        }
                    })
                }
                
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "searchBox":require('../components/searchBox.vue'),
            "userInfoList":require('../components/userInfoList.vue')
        }
    }
</script>
<style lang="less" scope>
@import '../assets/less/common/func.less';
.add-friends-container{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5*16px;
    bottom: 0;
    overflow-y: auto;
    background-color: @background-gray4;
    padding:0.9375*16px 1.25*16px;

    .search-input-box{
        width: 100%;
        height: 82px;
        line-height: 82px;
        margin-bottom: 26px;
        .flexbox();
        background-color: @card-white5;
        span{
            display: block;
            width: 82px;
            height: 82px;
            line-height: 82px;
            margin-left: 20px;
            color: @font-gray2;
            vertical-align: middle;
        }
        input{
            flex:1;
            line-height: 82px;
            background-color: @card-white5;
            border: none;
            vertical-align: middle;
            color: @font-gray2;
            font-size: 26px; /*px*/
        }
    }
}
.search-fault-message{
    font-size: 24px; /*px*/
    color: @font-gray2;
    text-align: center;
    height: 72px;
    line-height: 72px;
}
.person-list-box{
    h5{
        font-size: 22px; /*px*/
        color: @font-gray2;
        height: 64px;
        line-height: 64px;
        padding-left: 20px;
    }
}
</style>
