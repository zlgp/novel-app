<template>
	<view class="" @click="goDetail()">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: ["book_id"],
		methods: {
			goDetail() {
				uni.navigateTo({
					url: `../../pages/detail/detail?id=${this.book_id}`
				})
			}
		}
	}
</script>

<style>
</style>
