<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/basic.less';
.info-list-container{
		position: absolute;
		top: 88px;
		left: 20px;
		right: 20px;
		.info-list-info{
			width: 100%;
			padding-bottom: 130px; 
			margin-top: 45px;
			margin-bottom: 55px;
			background-color: @card-white5;
			border-radius: 10px;
			position: relative;
			overflow: hidden;
			#item-wrap{
				margin-top: 60px;
				margin-left: 40px;
				li{
					display: flex;
					align-items: center;
					margin-top: 50px;
					font-size: 28px;
					i{
						font-size: 55px;
						margin-right: 65px;
					}
				}
			}
			.watermark{
				position: absolute;
				bottom: -22px;
				right: -22px;
				color: @red1;
				width: 160px;
				height: 160px;
				line-height: 160px;
				text-align: center;
				font-size: 36px;
				border: 6px solid @red1;
				border-radius: 50%;
				transform:rotate(-30deg);
				-webkit-transform:rotate(-30deg);
			}
			.fail {
				border: 6px solid @font-gray3;
				color: @font-gray3;
			}
		}
		.info-list-setting{
			width: 100%;
			height: 148px;
			border-radius: 10px;
			background-color: @card-white5;
			display: flex;
			align-items: center;
			justify-content: center;
			a{
				flex:1.0;
				border-right: 1px solid @font-gray3; /*no*/
				height: 100px;
			}
			a:nth-last-child(1){
				border: none;
			}
			span{
				&:before{
					font-size: 55px;
				    display: inline-block;
				    margin-bottom: 12px;
				}
			}
			p{
				font-size: 22px;
			}
		}
	}
</style>
<template>
	<div class="info-list-container">
		<div class="info-list-info">
			<ul id="item-wrap">
			    <li v-for="item in infoItems">
			        <i :class="item.icon"></i>
			        {{ item.message }}
			    </li>
			</ul>
		    <div class="watermark" :class="infoStatus.classStatus">{{ infoStatus.tip }}</div>
		</div>
		<div class="info-list-setting flexbox">
	        <a v-for="nav in infoNavs" v-on:click="navMethod($index)">
	            <span :class="nav.icon"></span>
	            <p>{{ nav.message }}</p>
	        </a>
	    </div>
	</div>
</template>
<script>
	require('../assets/less/iconfont/iconfont.css')
	export default {
		props: ['infoItems','infoNavs','infoStatus'],
		methods: {
		    navMethod: function (i) {
		    	this.$dispatch('navClick', i);
		    }
		},
		ready() {
			console.log(this.infoItems);
		}
	}
</script>