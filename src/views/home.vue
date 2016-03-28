<template>
    <nv-head header-name="首页"
            right-btn-type="showAddMenu"
            left-btn-type="">
    </nv-head>
    <tab-slider :tab-items="tabItems" :slider-id="sliderId" slider-style-type="homeSlide" >
    	<slide-item-heat :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :ad="ad" :render-page="renderPage.heat" v-ref:slide-item-heat></slide-item-heat>
    	<slide-item-topic :topicitems="topicitems"></slide-item-topic>
    	<slide-item-latest :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :render-page="renderPage.latest" v-ref:slide-item-latest></slide-item-latest>
    	<slide-item-follow :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :render-page="renderPage.follow" v-ref:slide-item-follow></slide-item-follow>
    </tab-slider>
    <nv-foot :footeritems="footeritems"></nv-foot>
</template>
<script>
	import utils from  '../libs/utils'
    import iSlider from '../libs/iSlider'
    export default {
        data (){
            return {
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
                renderPage:{
                    heat:false,
                    latest:false,
                    follow:false
                },
                xuanxuanitems:'',
                activityitems:'',
                topicitems:'',
                searchKey:{},
                ad:{},
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
                        link:'meHome'
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
                            if(!this.renderPage.heat){
                                this.renderPage.heat = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.$refs.slideItemHeat.$refs.list.listInit()
                                }
                            }
                            var localData = utils.getUseridAndToken()
                            this.searchKey = {}
                            this.searchKey.user_id = localData.user_id
                            this.searchKey.token = localData.token
                            this.searchKey.type = 'heat'
                            break
                        case 'topicList':
                            if(!this.renderPage.heat||!this.renderPage.latest){
                                this.renderPage.heat = true
                                this.renderPage.latest = true
                            }
                            if(this.islider.slideIndex!=undefined && this.islider.slideIndex!=1){
                                this.islider.slideTo(1)
                            }
                            
                            this.getTopicList()
                            break
                        case 'latest':
                            if(!this.renderPage.latest || !this.renderPage.follow){
                                this.renderPage.latest = true
                                this.renderPage.follow = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.$refs.slideItemLatest.$refs.list.listInit()
                                }
                            }
                            var localData = utils.getUseridAndToken()
                            this.searchKey = {}
                            this.searchKey.user_id = localData.user_id
                            this.searchKey.token = localData.token
                            this.searchKey.type = 'latest'
                            break
                        case 'follow':
                            if(!this.renderPage.follow || !this.renderPage.latest){
                                this.renderPage.latest = true
                                this.renderPage.follow = true
                            }else{
                                if(transition.to.query.tab != transition.from.query.tab){
                                    this.$refs.slideItemFollow.$refs.list.listInit()
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
                            this.getXuanxuan(this.searchKey)
                            break
                        case 'activity':
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
                this.renderPage = {
                    heat:false,
                    latest:false,
                    follow:false
                }
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
                            __self.ad = data.ad
                        }
                        __self.xuanxuanitems = data.data
                    },
                    error: function (xhr, status) {
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
            	        console.log('getActivity error')
            	    }
            	})
            },
            getTopicList:function() {
                var __self = this
                $.ajax({
                    url: utils.urlpre+"topic/topicList",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        __self.topicitems = data.data
                    },
                    error: function (xhr, status) {
                        this.errormessage = '网络错误'
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
                this.islider = new iSlider({
                    data: list,
                    dom: document.getElementById(__self.sliderId.show),
                    fixPage: false,
                    initIndex:index
                })
                this.islider.on('slideEnd',function() {
                    bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
                })    
                this.islider.on('slideChange',function(idx) {
                    bg.style.left = tabs[this.slideIndex].offsetLeft + tabs[this.slideIndex].clientWidth/2 -scale/2 + 'px'
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
            "slideItemFollow":require('../components/slideItemFollow.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/viewBase.less';
.content-base{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
    width: 37.5rem;
    margin: 0 auto;
    margin-top: 0.125rem;
    .switch-bar{
        text-align: center;
        font-size: 16px;
        margin-top: 32/16rem;
        margin-bottom: 12/15rem;
        a{
            display: inline-block;
            padding: 0 14/16rem;
            color: #cfcfcf;
            height: 26/16rem;
            line-height: 26/16rem;
        }
        a:first-child{
            border-right: 2/16rem solid #636363;
        }
        .current{
            color: #636363;
        }
    }
}
</style>