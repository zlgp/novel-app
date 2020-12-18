<template>
	<view class="chat" style="position: absolute;z-index: 99;width: 100%;height: 50px;top:300px;">
		<button type="default" @click="endPusher">结束推流</button>
		<button type="default" @click="stopPusher">暂停推流</button>
		<button type="default" @click="resumePusher">恢复推流</button>
		<button type="default" @click="switchCamera">切换前后摄像头</button>
	</view>

</template>

<script>
	var pusher = null
	export default {
		onLoad() {
			//#ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview()
			// 创建拉流地址
			this.videPusher(currentWebview)
			//#endif
		},
		methods: {
			// 创建推流
			videPusher(currentWebview) {
				// 创建推流地址
				pusher = plus.video.createLivePusher("livepusher", {
					url: 'rtmp://58.200.131.2:1935/livetv/cctv1',
					top: '0px',
					left: '0px',
					width: '100%',
					height: '300px',
					position: 'static'
				});
				currentWebview.append(pusher);
			},
			// 创建关闭推流按钮
			endPusher() {
				//#ifdef APP-PLUS
				pusher.close();
				//#endif
				uni.navigateBack({
					delta: 1
				});
			},
			stopPusher() {

				//#ifdef APP-PLUS
				pusher.stop({
					preview: true
				})
				//#endif	
			},
			resumePusher() {
				//#ifdef APP-PLUS
				pusher.resume();
				//#endif
			},
			switchCamera() {
				//#ifdef APP-PLUS
				pusher.switchCamera()
				//#endif
			}
		}
	}
</script>

<style>
</style>
