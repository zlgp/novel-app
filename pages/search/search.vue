<template>
	<view class="search">
		<view class="search-hot">
			<view class="hot-title">热门搜索</view>
			<u-grid :col="3" :border="false">
				<u-grid-item v-for="(item,index) in hotList" :key="index" @click="handleGrid(item)">
					<view class="grid-text">{{item}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="search-history" v-show="historyList.length!=0">
			<view class="history-title">历史搜索</view>
			<u-grid :col="3" :border="false">
				<u-grid-item v-for="(item,index) in historyList" :key="index">
					<view class="grid-text">{{item}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-card v-for="(item,index) in bookList" :key="index">
			<view class="" slot="head">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="detail-msg">
						<view class="u-body-item-title u-line-2">书名:{{item.title}}</view>
						<view class="u-body-item-title u-line-2 msg-author">作者:{{item.author}}</view>
						<view class="u-body-item-title u-line-2 msg-type">类型:{{item.category}}</view>
					</view>
				</view>
			</view>
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.descript}}</view>
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
			</view>
			<view class="detail-foot" slot="foot">
				<u-button :ripple="true" ripple-bg-color="#909399" size="medium" type="success" shape="square" @click="handleRead(item.id)">
					开始阅读</u-button>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				hotList: [],
				bookList: [],
				historyList: [],
			}
		},
		onLoad() {
			this.getHotSearch()
		},
		// async onNavigationBarSearchInputChanged(e) {
		// 	if (e.text != "") {
		// 		this.historyList.push(e.text)
		// 	}
		// 	this.title = e.text
		// 	await this.getSearchBook()
		// },
		async onNavigationBarSearchInputConfirmed(e) {
			if (e.text != "") {
				this.historyList.push(e.text)
			}
			this.title = e.text
			await this.getSearchBook()
		},
		methods: {
			getHotSearch() {
				this.request('post', '/get/associate', {
					title: this.title
				}).then(res => {
					this.hotList = res.titles
				})
			},
			getSearchBook() {
				this.request('post', '/search/name', {
					title: this.title
				}).then(res => {
					this.bookList = res.booklist
					console.log(this.bookList);
				})
			},
			async handleGrid(title) {
				this.title = title
				this.historyList.push(title)
				await this.getSearchBook()
			},
			handleRead(id){
				uni.navigateTo({
					url:`../read/read?chapter_id=${1}&=&book_id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		.search-hot {
			.hot-title {
				padding-left: 30rpx;
				box-sizing: border-box;
				height: 100rpx;
				display: flex;
				align-items: center;
				font-size: 35rpx;
				background-color: rgba(0, 0, 0, .03);
			}
		}

		.search-history {
			margin-bottom: 30rpx;

			.history-title {
				padding-left: 30rpx;
				box-sizing: border-box;
				height: 100rpx;
				display: flex;
				align-items: center;
				font-size: 35rpx;
				background-color: rgba(0, 0, 0, .03);
			}
		}

		.detail-msg {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

		}

		.u-card-wrap {
			background-color: $u-bg-color;
			padding: 1px;
		}

		.u-body-item {
			font-size: 32rpx;
			color: #333;
			padding: 20rpx 10rpx;
		}

		.u-body-item image {
			width: 120rpx;
			flex: 0 0 120rpx;
			height: 120rpx;
			border-radius: 8rpx;
			margin-left: 12rpx;
		}

		.msg-author {
			font-size: 28rpx;
			font-weight: 400;
			color: #4bcacc;
		}

		.msg-type {
			font-size: 25rpx;
			font-weight: 400;
			color: #d32f2f;
		}

		.detail-foot {
			display: flex;
			justify-content: flex-end;

		}
	}
</style>
