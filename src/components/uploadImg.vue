<template>
    <div class="row img_row clearfix">
        <h3>{{ headText }}</h3>
        <div class="imgs">
            <span v-for="item in images"><img v-bind:src="item" alt=""><i class="icon iconfont icon-14" @click="removeImg($index)"></i></span>
            <div class="upload-btn" v-show="btnShow">
                <a><span class="icon iconfont icon-jia"></span></a>
                <input id="inneruploadimg" type="file" accept="image/*" name="file" v-model="upLoadImgValue" @change="uploadImgChange"/>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from  '../libs/utils'
    export default {
        props: ['images','headText','imagesNum','formList'],
        data (){
            return {
                // upLoadImgToken:'',
                upLoadImgValue:'',
                imgUploaded:{},
                btnShow:true
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
                    this.formList.push($(this.$el).find("#inneruploadimg")[0].files)
                    // if (this.imgUploaded[value]==undefined) {
                    //     this.previewImg(event.target)
                    //     this.imgUploaded[value] = true
                    //     this.formList.push($(this.$el).find("#inneruploadimg")[0].files)
                    //     console.log(this.formList)
                    // }else{
                    //     alert("this is already chosen")
                    // }
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
                this.images.push(imgkeyurl)
                console.log(this.images)
                if(this.imagesNum){
                    if(this.images.length>=this.imagesNum)
                        this.btnShow = false
                }
            },
            removeImg:function(index) {
                this.images.splice(index,1)
                this.formList.splice(index,1)
                if(this.imagesNum){
                    if(this.images.length<this.imagesNum)
                        this.btnShow = true
                }
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
</style>