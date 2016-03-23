<template>
    <div class="footer flexbox">
        <a class="tools">
            <span class="icon iconfont icon-tool"></span>
            <p>工具</p>
        </a>
        <a class="moments" >
            <span class="icon iconfont icon-message"></span>
            <p>校园圈</p>
        </a>
        <a class="my" >
            <span class="icon iconfont icon-geren01"></span>
            <p>我</p>
        </a>
    </div>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
</script>

<style lang="less">
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';	
.footer{
	bottom: 0;
	height: 6.125rem;
	background-color: @color13;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
	a{
		display: block;
		-moz-box-flex:1.0; /* Firefox */
		-webkit-box-flex:1.0; /* Safari and Chrome */
		box-flex:1.0;
	}
	span{
		&:before{
			font-size: 18px;
		    display: inline-block;
		    width: 3.125rem;
		    height: 3.125rem;
		    line-height: 2.75rem;
		    background-color: #acacac;
		    border-radius: 50%;
		    margin: 0.625rem 0;
		}
	}
	p{
		font-size: 10px;
	}
}
</style>