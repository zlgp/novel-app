<template>
	<view class="boy">
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<Detail :book_id="item.id">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="item.id"></u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.author}}
						</view>
						<!-- <view class="demo-shop">
						{{item.descript}}
					</view> -->
					</Detail>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<Detail :book_id="item.id">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="item.id"></u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.author}}
						</view>
					</Detail>
					<!-- 	<view class="demo-shop">
						{{item.descript}}
					</view> -->

				</view>
			</template>
		</u-waterfall>
		<view class="" v-for="(item,index) in catogoryList" :key="index">
			<u-cell-group :title="item[0].category">
				<u-cell-item v-for="(value,index) in item" :key="index" :title="value.name" :value="value.author" @click="goDetail(value.id)"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		Water
	} from "../../common/waterfall.js"
	import {
		User
	} from "../../common/catogory.js"
	export default {
		data() {
			return {
				flowList: [],
				recommendList: [],
				// count: 4,
				catogoryList: [],
				// dataList:[]

			}
		},
		mounted() {
			let recommend = new Water("/get/channel", this.flowList, this.recommendList, this)
			recommend.getRecommendList()
			// 获取分类
			// this.getCatogory()
			let user = new User("/get/channel", this, this.catogoryList)
			user.getCatogoryList()
		},
		methods: {
			// 获取分类
			// getCatogory() {
			// 	this.request('post', '/get/channel').then(res => {
			// 		this.catogoryList = res.boy.catogory
			// 	})
			// }
			goDetail(id) {
				uni.navigateTo({
					url: `../../pages/detail/detail?id=${id}`
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;

	}
</style>
