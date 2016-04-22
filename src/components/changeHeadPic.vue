<template>
    <div class="row img_row head_pic clearfix">
        <h3>{{ headText }}</h3>
        <div class="imgs">
            <span><img v-bind:src="images" alt=""></span>
            <div class="upload-btn">
                <a></a>
                <input id="inneruploadimg" type="file" accept="image/*" name="file" v-model="upLoadImgValue" @change="uploadImgChange"/>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        props: ['images','headText','formList'],
        data (){
            return {
                // upLoadImgToken:'',
                upLoadImgValue:''
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            uploadImgChange:function(event) {
                var value = this.upLoadImgValue
                if (value) {
                    this.previewImg(event.target)
                    this.formList = $(this.$el).find("#inneruploadimg")[0].files
                }
            },
            getObjectURL:function(file) {
                var url = null 
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) 
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) 
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) 
                }
                return url
            },
            previewImg:function(inputObj) {
                var imgkeyurl = this.getObjectURL(inputObj.files[0])
                this.images = imgkeyurl
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
.add-container .row.img_row.head_pic span{
    position: absolute;
}
.add-container .row.img_row.head_pic a{
    opacity: 0.5;
}
</style>