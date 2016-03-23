<template>
	<!-- 全局header -->
    <nv-head header-name="首页"
            right-btn-type="showAddMenu"
            left-btn-type="">
    </nv-head>
    <tab-slider :tab-items="tabItems" :slide-items="slideItems" :slider-id="sliderId" slider-style-type="homeSlide">
    	<slide-item-heat :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :ad="ad" :render-page="renderPage.heat"></slide-item-heat>
    	<slide-item-topic :topicitems="topicitems"></slide-item-topic>
    	<slide-item-latest :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :render-page="renderPage.latest"></slide-item-latest>
    	<slide-item-follow :xuanxuanitems="xuanxuanitems" :activityitems="activityitems" :render-page="renderPage.follow"></slide-item-follow>
    </tab-slider>
    <nv-foot></nv-foot>
</template>
<script>
	import utils from  '../libs/utils'
    export default {
        data (){
            return {
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
                ad:{}
            }
        },
        ready(){
        },
        route:{
            data (transition){
                let query = transition.to.query,tab = query.tab,type = query.type
                if(tab){
                    switch(tab){
                        case 'heat':
                            if(!this.renderPage.heat){
                                this.renderPage.heat = true
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
                            this.getTopicList()
                            break
                        case 'latest':
                            if(!this.renderPage.latest || !this.renderPage.follow){
                                this.renderPage.latest = true
                                this.renderPage.follow = true
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