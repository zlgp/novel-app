<template>
	<view class="classify">
		<view class="classify-item">
			<text class="classify-item-name">频道</text>
			<view class="classify-item-tag">
				<u-tag v-for="(item,index) in channelList" :key="index" :text="item.tag" type="info" @click="tagClick(item.id,'频道')" />
			</view>
		</view>
		<view class="classify-item">
			<text class="classify-item-name">分类</text>
			<view class="classify-item-tag">
				<u-tag v-for="(item,index) in classifyList" :key="index" :text="item" type="info" @click="tagClick(item,'分类')" />
			</view>
		</view>
		<view class="classify-item">
			<text class="classify-item-name">年份</text>
			<view class="classify-item-tag">
				<u-tag v-for="(item,index) in yearList" :key="index" :text="item" type="info" @click="tagClick(item,'年份')" />
			</view>
		</view>
		<view class="classify-item">
			<text class="classify-item-name">进度</text>
			<view class="classify-item-tag">
				<u-tag v-for="(item,index) in planList" :key="index" :text="item.tag" type="info" @click="tagClick(item.id,'进度')" />
			</view>
		</view>
		<view class="">
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
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="status" @loadmore="addRandomData" :load-text="loadText"
				 :icon-type="iconType"> </u-loadmore>

			</u-waterfall>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 进度
				planList: [{
						tag: "已完结",
						id: 1
					},
					{
						tag: "连载中",
						id: 0
					}
				],
				// 频道
				channelList: [{
						tag: "男生",
						id: 0
					},
					{
						tag: "女生",
						id: 1
					}
				],
				classifyList: [],
				yearList: [],
				params: {
					category: [],
					girl: 0,
					is_end: -1,
					limit: 15,
					page: 1,
					year: 0
				},
				conditionList: [],
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				flowList: [],
				total_page: ""
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		async onLoad() {
			this.getYearTags()
			this.getClassifyTags()
			this.getCondition()
		},
		onReachBottom() {
			this.status = 'loading';

			// 模拟数据加载
			setTimeout(() => {
				if (this.params.page >= this.total_page) {
					this.status = 'nomore';
				} else {
					this.params.page += 1
					this.getCondition();
					this.status = 'loadmore';
				}
			}, 1000)
		},
		methods: {
			// 获取标签
			getYearTags() {
				this.request('post', '/get/year').then(res => {
					this.yearList = [...this.yearList, ...res.years]
				})
			},
			getClassifyTags() {
				this.request('post', '/get/category').then(res => {
					this.classifyList = res.category
				})
			},
			async tagClick(param, name) {
				switch (name) {
					case '频道':
						this.params.girl = param
						// 先请空
						await this.clear()
						// 再渲染
						await this.getCondition()
						break;
					case '分类':
						this.params.category = [...this.params.category, param]
						await this.clear()
						await this.getCondition()
						break;
					case '年份':
						this.params.year = param
						await this.clear()
						await this.getCondition()
						break;
					case '进度':
						this.params.is_end = param
						await this.clear()
						await this.getCondition()
						break;
				}
			},
			// 根据条件获取
			getCondition() {
				this.request('post', '/search/condition', { ...this.params
				}).then(res => {
					this.conditionList = res.books
					this.total_page = Math.ceil(res.count / 15);
					this.addRandomData();
				})
			},
			addRandomData() {
				for (let i = 0; i < this.conditionList.length; i++) {
					// let index = this.$u.random(0, this.conditionList.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.conditionList[i]))
					this.flowList.push(item);
				}
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classify {
		padding: 0 30rpx;

		.classify-item {
			display: flex;
			margin-top: 20rpx;


			.classify-item-name {
				width: 100rpx;
			}

			.classify-item-tag {
				flex: 1;
				display: flex;
				flex-wrap: wrap;

				.u-tag {
					margin: 0 10rpx 20rpx 0;
				}
			}
		}

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
	}
</style>
