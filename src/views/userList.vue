<template>
    <nv-head :header-name="type|getUserListHeadStr"
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <div class="user-list-container">
        <user-info-list :user-list-data.sync="userListData"></user-info-list>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'粉丝列表',
                backPath:'',
                userListData:'',
                user_id:'',
                type:''
            }
        },
        ready(){
            this.getUserListData()
        },
        attached(){
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
                this.user_id = transition.to.params.username
                this.type = transition.to.params.type
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            getUserListData:function() {
                var __self = this
                var userData = {}
                var localData = utils.getUseridAndToken()
                userData.user_id = localData.user_id
                userData.token = localData.token
                userData.search_id = this.user_id
                switch(this.type){
                    case 'focus':
                        $.ajax({
                            url: utils.urlpre+"Focus/getFocus",
                            type: "POST",
                            crossDomain: true,
                            data:userData,
                            dataType: "json",
                            success: function (data) {
                                if(data.result=="SUCCESS"){
                                    __self.userListData = data.data
                                }
                                console.log(data)
                                console.log('getFocus success')
                            },
                            error: function (xhr, status) {
                                console.log('getFocus error')
                            }
                        })
                        break
                    case 'fans':
                        $.ajax({
                            url: utils.urlpre+"Focus/getFollow",
                            type: "POST",
                            crossDomain: true,
                            data:userData,
                            dataType: "json",
                            success: function (data) {
                                if(data.result=="SUCCESS"){
                                    __self.userListData = data.data
                                }
                                console.log(data)
                                console.log('getFollow success')
                            },
                            error: function (xhr, status) {
                                console.log('getFollow error')
                            }
                        })
                        break
                }
                
            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
            
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "userInfoList":require('../components/userInfoList.vue')
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
.user-list-container{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5*16px;
    bottom: 0;
    overflow-y: auto;
    background-color: @background-gray4;
    padding:0.9375*16px 1.25*16px;
}
</style>
