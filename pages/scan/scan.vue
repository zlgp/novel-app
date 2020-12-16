<template>
	<view></view>
</template>

<script>
	var barcode = null;
	export default {
		data() {
			return {
				name: '请对准二维码进行扫码', //要在扫码界面自定义的内容
				flash: false, //是否打开摄像头
				type: ''
			}
		},
		onLoad() {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			//#ifdef APP-PLUS
			plus.navigator.setFullscreen(true); //全屏
			let currentWebview = page.$getAppWebview();
			this.createBarcode(currentWebview); //创建二维码窗口
			this.createView(currentWebview); //创建操作按钮及tips界面
			//#endif
		},
		methods: {
			// 创建自定义扫码窗口
			createBarcode(currentWebview) {
				barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
					top: '0',
					left: '0',
					width: '100%',
					height: '100%',
					scanbarColor: '#1DA7FF',
					position: 'static',
					frameColor: '#1DA7FF'
				});
				barcode.onmarked = this.onmarked;
				barcode.setFlash(this.flash);
				currentWebview.append(barcode);
				barcode.start();
			},
			// 扫码成功回调
			onmarked(type, result) {
				var text = '未知: ';
				switch (type) {
					case plus.barcode.QR:
						text = 'QR: ';
						break;
					case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
					case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
				}
				// 关闭全屏
				plus.navigator.setFullscreen(false);
				// 后退一个页面
				uni.navigateBack({
					delta: 1
				});
				// 成功之后要做什么
				// 跳转获取到的路径
				plus.runtime.openWeb(result, function() {
					// 识别失败代码
				});
				// 关闭扫吗界面
				barcode.close();
			},
			// 创建操作按钮及tips
			async createView(currentWebview) {
				// 创建返回原生按钮
				var backVew = new plus.nativeObj.View('backVew', {
						top: '0px',
						left: '0px',
						height: '40px',
						width: '35px'
					},
					[{
						tag: 'img',
						id: 'backBar',
						src: 'static/icon/_search.png',
						position: {
							top: '2px',
							left: '3px',
							width: '35px',
							height: '35px'
						}
					}],
				);
				// 创建相册
				var photoVew = new plus.nativeObj.View('photoVew', {
						top: '0px',
						left: '90%',
						height: '40px',
						width: '35px',
					},
					[{
						tag: 'img',
						id: 'photoBar',
						src: 'static/icon/_img.png',
						position: {
							top: '2px',
							left: '0px',
							width: '35px',
							height: '35px'
						}
					}],
				);


				// 创建打开手电筒的按钮
				var scanBarVew = new plus.nativeObj.View('scanBarVew', {
						top: '60%',
						left: '40%',
						height: '10%',
						width: '20%'
					},
					[{
							tag: 'img',
							id: 'scanBar',
							src: 'static/icon/_home.png',
							position: {
								width: '28%',
								left: '36%',
								height: '30%'
							}
						},
						{
							tag: 'font',
							id: 'font',
							text: '轻触照亮',
							textStyles: {
								size: '10px',
								color: '#ffffff'
							},
							position: {
								width: '80%',
								left: '10%'
							}
						}
					]);
				// 创建展示类内容组件
				var content = new plus.nativeObj.View('content', {
						top: '0px',
						left: '0px',
						height: '100%',
						width: '100%'
					},
					[{
							tag: 'font',
							id: 'scanTitle',
							text: '扫码',
							textStyles: {
								size: '18px',
								color: '#ffffff'
							},
							position: {
								top: '0px',
								left: '0px',
								width: '100%',
								height: '40px'
							}
						},
						{
							tag: 'font',
							id: 'scanTips',
							text: this.name,
							textStyles: {
								size: '14px',
								color: '#ffffff',
								whiteSpace: 'normal'
							},
							position: {
								top: '90px',
								left: '10%',
								width: '80%',
								height: 'wrap_content'
							}
						}
					]);
				// 创建从相册中拿到二维码进行扫码
				photoVew.interceptTouchEvent(true);
				backVew.interceptTouchEvent(true);
				scanBarVew.interceptTouchEvent(true);
				currentWebview.append(content);
				currentWebview.append(scanBarVew);
				currentWebview.append(backVew);
				currentWebview.append(photoVew);
				backVew.addEventListener("click", function(e) { //返回按钮
					uni.navigateBack({
						delta: 1
					});
					barcode.close();
					plus.navigator.setFullscreen(false);
				}, false);

				photoVew.addEventListener("click", function(e) {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							// // 扫码识别图片中的二维码
							plus.barcode.scan(res.tempFilePaths[0], function(type, result) {

								plus.runtime.openWeb(result, function() {
									// 识别失败代码
								});
								barcode.close();
								plus.navigator.setFullscreen(false);
								uni.showToast({
									icon: "success",
									title: "扫码成功",
								})
							}, function(e) {
								uni.showToast({
									icon: "none",
									title: "扫码失败",
								})
							});

						}
					});




				}, false)


				var temp = this;
				scanBarVew.addEventListener("click", function(e) { //点亮手电筒
					temp.flash = !temp.flash;
					if (temp.flash) {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/icon/_home.png',
								position: {
									width: '28%',
									left: '36%',
									height: '30%'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: '轻触照亮',
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '80%',
									left: '10%'
								}
							}
						]);
					} else {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/icon/_home.png',
								position: {
									width: '28%',
									left: '36%',
									height: '30%'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: '轻触照亮',
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '80%',
									left: '10%'
								}
							}
						])
					}
					if (barcode) {
						barcode.setFlash(temp.flash);
					}
				}, false)
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			// 返回时退出全屏
			barcode.close();
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onUnload() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		}
	}
</script>

<style>
</style>
