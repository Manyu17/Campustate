<template>
    <nv-head :header-name=""
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <list-nav :showxuanxuan.sync="showxuanxuan"></list-nav>
    <div id="topic-list-page" class="content-base">
        <div class="topic-banner"><img v-bind:src="image" alt=""></div>
        <list :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :showxuanxuan="showxuanxuan"></list>
    </div>   
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                showxuanxuan:'',
                xuanxuanitems:'',
                activityitems:'',
                topic_id:'',
                searchKey:{},
                image:''
            }
        },
        route:{
            data (transition){
                let query = transition.to.query,type = query.type
                this.topic_id = transition.to.params.id
                var localData = utils.getUseridAndToken()
                this.searchKey.user_id = localData.user_id
                this.searchKey.token = localData.token
                this.searchKey.type = 'topic'
                this.searchKey.topic_id = this.topic_id
                switch(type){
                    case 'xuanxuan':
                        this.showxuanxuan = true
                        this.getXuanxuan(this.searchKey)
                        break
                    case 'activity':
                        this.showxuanxuan = false
                        this.getActivity(this.searchKey)
                        break
                }
            }
              
        },
        methods:{
            getXuanxuan:function(searchKey){
                let params = $.param(searchKey)
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Noisy/noisyList",
                    type: "POST",
                    crossDomain: true,
                    data:params,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        __self.image = data.topic
                        __self.xuanxuanitems = data.data
                    },
                    error: function (xhr, status) {
                        __self.xuanxuanitems = ''
                        console.log('getxuanxuanList error')
                    }
                })
            },
            getActivity:function(searchKey){
                let params = $.param(searchKey)
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Activity/activityList",
                    type: "POST",
                    crossDomain: true,
                    data:params,
                    dataType: "json",
                    success: function (data) {
                        __self.activityitems = data.data
                    },
                    error: function (xhr, status) {
                        __self.activityitems = ''
                        console.log('getActivity error')
                    }
                })
            }
        },
        events:{
            'routeChange':function(value) {
                this.$route.router.go({name:'topicDetails',params:{id:this.topic_id},query:{type:value}})
            },
            'headerLeftBtnClick':function() {
                this.$route.router.go({name:'home',query:{tab:'topicList',type:'xuanxuan'}})
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "list":require('../components/list.vue'),
            "listNav":require('../components/listNav.vue')
        }
    }
</script>

<style lang="less" scope>
@import '../assets/less/common/func.less';
#topic-list-page{
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 37.5*16px;
    margin: 0 auto;
    margin-top: 0.125*16px; 
}
.switch-bar{
    position: absolute;
    left: 0;
    right: 0;
    line-height:88px; 
    text-align: center;
    font-size: 28px;/*px*/
    a{
        display: inline-block;
        color: @card-white5;
        height: 40px;
        line-height: 40px;
        border: 1px solid @card-white5;/*no*/
    }
    .topic{
        padding: 0 20px 0 30px;
        border-radius: 20px 0 0 20px;
    }
    .event{
        padding: 0 30px 0 20px;
        border-radius: 0 20px 20px 0;
    }
    .current{
        background-color: @card-white5;
        color: @blue1;
    }
}
.topic-banner{
    margin-top: 20px;
    margin-bottom: 20px;
    img{
        width: 100%;
        height: 180px;
        border-radius: 12px;
    }
}
</style>