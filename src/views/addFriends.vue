<template>
    <nv-head :header-name="headerText"
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <div class="add-friends-container">
        <search-box></search-box>
        <p class="search-fault-message">未搜索到关键词，换个试试？</p>
        <div class="person-list-box">
            <h5>我可能认识的人</h5>
            <user-info-list></user-info-list>
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
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "searchBox":require('../components/searchBox.vue'),
            "userInfoList":require('../components/userInfoList.vue')
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
.add-friends-container{
    position: absolute;
    left: 0;
    right: 0;
    top: 5.5*16px;
    bottom: 6.125*16px;
    overflow-y: auto;
    background-color: @background-gray4;
    padding:0.9375*16px 1.25*16px;
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
