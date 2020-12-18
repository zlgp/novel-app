<template>
	<view class="setting">
		<view class="setting-avatar">
			<u-avatar :src="avatarUrl" mode="square" :show-sex="true" :show-level="true"></u-avatar>
			<view class="setting-name">{{nickName}}</view>
		</view>
		<view class="setting-opera">
			<u-grid :col="3" :border="false">
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="setting-msg">
			<u-cell-group>
				<u-cell-item icon="moments" title="扫一扫" @click="handleScan"></u-cell-item>
				<u-cell-item icon="integral-fill" title="分享" @click="handleShare"></u-cell-item>
				<u-cell-item icon="integral-fill" title="微信登陆" @click="handlelogin"></u-cell-item>
				<u-cell-item icon="integral-fill" title="直播推流" @click="handlePusher"></u-cell-item>
				<u-cell-item icon="integral-fill" title="观看直播" @click="handleLive"></u-cell-item>
				<u-cell-item icon="integral-fill" title="选择登陆" @click="handlechooseLogin"></u-cell-item>
			</u-cell-group>
		</view>
		<button type="default" @click="handleLoginOut" v-if="hasLogin!=false">退出登陆</button>
	</view>
</template>

<script>
	// 微信授权登录对象
	var aweixin = null;
	// 当前环境支持的所有授权登录对象
	var auths = {};
	import {
		mapMutations,
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				flash: false, //是否打开摄像头
				avatarUrl: "",
				nickName: ""
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

			handleScan() {
				uni.navigateTo({
					url: "../scan/scan"
				})
			},
			handleShare() {

				uni.shareWithSystem({
					type: "image",
					href: 'https://uniapp.dcloud.io',
					imageUrl: "../../static/icon/erw.png",
					success() {
						// 分享完成，请注意此时不一定是成功分享
					},
					fail() {
						// 分享失败
					}
				})


				// plus.share.sendWithSystem({

				// 		type:"image",
				// 		pictures:["../../static/icon/erw.png"],
				// 		href: 'https://www.dcloud.io/'


				// }, function() {
				// 	console.log('分享成功');
				// }, function(e) {
				// 	console.log('分享失败：' + JSON.stringify(e));
				// });

			},
			handlelogin() {
				let _self = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes);

									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											_self.login(infoRes.userInfo);
											_self.avatarUrl = infoRes.userInfo.avatarUrl
											_self.nickName = infoRes.userInfo.nickName
										}
									});
								}
							});
						}
					}
				});
			},
			handleLoginOut() {
				let _self = this
				uni.showModal({
					title: '退出登陆',
					content: '您是否要退出登陆',
					success: function(res) {
						if (res.confirm) {
							_self.loginout()
							_self.avatarUrl = ""
							_self.nickName = ""
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			handleLive() {
				uni.navigateTo({
					url: "../live/live"
				})
			},
			handlePusher(){
				uni.navigateTo({
					url: "../pusher/pusher"
				})
			},
			handlechooseLogin() {
				// 先获取所有服务
				// 运行环境支持的登录授权认证服务列表数组，可通过services.length获取服务列表的数目。 如果当前运行环境没有支持的登录授权认证服务，则返回空数组。
				plus.oauth.getServices(function(services) {
					console.log(services);
					for (var i in services) {
						auths[service.id] = service;
					}
					aweixin = auths['weixin'];
				}, function(e) {
					plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));
				});
			},
			...mapMutations(['login', 'loginout'])

		},
		computed: mapState(['hasLogin', 'uerInfo']),
	}
</script>

<style lang="scss" scoped>
	.setting {
		padding: 30rpx 30rpx;

		.setting-avatar {
			display: flex;
			align-items: center;

			.setting-name {
				font-size: 38rpx;
				margin-left: 50rpx;
				color: #4CD964;
			}
		}

		.setting-opera {
			display: flex;
			justify-content: space-around;
			width: 100%;
			border-radius: 15rpx;
			margin-top: 30rpx;
		}

		.setting-msg {
			margin-top: 30rpx;

			.grid-text {
				font-size: 28rpx;
				margin-top: 4rpx;
				color: $u-type-info;
			}
		}
	}
</style>
