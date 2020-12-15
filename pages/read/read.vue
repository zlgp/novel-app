<template>
	<view class="read" id="read">
		<view :class="current?'active':''">
			<view class="read-msg">
				<text class="name">
					书名:{{bookMsg.name}}
				</text>
				<text class="title">作者:{{bookMsg.title}}</text>
				<text class="chapter">章节:第{{bookMsg.chapter}}章</text>
			</view>
			<!-- <swiper :circular="true" @animationfinish="animationfinish" @touchstart="handleStart" @touchend="handleEnd">
			<swiper-item>
				<view class="" v-html="bookMsg.content"></view>
			</swiper-item>
		</swiper> -->
			<view class="read-content" id="read-content" v-html="bookMsg.content" @touchstart="handleStart" @touchend="handleEnd"
			 :class="current?'active':''"></view>
		</view>
		<!-- 底部导航栏 -->
		<u-tabbar v-model="currentTabbar" :list="list" :show="showTabbar" @change="changeTabbar"></u-tabbar>
		<!-- 目录弹出层 -->
		<u-popup v-model="showPopup" length="80%" mode="left">
			<view class="read-msg catalog-msg">
				<text class="name">
					书名:{{bookMsg.name}}
				</text>
				<text class="title">作者:{{bookMsg.title}}</text>
				<text class="chapter">章节:第{{bookMsg.chapter}}章</text>
			</view>
			<view class="">
				<view class="CatalogList-title">
					<view class="">
						目录
					</view>
					<view class="" @click="changeRank(0)" v-show="!showRank">
						升序
					</view>
					<view class="" @click="changeRank(1)" v-show="showRank">
						降序
					</view>
				</view>
				<u-cell-group>
					<u-cell-item v-for="(value,index) in CatalogList" :key="index" :title="value.title" :value="'第'+value.chapter+'章'"
					 :arrow="false" @click="changeCatalog(value.chapter)"></u-cell-item>
				</u-cell-group>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 章节id
				chapter_id: "",
				// 书id
				book_id: "",
				ascending: true,
				bookMsg: {},
				CatalogList: [],
				startData: {
					clientX: '',
					clientY: ''
				},
				direction: "",
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '目录',
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '夜间',
						customIcon: false,
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '设置',
						customIcon: false,
					}

				],
				currentTabbar: "",
				showTabbar: true,
				showPopup: false,
				// changMode: false,
				showRank: true,
				current: false,
			}
		},
		async onLoad(option) {
			this.chapter_id = parseInt(option.chapter_id)
			this.book_id = parseInt(option.book_id)
			// 获取book的内容和信息
			await this.getBook()
			// 获取book的全部目录
			await this.getBookCatalog()
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		methods: {
			getBook() {
				this.request('post', `/book/${this.book_id}/${this.chapter_id}`).then(res => {
					this.bookMsg = res
				})
			},
			getBookCatalog() {
				this.request('post', '/book/catelog', {
					ascending: this.ascending,
					id: this.book_id
				}).then(res => {
					this.CatalogList = res.chapter_list
				})
			},
			handleStart(e) {
				this.startData.clientX = e.changedTouches[0].clientX;
				// this.startData.clientY = e.changedTouches[0].clientY;
			},
			handleEnd(e) {

				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				// const subY = e.changedTouches[0].clientY - this.startData.clientY;
				// if (subY > 50 || subY < -50) {
				// 	if (subY > 50) {
				// 		console.log('下滑')
				// 	} else if (subY < -50) {
				// 		console.log('上滑')
				// 	}
				// } else {
				// 	if (subX > 100) {
				// 		console.log('右滑')
				// 	} else if (subX < -100) {
				// 		console.log('左滑')
				// 	} else {
				// 		console.log('无效')
				// 	}
				// }
				if (subX > 100) {
					this.direction = '右滑'
					if (this.chapter_id != 1) {
						this.chapter_id -= 1
						this.getBook()
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
					}



				} else if (subX < -100) {
					this.direction = '左滑'
					if (this.chapter_id != this.CatalogList.length) {
						this.chapter_id += 1
						this.getBook()
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
					}

				} else {
					this.direction = '无效'
					// this.showTabbar = !this.showTabbar
				}
			},
			// animationfinish(event) {
			// 	if (this.direction == '右滑') {
			// 		this.chapter_id += 1
			// 		this.getBook()
			// 	} else if (this.direction == '左滑') {
			// 		if (this.chapter_id != 1) {
			// 			this.chapter_id -= 1
			// 		}
			// 		this.getBook()
			// 	} else {
			// 		console.log('无效');
			// 	}
			// }
			changeTabbar(index) {
				this.currentTabbar = index
				switch (this.currentTabbar) {
					case 0:
						this.showPopup = true
						break;
					case 1:
						this.changMode = !this.changMode
						if (this.changMode == false) {
							this.current = false
							this.list[1].text = "夜间"
						} else {
							this.current = true
							this.list[1].text = "白天"
						}
						break;
				}
			},

			async changeCatalog(chapter) {
				this.chapter_id = chapter
				await this.getBook()
			},
			async changeRank(index) {
				this.showRank = !this.showRank
				switch (index) {
					case 0:
						this.ascending = true
						await this.getBookCatalog()
						break;
					case 1:
						this.ascending = false
						await this.getBookCatalog()
						break;
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.read {
		padding: 0rpx 30rpx;

		/deep/.read-content {
			line-height: 60rpx;
			font-size: 35rpx;
		}

		.read-msg {
			display: flex;
			justify-content: space-around;
			margin-top: 30rpx;
			margin-bottom: 30rpx;

			.name {
				font-size: 25rpx;
				font-weight: 400;
				color: #4bcacc;
			}

			.title {
				font-size: 25rpx;
				font-weight: 400;
				color: #86898f;

			}

			.chapter {
				font-size: 25rpx;
				font-weight: 400;
				color: #86898f;

			}
		}

		.catalog-msg {
			border-bottom: 2rpx solid #4CD964;
			height: 100rpx;
			align-items: center;
		}

		.CatalogList-title {
			padding: 0 30rpx 16rpx 30rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
		}

		.active {
			background-color: #000 !important;
			color: #fff !important;

		}
	}
</style>
