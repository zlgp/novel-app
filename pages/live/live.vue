<template>
</template>

<script>
	export default {
		onLoad() {
			//#ifdef APP-PLUS
			// // 创建推流地址
			// const currentWebview = this.$mp.page.$getAppWebview()
			// var pusher = plus.video.createLivePusher("livepusher", {
			// 	url: 'rtmp://58.200.131.2:1935/livetv/cctv1',
			// 	top: '100px',
			// 	left: '0px',
			// 	width: '100%',
			// 	height: '300px',
			// 	position: 'static'
			// });
			
			const currentWebview = this.$mp.page.$getAppWebview()
			var play = plus.video.createVideoPlayer("VideoPlayer", {
				src: 'rtmp://58.200.131.2:1935/livetv/cctv1',
				autoplay: true,
				"enable-danmu": "true"
			});
			currentWebview.append(play);

			//#endif
		}
	}
</script>

<style>
</style>
