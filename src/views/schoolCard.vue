<template>
    <nv-head :header-name="headerText"
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <div class="school-card-wrapper">
        <rest-banner :rest-value="22.60"></rest-banner>
        <tab-nav1 :tab-list="tabList"></tab-nav1>
        <record-list :record-nav-list="recordNavList"></record-list>
    </div>
    
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'校园卡',
                tabList:[{
                    icon:'icon-14',
                    text:'充值记录',
                    current:true
                },{
                    icon:'icon-14',
                    text:'消费记录',
                    current:false
                },{
                    icon:'icon-14',
                    text:'消费趋势',
                    current:false
                }],
                recordNavList:['3天','30天','90天']
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            
        },
        events:{
            
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "restBanner":require('../components/restBanner.vue'),
            "tabNav1":require('../components/tabNav1.vue'),
            "recordList":require('../components/recordList.vue')
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
.school-card-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 88px;
    bottom: 0;
    background-color: @background-gray4;
    padding: 0 20px;
}
</style>