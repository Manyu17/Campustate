<template>
    <nv-head :header-name="headerText"
            right-btn-type="showAddMenu"
            left-btn-type="message" :btn-items="btnItems">
    </nv-head>
    <list-nav v-if="showListNav" :showxuanxuan.sync="showxuanxuan"></list-nav>
    <tab-slider :tab-items="tabItems" :slider-id="sliderId" slider-style-type="homeSlide" >
        <slide-item-heat :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :ad="ad" :showxuanxuan="showxuanxuan"></slide-item-heat>
        <slide-item-topic :topicitems="topicitems"></slide-item-topic>
        <slide-item-latest :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :showxuanxuan="showxuanxuan"></slide-item-latest>
        <slide-item-follow :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :showxuanxuan="showxuanxuan"></slide-item-follow>
    </tab-slider>
    <nv-foot :footeritems="footeritems" :if-main-footer="true"></nv-foot>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    import iSlider from '../libs/iSlider'
    export default {
        data (){
            return {
                headerText:'',
                islider:{},
                tabItems:[
                    {
                        name:'热门'
                    },
                    {
                        name:'话题'
                    },
                    {
                        name:'最新'
                    },
                    {
                        name:'关注'
                    }
                ],
                btnItems:[
                    {
                        icon:'',
                        text:'发布喧喧',
                        link:'addNewXuanxuan'
                    },
                    {
                        icon:'',
                        text:'发布活动',
                        link:'addNewActivity'
                    }
                ],
                slideItems:[
                    {
                        id:'heat-list-box'
                    },
                    {
                        id:'topic-list-box'
                    },
                    {
                        id:'latest-list-box'
                    },
                    {
                        id:'follow-list-box'
                    }
                ],
                sliderId:{
                    wrapper:'home-slider-wrapper',
                    nav:'home-slider-nav',
                    show:'home-slider-show',
                    hidden:'home-slider-hidden',
                    a:'home-link-'
                },
                showListNav:'',
                showxuanxuan:'',
                xuanxuanitems:'',
                activityitems:'',
                topicitems:'',
                searchKey:{},
                ad:{},
                footeritems:[
                    {
                        class:'icon-xingxing',
                        text:'工具',
                        link:'toolsHome'
                    },
                    {
                        class:'icon-iconfontusers',
                        text:'校园圈',
                        link:{name:'home',query:{tab:'topicList'}},
                        current:true
                    },
                    {
                        class:'icon-user',
                        text:'我',
                        link:{name:'meHome',query:{tab:'info'},params:{username:utils.getUseridAndToken().user_id}}
                    }
                ]
            }
        },
        ready(){
        },
        attached(){
            this.createIslider()
        },
        route:{
            data (transition){
                let query = transition.to.query,tab = query.tab,type = query.type
                if(tab){
                    switch(tab){
                        case 'heat':
                            this.headerText = ""
                            this.showListNav = true
                            if(!transition.from.query){
                                this.showxuanxuan = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.showxuanxuan = true
                                }
                            }
                            var localData = utils.getUseridAndToken()
                            this.searchKey = {}
                            this.searchKey.user_id = localData.user_id
                            this.searchKey.token = localData.token
                            this.searchKey.type = 'heat'
                            break
                        case 'topicList':
                            this.showListNav = false
                            this.headerText = "话题"
                            if(this.islider.slideIndex!=undefined && this.islider.slideIndex!=1){
                                this.islider.slideTo(1)
                            }
                            this.getTopicList()
                            break
                        case 'latest':
                            this.headerText = ""
                            this.showListNav = true
                            if(!transition.from.query){
                                this.showxuanxuan = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.showxuanxuan = true
                                }
                            }
                            var localData = utils.getUseridAndToken()
                            this.searchKey = {}
                            this.searchKey.user_id = localData.user_id
                            this.searchKey.token = localData.token
                            this.searchKey.type = 'latest'
                            break
                        case 'follow':
                            this.headerText = ""
                            this.showListNav = true
                            if(!transition.from.query){
                                this.showxuanxuan = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.showxuanxuan = true
                                }
                            }
                            var localData = utils.getUseridAndToken()
                            this.searchKey = {}
                            this.searchKey.user_id = localData.user_id
                            this.searchKey.token = localData.token
                            this.searchKey.type = 'focus'
                            break
                    }
                }
                if(type){
                    switch(type){
                        case 'xuanxuan':
                            this.xuanxuanitems = ''
                            this.activityitems = ''
                            this.showxuanxuan = true
                            this.getXuanxuan(this.searchKey)
                            break
                        case 'activity':
                            this.xuanxuanitems = ''
                            this.activityitems = ''
                            this.showxuanxuan = false
                            this.getActivity(this.searchKey)
                            break
                    }
                }
                
                // //记录首次加载的查询条件
                // if(this.searchDataStr == ""){
                //     this.searchDataStr = JSON.stringify(this.searchKey);
                // }
                // //如果从左侧切换分类，则清空查询条件
                // if(transition.from.name === "house-list"){
                //     //this.searchKey.page = 1;
                //     this.searchKey.limit = 20;
                //     this.searchKey = JSON.parse(this.searchDataStr);
                // }


                // //如果从详情返回并且typeid一样才去sessionStorge
                // if(sessionStorage.searchKey && transition.from.name === "topic"
                //     && sessionStorage.tab == tab){
                //     this.topics = JSON.parse(sessionStorage.topics);
                //     this.searchKey = JSON.parse(sessionStorage.searchKey);
                //     this.$nextTick(()=> $(window).scrollTop(sessionStorage.scrollTop));
                // }
                // else{
                //     //页面初次加载获取的数据
                //     this.searchKey.tab = query.tab;
                //     this.getTopics();
                // }
                // this.showMenu = false;

                // //滚动加载
                // $(window).on('scroll', () => {
                //     this.getScrollData();
                // });

            },
            deactivate (transition){
                // $(window).off('scroll');
                // if(transition.to.name === "topic"){
                //     sessionStorage.scrollTop = $(window).scrollTop();
                //     sessionStorage.topics = JSON.stringify(this.topics);
                //     sessionStorage.searchKey = JSON.stringify(this.searchKey);
                //     sessionStorage.tab = transition.from.query.tab || 'all';
                // }
                // else{
                //     sessionStorage.removeItem("topics");
                //     sessionStorage.removeItem("searchKey");
                //     sessionStorage.removeItem("tab");
                // }
                
                transition.next();
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
                        if(searchKey.type=='heat'){
                            __self.ad = data.ad[0]
                            console.log(__self.ad)
                        }
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
            },
            getTopicList:function() {
                var __self = this
                $.ajax({
                    url: utils.urlpre+"Topic/topicList",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        __self.topicitems = data.data
                    },
                    error: function (xhr, status) {
                        __self.topicitems = ''
                        __self.errormessage = '网络错误'
                    }
                })
            },
            createIslider:function() {
                var __self = this
                var list = []
                var slideItems = this.slideItems
                for(var item in slideItems){
                    var temp = {}
                    temp.content = document.getElementById(slideItems[item].id)
                    list.push(temp)
                }
                var tabs = document.getElementById(__self.sliderId.nav).querySelectorAll('a')
                var bg = document.getElementById(__self.sliderId.nav).querySelector('span')
                var scale = tabs[0].clientWidth/2
                var index = this.getHomeInitIndex()
                bg.style.width = scale + 'px'
                bg.style.left = tabs[index].offsetLeft + tabs[index].clientWidth/2-scale/2 + 'px'
                $(tabs[index]).addClass("current")
                this.islider = new iSlider({
                    data: list,
                    dom: document.getElementById(__self.sliderId.show),
                    fixPage:false,
                    initIndex:index
                })
                this.islider.on('slideEnd',function() {
                    bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
                    $("#"+__self.sliderId.nav).find(".current").removeClass("current")
                    $(tabs[this.slideIndex]).addClass("current")
                })    
                this.islider.on('slideChange',function(idx) {
                    bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
                    $("#"+__self.sliderId.nav).find(".current").removeClass("current")
                    $(tabs[this.slideIndex]).addClass("current")
                    switch(this.slideIndex){
                        case 0:
                            __self.$route.router.go({name:'home',query:{tab:'heat',type:'xuanxuan'}})
                            break
                        case 1:
                            __self.$route.router.go({name:'home',query:{tab:'topicList'}})
                            break
                        case 2:
                            __self.$route.router.go({name:'home',query:{tab:'latest',type:'xuanxuan'}})
                            break
                        case 3:
                            __self.$route.router.go({name:'home',query:{tab:'follow',type:'xuanxuan'}})
                            break
                    }
                }) 
                this.islider.on('slide',function(event) {
                    var offset = event.offsetRatio
                    bg.style.webkitTransition = 'left .3s ease'
                    bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 - offset*tabs[this.slideIndex].clientWidth + 'px'
                })
                    
            },
            getHomeInitIndex:function() {
                var initIndex
                switch(this.$route.query.tab){
                    case 'heat':
                        initIndex = 0
                        break
                    case 'topicList':
                        initIndex = 1
                        break
                    case 'latest':
                        initIndex = 2
                        break
                    case 'follow':
                        initIndex = 3
                        break
                    default:
                        initIndex = 1
                }
                return initIndex
            }
            // //滚动加载数据
            // getScrollData (){
            //     if(this.scroll){
            //         let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
            //         if ($(document).height() <= totalheight + 200) {
            //             this.scroll = false;
            //             this.searchKey.limit += 20;
            //             this.getTopics();
            //         }
            //     }
            // }
        },
        events:{
            'slideTo':function(idx) {
                this.islider.slideTo(idx)
            },
            'routeChange':function(value) {
                this.$route.router.go({name:'home',query:{tab:this.$route.query.tab,type:value}})
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "nvFoot":require('../components/footer.vue'),
            "tabSlider":require('../components/tabSlider.vue'),
            "slideItemHeat":require('../components/slideItemHeat.vue'),
            "slideItemTopic":require('../components/slideItemTopic.vue'),
            "slideItemLatest":require('../components/slideItemLatest.vue'),
            "slideItemFollow":require('../components/slideItemFollow.vue'),
            "listNav":require('../components/listNav.vue')
        }
    }
</script>

<style lang="less" scope>
@import '../assets/less/common/func.less';
.content-base{
    position: absolute;
    top: 0;
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
</style>