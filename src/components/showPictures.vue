<template>
    <div id="show-pictures-wrapper" @click="hidePictures"></div>
</template>
<script>
    require('../assets/less/common/reset.less')
	import utils from  '../libs/utils'
    import iSlider from '../libs/iSlider'
    export default {
        props:['images','index'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
            this.createIslider()
        },
        route:{
            data (transition){
                

            },
            deactivate (transition){
                transition.next();
            }
        },
        methods:{
            createIslider:function() {
                var list = [],temp = {}
                for (var item in this.images){
                    temp.content = this.images[item]
                    list.push(temp)
                }
                
                var islider = new iSlider({
                    dom: document.getElementById("show-pictures-wrapper"),
                    data:list
                })    
            },
            hidePictures:function() {
                this.$dispatch('hidePictures')
            }
        },
        events:{
        },
        components:{
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
#show-pictures-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: black;
    z-index: 9;
    overflow: hidden;
    background-size: 100%;
    -webkit-transition: all .3s;
    .islider-outer{
        position: relative;
        height: 100%;
        li{
            position: absolute;
            width:100%;
            height: 100%;
        }
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
        }
    }
}
</style>