<template>
    <nv-head :header-name="headerText"
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <div class="electric-charge-wrapper">
        <rest-banner :rest-data="restData"></rest-banner>
        <tab-nav1 :tab-list="tabList" v-if="restData" transition="fade"></tab-nav1>
        <record-list :record-nav-list="recordNavList" :tab-list="tabList" :data-list="recordListDataList"></record-list>
    </div>
    
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                headerText:'电费',
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
                searchKey:{},
                recordNavList:'',
                payData:'',
                useData:'',
                recordListDataList:'',
                restData:'',
                showLoading:false,
                backPath:''
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
                let query = transition.to.query,tab = query.tab
                if(tab){
                    var localData = utils.getUseridAndToken()
                    this.searchKey.user_id = localData.user_id
                    this.searchKey.token = localData.token
                    this.recordListDataList = ''
                    if(!this.restData){
                        this.getElectricInfo(this.searchKey)
                    }else{
                        this.changeData()
                    }
                    switch(tab){
                        case 'pay':
                            this.tabList[1].current = false
                            this.tabList[2].current = false
                            this.tabList[0].current = true
                            
                            break
                        case 'expense':
                            this.tabList[1].current = true
                            this.tabList[2].current = false
                            this.tabList[0].current = false
                            
                            break
                        case 'trend':
                            this.tabList[1].current = false
                            this.tabList[2].current = true
                            this.tabList[0].current = false
                            break
                        
                    }
                }
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            getElectricInfo:function(searchKey) {
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Electric/getElectric",
                    type: "POST",
                    crossDomain: true,
                    data:searchKey,
                    dataType: "json",
                    success: function (data) {
                        switch(data.result){
                            case 'SUCCESS':
                                __self.restData = {
                                    left:data.data.left,
                                    left_electric:data.data.left_electric
                                }
                                __self.payData = data.data.payinfo
                                __self.useData = data.data.useinfo
                                __self.changeData()
                                break
                            case 'NOT BOUND':

                                break
                        }
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('getElectricInfo error')
                    }
                })
            },
            changeData:function() {
                switch(this.$route.query.tab){
                    case 'pay':
                        this.recordListDataList = this.payData
                        break
                    case 'expense':
                        this.recordListDataList = this.useData
                        break
                }
            }
        },
        events:{
            'changeRoute':function(index) {
                switch(index){
                    case 0:
                        this.$route.router.go({name:'electricCharge',query:{tab:'pay'}})
                        break
                    case 1:
                        this.$route.router.go({name:'electricCharge',query:{tab:'expense'}})
                        break
                    case 2:
                        this.$route.router.go({name:'electricCharge',query:{tab:'trend'}})
                        break
                }
            },
            'headerLeftBtnClick':function() {
                this.$route.router.go({name:'toolsHome'})

            }
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
.electric-charge-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 88px;
    bottom: 0;
    background-color: @background-gray4;
    padding: 0 20px;
}
</style>