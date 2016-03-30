<style lang="less">
@import '../assets/less/common/func.less';
.avatar-banner {	
	height: 330px;
	width: 100%;
	background-color: @blue1;
	padding-top: 15px;
	.avatar {
		height: 180px;
		width: 180px;
		border: 6px solid @card-white5;
		border-radius: 50%;
		overflow: hidden;
		margin: 0px auto 30px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	p {
		text-align: center;
		font-size: 30px;
		color: @card-white5;
	}
}
</style>
<template>
	<div class="avatar-banner">
		<div class="avatar"><img :src="userInfo.avatar" alt=""></div>	
		<p> {{ userInfo.name }} </p>
	</div>
</template>
<script>
	export default {
		props: ['userInfo']
	}
</script>