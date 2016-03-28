<style lang="less">
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';
.info-list-container{
		position: absolute;
		left: 15px;
		right: 15px;
		top: 400px;
		bottom: 200px;
		overflow-y: auto;
		.info-list-info{
			width: 100%;
			height: 480px;
			background-color: @color6;
			position: absolute;
			top: 0;
			overflow: hidden;
			#item-wrap{
				list-style: none;
				margin-top: 80px;
				margin-left: 80px;
				li{
					margin-top: 50px;
					font-size: 32px;
					i{
						font-size: 38px;
						margin-right: 16px;
					}
				}
			}
			.watermark{
				position: absolute;
				bottom: -24px;
				right: -24px;
				color: @color1;
				width: 160px;
				height: 160px;
				line-height: 160px;
				text-align: center;
				font-size: 42px;
				border: 6px solid @color1;
				border-radius: 50%;
				transform:rotate(-30deg);
				-ms-transform:rotate(-30deg);
				-moz-transform:rotate(-30deg);
				-webkit-transform:rotate(-30deg);
				-o-transform:rotate(-30deg);
			}
		}
		.info-list-setting{
			width: 100%;
			height: 120px;
			background-color: @color1;
			position: absolute;
			bottom: 0;
			a{
				display: block;
				flex:1.0;
				border-right: 1px solid @color6;
				height: 100px;
				position: relative;
				top: 50%;
				margin-top: -50px;
			}
			a:nth-last-child(1){
				border: none;
			}
			span{
				&:before{
					font-size: 35px;
				    display: inline-block;
				    margin: 12px 0;
				}
			}
			p{
				font-size: 26px;
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
		  <div class="watermark">{{ infoStatus }}</div>
		</div>
		<div class="info-list-setting flexbox">
	        <a v-for="nav in infoNavs">
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
		ready() {
			console.log(this.infoItems);
		}
	}
</script>