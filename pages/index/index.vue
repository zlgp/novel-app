<template>
	<view class="index">
		<u-tabs name="cate_name" count="cate_count" bar-height="6" :list="list" :is-scroll="false" :current="current"
		 @change="tabChange" font-size="35" :offset="[5, 0]" :height="100" :show-bar="false"></u-tabs>
		<banner></banner>
		<view class="content">
			<!-- <keep-alive> -->
				<component :is="currentView"></component>
		<!-- 	</keep-alive> -->
		</view>
	</view>
</template>

<script>
	import banner from "@/components/index-banner/banner.vue"
	import boy from "@/components/index-boy/boy.vue"
	import recommend from "@/components/index-rocommend/recommend.vue"
	import girl from "@/components/index-girl/girl.vue"
	import online from "@/components/index-new-online/online.vue"
	export default {
		components: {
			com0: recommend,
			com1: boy,
			com2: girl,
			com3: online,
			banner
		},
		data() {
			return {
				list: [{
					cate_name: '重磅推荐',
					cate_count: "推荐"
				}, {
					cate_name: '男生',
					cate_count: "男生"
				}, {
					cate_name: '女生',
					cate_count: "女生"
				}, {
					cate_name: '最新上线',
					cate_count: "最新"
				}, ],
				current: 0,
				currentView: "com0"
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		onLoad() {

		},
		methods: {
			tabChange(index) {
				this.current = index;
				this.currentView = "com" + index
			}
		},

	}
</script>

<style lang="scss" scoped>
	.index {
		.content {
			padding: 0 30rpx;
			box-sizing: border-box;
		}
	}
</style>
