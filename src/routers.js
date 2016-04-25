'use strict'

export default function(router){
    router.map({
        '/':{				//首页
            name:'index',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        '/campustatevue':{               //首页
            name:'index',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        '/home':{               //首页
            name:'home',
            component: function(resolve){
                require(['./views/home.vue'],resolve);
            }
        },
        '/addNewActivity':{               //发布活动
            name:'addNewActivity',
            component: function(resolve){
                require(['./views/addNewActivity.vue'],resolve);
            }
        },
        '/addNewXuanxuan':{               //发布喧喧
            name:'addNewXuanxuan',
            component: function(resolve){
                require(['./views/addNewXuanxuan.vue'],resolve);
            }
        },
        '/xuanxuanDetails/:id':{               //喧喧详情
            name:'xuanxuanDetails',
            component: function(resolve){
                require(['./views/xuanxuanDetails.vue'],resolve);
            }
        },
        '/activityDetails/:id':{               //活动详情
            name:'activityDetails',
            component: function(resolve){
                require(['./views/activityDetails.vue'],resolve);
            }
        },
        '/topicDetails/:id':{               //话题详情
            name:'topicDetails',
            component: function(resolve){
                require(['./views/topicDetails.vue'],resolve);
            }
        },
        '/login':{
            name:'login',
            component:function(resolve) {
                require(['./views/login.vue'],resolve);
            }
        },
        '/register':{
            name:'register',
            component:function(resolve) {
                require(['./views/register.vue'],resolve);
            }
        },
        '/toolsHome':{
            name:'toolsHome',
            component:function(resolve) {
                require(['./views/toolsHome.vue'],resolve);
            }
        },
        '/meHome/:username':{
            name:'meHome',
            component:function(resolve) {
                require(['./views/meHome.vue'],resolve);
            }
        },
        '/addFriends':{
            name:'addFriends',
            component:function(resolve) {
                require(['./views/addFriends.vue'],resolve);
            }
        },
        '/userList/:type/:username':{
            name:'userList',
            component:function(resolve) {
                require(['./views/userList.vue'],resolve);
            }
        },
        '/bindingsSuccess':{
            name:'bindingsSuccess',
            component:function(resolve) {
                require(['./views/bindingsSuccess.vue'],resolve);
            }
        },
        '/activityInfo':{
            name:'activityInfo',
            component:function(resolve) {
                require(['./views/activityInfo.vue'],resolve);
            }
        },
        '/affairsBindings':{
            name:'affairsBindings',
            component:function(resolve) {
                require(['./views/affairsBindings.vue'],resolve);
            }
        },
        '/libraryBindings':{
            name:'libraryBindings',
            component:function(resolve) {
                require(['./views/libraryBindings.vue'],resolve);
            }
        },
        '/dormBindings':{
            name:'dormBindings',
            component:function(resolve) {
                require(['./views/dormBindings.vue'],resolve);
            }
        },
        '/fillInfo':{
            name:'fillInfo',
            component:function(resolve) {
                require(['./views/fillInfo.vue'],resolve);
            }
        },
        '/feedback':{
            name:'feedback',
            component:function(resolve) {
                require(['./views/feedback.vue'],resolve);
            }
        },
        '/teamInfo':{
            name:'teamInfo',
            component:function(resolve) {
                require(['./views/teamInfo.vue'],resolve);
            }
        },
        '/setting':{
            name:'setting',
            component:function(resolve) {
                require(['./views/setting.vue'],resolve);
            }
        },
        '/about':{
            name:'about',
            component:function(resolve) {
                require(['./views/about.vue'],resolve);
            }
        },
        '/update':{
            name:'update',
            component:function(resolve) {
                require(['./views/update.vue'],resolve);
            }
        },
        '/schedule':{
            name:'schedule',
            component:function(resolve) {
                require(['./views/schedule.vue'],resolve);
            }
        },
        '/schoolCard':{
            name:'schoolCard',
            component:function(resolve) {
                require(['./views/schoolCard.vue'],resolve);
            }
        }
    })
}