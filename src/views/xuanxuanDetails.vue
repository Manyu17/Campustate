<template>
<nv-head header-name="喧喧详情"
        right-btn-type=""
        left-btn-type="back">
</nv-head>
<div class="topic-details-content">
    <div class="xuanxuan-box">
        <div class="detail-box clearfix">
            <h3>西村富万邦新开的麻辣火锅怎么样呀？</h3>
            <img src="" alt="" class="head-pic">
            <div class="rightside">
                <p class="date-time"><span class="date">2015-01-23</span><span class="time">08:21</span></p>
                <p class="username">喵喵不是汪汪</p>
                <p class="detail">西村富万邦新开的麻辣火锅怎么样呀？适合十几个人的聚会吗？ 有去过的吗？ 求解！</p>
                <div class="imgs-box">
                    <img src="" alt=""><img src="" alt=""><img src="" alt="">
                </div>
            </div>
        </div>
    </div>
    <comment></comment>
</div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                
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
                transition.next()
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
            "footer":require('../components/footer.vue'),
            "comment":require('../components/comment.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/viewBase.less';
</style>