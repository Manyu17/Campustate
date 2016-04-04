<template>
    <nv-head header-name="发布喧喧"
            right-btn-type="submit"
            left-btn-type="back">
    </nv-head>
    <div class="add-container">
        <div class="createForm" id="addNewEvent">
            <div class="group">
                <div class="row text-row">
                    <h3>喧喧标题</h3>
                    <input type="text" name="title" v-model="title">
                </div>
                <div class="row long_row last_row">
                    <h3 class="h3_row">喧喧内容</h3>
                    <textarea name="content" id="" v-model="content" ></textarea>
                </div>
            </div>
            <div class="group">
                <choose-tag></choose-tag>
            </div>
            <div class="group">
                <upload-img :images.sync="images" :images-key.sync="imagesKey" head-text="图片"></upload-img>
            </div>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                title:'',//活动标题
                topic_id:0,//活动所属话题id
                topic:'',//自定义话题
                content:'',
                images:[],
                imagesKey:[],
                backPath:''
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            submitXuanxuan:function() {
                var localData = utils.getUseridAndToken()
                var imagesstr = this.imagesKey.join("|*|")
                var userdata = {
                    user_id:localData.user_id,
                    token:localData.token,
                    topic_id:this.topic_id,
                    title:this.title,
                    content:this.content,
                    images:imagesstr
                }
                $.ajax({
                    url: utils.urlpre+"Noisy/addNoisy",
                    type: "POST",
                    crossDomain: true,
                    data:userdata,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                    },
                    error: function (xhr, status) {
                        console.log('error')
                    }
                })
            }
        },
        events:{
            'headerRightBtnClick':function() {
                this.submitXuanxuan()
            },
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "chooseTag":require('../components/chooseTag.vue'),
            "uploadImg":require('../components/uploadImg.vue')
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/addNew.less';
</style>