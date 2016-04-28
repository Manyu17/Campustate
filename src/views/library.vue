<template>
    <nv-head :header-name=""
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <search-box :place-holder="placeHolder"></search-box>
    <div class="library-wrapper">
        <div class="search-result-box" v-if="searchMode&&searchResultDataOk" transition="fade">
            <div class="icon iconfont icon-14 empty" v-if="!searchResultData.length">小图翻遍了每个角落也没找到它<br>只好请你换个词试试啦！</div>
            <div class="not-empty" v-if="searchResultData.length">
                <p class="total">共{{searchResultData.length}}条结果</p>
                <ul class="search-result">
                    <li v-for="item in searchResultData">
                        <p class="first"><span class="left" v-if="item.title">{{item.title}}</span><span class="right">{{item.callno}}</span></p>
                        <p class="second">{{item.author}}</p>
                        <p class="third"><span class="left" v-if="item.publisher">{{item.publisher}}</span><span class="right">{{item.doctype}}</span></p>
                        <p class="forth"><span class="left">馆藏：{{item.at_place}}</span><span class="right">可借：{{item.can_lend}}</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <loading v-if="searchMode&&showSearchLoading" transition="fade"></loading>
        <div class="main-page" v-if="!searchMode" transition="fade">
            <div class="over-due-soon" >
                <p class="icon iconfont icon-14 empty" v-if="!overTimeSoonData.length">您最近没有即将超期的图书</p>
                <div class="over-due-soon-box" v-if="overTimeSoonData.length">
                    <p class="icon iconfont icon-14 total">您有<span>{{overTimeSoonData.length}}</span>本书将于5日内超期</p>
                    <ul class="book-list">
                        <li class="icon iconfont icon-14" v-for="book in overTimeSoonData"><p class="book-name">{{book.title}}</p></li>
                    </ul>
                </div>
            </div>
            <tab-nav :tab-list.sync="tabList"></tab-nav>
            <div class="tab-box">
                <div class="down-card-box current-borrow" v-if="tabList[0].current&&currentBorrowDataOk" transition="fade">
                    <div class="icon iconfont icon-14 empty" v-if="!currentBorrowData.length">最近书架空空喔</div>
                    <div class="book-list-box" v-if="currentBorrowData.length">
                        <div class="time-line" v-if="overTimeData.length">
                            <p class="year-time">你有<span>{{overTimeData.length}}</span>本书已经超期</p>
                            <p class="line"><span class="dot"></span></p>
                        </div>
                        <ul class="book-list">
                            <li v-for="book in currentBorrowData">
                                <div class="title-box"><span class="state" v-if="book.state">{{book.state}}</span><p class="title">{{book.title}}</p></div>
                                <p class="author">{{book.author}}</p>
                                <p class="book-time">{{book.borrow_time}}——{{book.should_return_time}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="down-card-box borrow-history" v-if="tabList[1].current&&historyYearDataOk" transition="fade">
                    <div class="icon iconfont icon-14 empty" v-if="!historyYearData.length">图书馆是一座待你挖掘的大宝藏</div>
                    <div class="year-box" v-for="item in historyYearData">
                        <div class="time-line">
                            <p class="icon iconfont icon-14 year-time">{{item.year}}</p>
                            <p class="line"><span class="dot"></span></p>
                        </div>
                        <ul class="book-list">
                            <li v-for="book in item.data">
                                <p class="title">{{book.title}}</p>
                                <p class="author">{{book.author}}</p>
                                <p class="book-time">{{book.borrow_time}}——{{book.return_time}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="down-card-box borrow-order" v-if="tabList[2].current&&orderDataOk" transition="fade">
                    <div class="icon iconfont icon-14 empty" v-if="!orderData.length">你暂时没有预约的图书喔</div>
                    <ul class="book-list" v-if="orderData.length">
                        <li v-for="book in orderData">
                            <div class="title-box"><span class="state" :class="{'state-arrived':book.status=='已到书','state-applying':book.status=='申请中'}">{{book.status}}</span><p class="title">{{book.title}}</p></div>
                            <p class="author">{{book.author}}</p>
                            <div :class="{'arrived':book.status=='已到书','applying':book.status=='申请中'}">
                                <p class="arrive-time">到书日：{{book.appoint_time}}<span class="dead-line">保留截止：{{book.dead_time}}</span></p>
                                <p class="fetch-place">取书地：{{book.fetch_place}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <loading v-if="showLoading" transition="fade"></loading>
            </div>
        </div>
    </div>
    
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                tabList:[{
                    text:'当前借阅',
                    current:false
                },{
                    text:'借阅历史',
                    current:false
                },{
                    text:'预约状态',
                    current:false
                }],
                placeHolder:'输入任意词(图书名／责任人等)',
                searchKey:{},
                historyYearData:[],
                historyYearDataOk:false,
                currentBorrowData:[],
                overTimeSoonData:[],
                overTimeData:[],
                currentBorrowDataOk:false,
                orderData:[],
                orderDataOk:false,
                searchResultData:[],
                searchResultDataOk:false,
                searchMode:false,
                showLoading:false,
                showSearchLoading:false
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
                    var localData = utils.getUseridAndToken()
                    this.searchKey.user_id = localData.user_id
                    this.searchKey.token = localData.token
                    switch(tab){
                        case 'current':
                            this.tabList[1].current = false
                            this.tabList[2].current = false
                            this.tabList[0].current = true
                            if(!this.currentBorrowData.length){
                                this.getCurrentBorrow(this.searchKey)
                            }
                            break
                        case 'history':
                            this.tabList[1].current = true
                            this.tabList[2].current = false
                            this.tabList[0].current = false
                            if(!this.historyYearData.length){
                                this.getHistoryBorrow(this.searchKey) 
                            }
                            break
                        case 'order':
                            this.tabList[1].current = false
                            this.tabList[2].current = true
                            this.tabList[0].current = false
                            if(!this.orderData.length){
                                this.getOrderBorrow(this.searchKey) 
                            }
                            break
                        
                    }
                }
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            getCurrentBorrow:function(searchKey) {
                var __self = this
                __self.currentBorrowDataOk = false
                __self.showLoading = true
                $.ajax({
                    url: utils.urlpre+"Library/borrowList",
                    type: "POST",
                    crossDomain: true,
                    data:searchKey,
                    dataType: "json",
                    success: function (data) {
                        if(data.result=='SUCCESS'){
                            __self.currentBorrowData = data.data
                            for(var item in __self.currentBorrowData){
                                var returnTimeStr = __self.currentBorrowData[item].should_return_time
                                var now = new Date()
                                var returnTimeDate = new Date(returnTimeStr).getTime()
                                var nowDate = new Date(now.toDateString()).getTime()
                                var diff = returnTimeDate - nowDate
                                if(diff < 432000000){
                                    __self.overTimeSoonData.push(currentBorrowData[item])
                                }
                                if(diff < 0){
                                    currentBorrowData[item].state = '已超期'
                                    __self.overTimeData.push(currentBorrowData[item])
                                }
                            }
                            console.log(__self.overTimeSoonData)
                        }
                        __self.showLoading = false
                        __self.currentBorrowDataOk = true
                        console.log(__self.currentBorrowData)
                    },
                    error: function (xhr, status) {
                        console.log('getCurrentBorrow error')
                    }
                })
            },
            getHistoryBorrow:function(searchKey) {
                var __self = this
                __self.historyYearDataOk = false
                __self.showLoading = true
                $.ajax({
                    url: utils.urlpre+"Library/historyList",
                    type: "POST",
                    crossDomain: true,
                    data:searchKey,
                    dataType: "json",
                    success: function (data) {
                        var historyData = data.data
                        console.log(historyData[0])
                        if(data.result=='SUCCESS'&&historyData){
                            var countYear = 0
                            __self.historyYearData[countYear] = {}
                            __self.historyYearData[countYear].year = historyData[0].borrow_time.split('-')[0]
                            __self.historyYearData[countYear].data = []
                            for(var item in historyData){
                                var itemyear = historyData[item].borrow_time.split('-')[0]
                                if(itemyear == __self.historyYearData[countYear].year){
                                    __self.historyYearData[countYear].data.push(historyData[item])
                                }else{
                                    countYear++
                                    __self.historyYearData[countYear] = {}
                                    __self.historyYearData[countYear].year = itemyear
                                    __self.historyYearData[countYear].data = []
                                    __self.historyYearData[countYear].data.push(historyData[item])
                                }
                            }
                        }
                        __self.showLoading = false
                        __self.historyYearDataOk = true
                    },
                    error: function (xhr, status) {
                        console.log('getHistoryBorrow error')
                    }
                })
            },
            getOrderBorrow:function(searchKey) {
                var __self = this
                __self.orderDataOk = false
                __self.showLoading = true
                $.ajax({
                    url: utils.urlpre+"Library/appointmentList",
                    type: "POST",
                    crossDomain: true,
                    data:searchKey,
                    dataType: "json",
                    success: function (data) {
                        if(data.result=='SUCCESS'){
                            __self.orderData = data.data
                        }
                        __self.showLoading = false
                        __self.orderDataOk = true
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('getOrderBorrow error')
                    }
                })
            }
        },
        events:{
            'changeRoute':function(index) {
                console.log(index)
                switch(index){
                    case 0:
                        this.$route.router.go({name:'library',query:{tab:'current'}})
                        break
                    case 1:
                        this.$route.router.go({name:'library',query:{tab:'history'}})
                        break
                    case 2:
                        this.$route.router.go({name:'library',query:{tab:'order'}})
                        break
                }
            },
            'getSearchAjax':function(searchKey) {
                var __self = this
                __self.searchResultData = []
                __self.searchResultDataOk = false
                __self.showSearchLoading = true
                if(searchKey){
                    __self.searchMode = true
                    var userdata = {}
                    userdata.keyword = searchKey
                    $.ajax({
                        url: utils.urlpre+"Library/searchBook",
                        type: "GET",
                        crossDomain: true,
                        data:userdata,
                        dataType: "json",
                        success: function (data) {
                            if(data.result=='SUCCESS'){
                                __self.searchResultData = data.data
                                __self.showSearchLoading = false
                                __self.searchResultDataOk = true
                            }
                            console.log(data)
                        },
                        error: function (xhr, status) {
                            console.log('getSearchAjax error')
                        }
                    })
                }else{
                    __self.searchMode = false
                }
                
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "searchBox":require('../components/searchBox.vue'),
            "tabNav":require('../components/tabNav2.vue'),
            "loading":require('../components/loading.vue')
        }
    }
</script>
<style lang="less" scope>
@import '../assets/less/common/func.less';
@import '../assets/less/common/transition.less';
.tab-box{
    position: relative;
}
.library-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 88px;
    bottom: 0;
    background-color: @background-gray4;
    padding: 0 20px;
}
.search-input-box{
    width: 460px;
    height: 54px;
    position: absolute;
    top: 17px;
    right: 88px;
    background-color: @blue4;
    border-radius: 6px;/*no*/
    .flexbox();
    span{
        width: 36px;
        height: 36px;
        margin: 4px 16px;
    }
    input{
        flex:1;
        border: none;
        outline: none;
        background-color: transparent;
        color: #d1f6ff;
        font-size: 20px;/*px*/
    }
    input::-webkit-input-placeholder{
        color:#d1f6ff;
        font-size: 20px;/*px*/
    }
}
.over-due-soon{
    padding: 0 40px;
    .total,.empty{
        height: 88px;
        line-height: 88px;
        font-size: 22px;/*px*/
        color: @icon2;
        margin-top: 56px;
        margin-bottom: 30px;
        &:before{
            display: inline-block;
            margin: 0 36px 0 26px;
            text-align: center;
            line-height: 88px;
            font-size: 48px;
            width: 88px;
            height: 88px;
            border-radius: 50%;
            background-color: @icon2;
            color: @card-white5;
        }
        span{
            font-size: 36px;/*px*/
        }
    }
    .book-list{
        position: relative;
        width: 400px;
        padding: 40px 60px;
        margin: 0 0 30px 0;
        border-radius: 8px;
        background-color: @card-white5;
        &:before{
            content: '';
            display: block;
            position: absolute;
            .trangle(18px,@background-gray4,@background-gray4,transparent,transparent);
            top: 0;
            right: 0;
        }
        &:after{
            content: '';
            display: block;
            position: absolute;
            .trangle(18px,transparent,transparent,@background-gray4,@background-gray4);
            left: 0;
            bottom: 0;
        }
        li{
            font-size: 22px;
            color: @font-gray2;
            height: 60px;
            line-height: 60px;
            &:before{
                display: inline-block;
                font-size: 30px;

            }

        }
        .book-name{
            display: inline-block;
            margin-left: 32px;
            &:before{
                content: '《';
            }
            &:after{
                content: '》';
            }
        }
    }
}
.down-card-box{
    position: absolute;
    top: 0;
    width: 600px;
    background-color: @card-white5;
    border-radius: 8px;
    .year-time{
        height: 96px;
        line-height: 100px;
        text-align: center;
        font-size: 20px;/*px*/
    }
    .line{
        position: relative;
        &:before{
            content: '';
            display: block;
            width: 108px;
            height: 2px;/*no*/
            position: absolute;
            top: 4px;
            left: 152px;
        }
        &:after{
            content: '';
            display: block;
            width: 108px;
            height: 2px;/*no*/
            position: absolute;
            top: 4px;
            right: 152px;
        }
    }
    .dot{
        display: block;
        position: relative;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin:0 auto;
        &:before{
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            position: absolute;
            left: -16px;
            top: 2px;
        }
        &:after{
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            position: absolute;
            right: -16px;
            top: 2px;
        }

    }
    .time-line{
    }
    .book-list{
        padding: 30px 0;
        li{
            padding: 16px 64px;

        }
        p{
            padding-left: 8px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .title{
            color: @font-gray1;
            font-size: 26px;/*px*/
            height: 52px;
            line-height: 52px;
            &:before{
                content: '《';
            }
            &:after{
                content: '》';
            }
        }
        .author{
            color: @font-gray1;
            font-size: 18px;/*px*/
            height: 40px;
            line-height: 40px;
            &:before{
                content: '/';
            }
        }
        .book-time{
            color: @font-gray2;
            font-size: 20px;/*px*/
            height: 40px;
            line-height: 40px;
        }
    }
    .title-box{
        .flexbox();
        span{
            display: block;
            color: @card-white5;
            font-size: 20px;/*px*/
            height: 40px;
            line-height: 40px;
            padding: 0 12px;
            margin: 6px 0;
        }
        .state-arrived{
            background-color: @red1;
        }
        .state-applying{
            background-color: @blue1;
        }
        p{
            flex:1;
            text-align: left;
        }
    }
    .empty{
        border-radius: 8px;
        text-align: center;
        font-size: 20px;/*px*/
        color: @font-gray2;
        padding-top: 72px;
        padding-bottom: 72px;
        &:before{
            display: block;
            font-size: 76px;/*px*/
            margin-bottom: 32px;
        }
    }
}
.borrow-history{
    .year-time{
        color: @icon2;
        &:before{
            font-size: 38px;
            margin-right: 24px;
        }
    }
    .line{
        &:before{
            background-color: @icon2;
        }
        &:after{
            background-color: @icon2;
        }
    }
    .dot{
        background-color: @icon2;
        &:before{
            background-color: @icon2;
        }
        &:after{
            background-color: @icon2;
        }

    }
}
.current-borrow{
    .year-time{
        color: @red1;
    }
    .line{
        &:before{
            background-color: @red1;
        }
        &:after{
            background-color: @red1;
        }
    }
    .dot{
        background-color: @red1;
        &:before{
            background-color: @red1;
        }
        &:after{
            background-color: @red1;
        }

    } 
}
.borrow-order{
    .arrived{
        p{
            font-size: 20px;/*px*/
            color: @red1;
            line-height: 40px;
        }
        span{
            margin-left: 12px;
            line-height: 40px;
        }
    }
    .applying{
        p{
            font-size: 20px;/*px*/
            color: @font-gray3;
            line-height: 40px;
        }
        span{
            margin-left: 12px;
            line-height: 40px;
        }
    }
}
.main-page{
    position: absolute;
    width: 600px;
}
.search-result-box{
    position: absolute;
    width: 600px;
    .empty{
        font-size: 20px;/*px*/
        line-height: 40px;
        color: @font-gray2;
        text-align: center;
        margin-top: 160px;
        &:before{
            font-size: 110px;
            line-height: 168px;
            display: block;
            text-align: center;
        }
    }
    .total{
        font-size: 22px;/*px*/
        color: @font-gray2;
        height: 76px;
        line-height: 76px;
        margin-top: 20px;
        padding-left: 16px;
    }
    li{
        background-color: @card-white5;
        border-radius: 5px;
        box-shadow: 0px 0px 8px 0px rgba(89, 89, 89, 0.118);
        padding: 30px 50px;
        margin-bottom: 20px;
        p{
            overflow: hidden; 
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .first{
            font-size: 26px;/*px*/
            color: @font-gray1;
            line-height: 48px;
        }
        .second,.third,.forth{
            font-size: 18px;/*px*/
            color: @font-gray2;
            line-height: 36px;
        }
        .forth{
            text-align: right;
        }
        .left{
            margin-right: 10px;
        }
    }
}
</style>

