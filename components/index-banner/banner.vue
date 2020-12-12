<template>
	<view class="banner">
		<view class="wrap">
			<u-swiper :list="bannerList" :effect3d="true" :title="true" name="cover" @click="goDetail" img-mode="scaleToFill"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[]
			}
		},
		mounted() {
			// 获取轮播图
			this.getBannerList()
		},
		methods: {
			getBannerList() {
				this.request('post','/get/slide').then(res => {
					this.bannerList=res.slidelist[0]
				})
			},
			goDetail(index){
				uni.navigateTo({
					url:`../../pages/detail/detail?id=${this.bannerList[index].id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		.wrap {
			padding: 30rpx;
		}
	}
</style>
