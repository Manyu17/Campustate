<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/basic.less';
.bindings-input-container{
	padding-top: 75px;
	.bindings-input-list {
		input {
			width: 465px;
			height: 90px;
			border: none;
			display: block;
			margin: 0 auto 35px;
			padding: 0 30px;
			border-radius: 10px;
		}
	}
	p{
		text-align: center;
		color: @font-gray2;
	}
}
</style>
<template>
	<div class="bindings-input-container">
		<div class="bindings-input-list">
		    <input v-for="list in inputLists" :type="list.type" :placeholder="list.placeholder" v-on:focus="setValue(list, $event)">
		</div>
		<p>{{ tip }}</p>
	</div>
</template>
<script>
	export default {
		props: ['inputLists', 'tip'],
		methods: {
		    setValue: function (list, e) {
		      if(list.readonly){
		      	console.log(e.currentTarget);
		      }
		    }
		  }
	}
</script>