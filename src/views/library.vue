<template>
    <nv-head :header-name=""
            right-btn-type=""
            left-btn-type="back">
    </nv-head>
    <search-box :place-holder="placeHolder"></search-box>
    <div class="library-wrapper">
        <div class="over-due-soon">
            <p class="icon iconfont icon-14 total">您有<span>3</span>本书将于5日内超期</p>
            <ul class="book-list">
                <li class="icon iconfont icon-14"><p class="book-name">平凡的世界</p></li>
            </ul>
        </div>
        <tab-nav :tab-list.sync="tabList"></tab-nav>
        <div class="down-card-box current-borrow" v-if="tabList[0].current">
            <div class="time-line">
                <p class="year-time">你有<span>2</span>本书已经超期</p>
                <p class="line"><span class="dot"></span></p>
            </div>
            <ul class="book-list">
                <li>
                    <div class="title-box"><span class="state">已超期</span><p class="title">平凡的世界</p></div>
                    <p class="author">路遥</p>
                    <p class="book-time">2016-04-06—2016-05-06</p>
                </li>
            </ul>
        </div>
        <div class="down-card-box borrow-history" v-if="tabList[1].current&&historyYearDataOk">
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
        <div class="down-card-box borrow-order" v-if="tabList[2].current">
            <ul class="book-list">
                <li>
                    <div class="title-box"><span class="state">已到书</span><p class="title">平凡的世界</p></div>
                    <p class="author">路遥</p>
                    <p class="book-time">2016-04-06—2016-05-06</p>
                </li>
            </ul>
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
                historyYearDataOk:false
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
                            this.getCurrentBorrow(this.searchKey)
                            break
                        case 'history':
                            this.tabList[1].current = true
                            this.tabList[2].current = false
                            this.tabList[0].current = false
                            this.getHistoryBorrow(this.searchKey)
                            break
                        case 'order':
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
            getCurrentBorrow:function(searchKey) {
                $.ajax({
                    url: utils.urlpre+"Library/borrowList",
                    type: "POST",
                    crossDomain: true,
                    data:searchKey,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('getCurrentBorrow error')
                    }
                })
            },
            getHistoryBorrow:function(searchKey) {
                var __self = this
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
                            __self.historyYearDataOk = true
                            console.log(__self.historyYearData)
                        }
                        
                        console.log(data.data[0].borrow_time.split('-')[0])
                    },
                    error: function (xhr, status) {
                        console.log('getCurrentBorrow error')
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
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "searchBox":require('../components/searchBox.vue'),
            "tabNav":require('../components/tabNav2.vue')
        }
    }
</script>
<style lang="less" scope>
@import '../assets/less/common/func.less';
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
    .total{
        height: 88px;
        line-height: 88px;
        font-size: 22px;/*px*/
        color: @icon2;
        margin-top: 56px;
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
        margin: 30px 0;
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
            height: 132px;
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
            background-color: @red1;
            font-size: 20px;/*px*/
            height: 40px;
            line-height: 40px;
            padding: 0 12px;
            margin: 6px 0;
        }
        p{
            flex:1;
            text-align: left;
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
</style>