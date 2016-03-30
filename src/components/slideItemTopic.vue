<template>
	<div id="topic-list-box">
        <div class="content-topic">
            <ul class="type-list">
                <li v-for="item in topicitems"><a id="btn-topicDetails" v-link="{name:'topicDetails',params:{id:item.topic_id}}"><img v-bind:src="item.image" alt=""></a></li>
            </ul>
        </div>   
    </div>
</template>
<script>
    export default {
        props: ['topicitems'],
        data (){
            return {
            }
        },
        route:{
              
        },
        methods:{
        },
        components:{
            "list":require('./list.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/componentBase.less';
.type-list{
    width: 37.5*16px;
    margin: 0 auto;
    margin-top: 0.125*16px;
    li{
        width: 100%;
        height: 11.25*16px;
        background-color: @color7;
        margin-bottom: 1.25*16px;
    }
    a{
        display: block;
        width: 100%;
        height: 11.25*16px;
        overflow: hidden;
    }
    img{
        width: 100%;
        height: 11.25*16px;
    }
}
</style>