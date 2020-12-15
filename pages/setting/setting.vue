<template>
	<view class="setting">
		<view class="setting-avatar">
			<u-avatar :src="src" mode="square" :show-sex="true" :show-level="true"></u-avatar>
			<view class="setting-name">liao</view>
		</view>
		<view class="setting-opera">
			<u-grid :col="3" :border="false" >
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
				<u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
				<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		}
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
