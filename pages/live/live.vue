<template>
	<view class="live">

	</view>
</template>

<script>
	var play = null
	var inputView = null

	export default {
		data() {
			return {

				text: "",

			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview()
			this.videoPlay(currentWebview)
			// 绘制一个按钮还有输入框来发送弹幕
			this.createView(currentWebview)
			//#endif
		},
		methods: {
			// 创建原生图层
			createView(currentWebview) {
				// 弹幕输入框
				inputView = new plus.nativeObj.View('inputVew', {
						top: '268px',
						left: '10%',
						height: '40px',
						width: '80%'
					},
					[{
						tag: 'input',
						id: 'inputBar',
						inputStyles: {
							type: "text",
							placeholder: "请输入弹幕",
							// 用户输入点击完成或者进去时候触发
							onComplete: function(e) {
								// 发送弹幕
								play.sendDanmu({
									text: e.text,
									color: '#FF0000',
									time: 12,
								});
							}
						},

					}],
				);
				currentWebview.append(inputView);
			},
			// 创建拉流播放
			videoPlay(currentWebview) {
				play = plus.video.createVideoPlayer("VideoPlayer", {
					top: '0px',
					left: '0px',
					width: '100%',
					height: '200px',
					position: 'static',
					src: 'rtmp://58.200.131.2:1935/livetv/cctv1',
					// src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
					autoplay: true,
					"enable-danmu": true,
					controls: true,
					"danmu-btn": true,
					"show-mute-btn": true,
					"show-center-play-btn": true,
					// 视频封面
					"poster": "",
					// 视频弹幕
					"danmu-list": [{
						time: 12,
						text: "1111",
						"color": "#000000"
					}]

				});
				currentWebview.append(play);
			},
		}
	}
</script>

<style>
</style>
