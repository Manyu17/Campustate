<style lang="less">
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';
.bindings-success-container{
		position: absolute;
		left: 15px;
		right: 15px;
		top: 400px;
		bottom: 200px;
		overflow-y: auto;
		.bindings-success-info{
			width: 100%;
			height: 480px;
			background-color: @color6;
			position: absolute;
			top: 0;
			overflow: hidden;
			#bindings-info{
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
		.bindings-success-setting{
			width: 100%;
			height: 120px;
			background-color: @color1;
			position: absolute;
			bottom: 0;
			a{
				display: block;
				-moz-box-flex:1.0; /* Firefox */
				-webkit-box-flex:1.0; /* Safari and Chrome */
				box-flex:1.0;
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
	<div class="bindings-success-container">
		<div class="bindings-success-info">
		  <ul id="bindings-info">
		      <li v-for="item in infoItems">
		          <i :class="item.icon"></i>
		          {{ item.message }}
		      </li>
		  </ul>
		  <div class="watermark">{{ infoStatus }}</div>
		</div>
		<div class="bindings-success-setting flexbox">
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