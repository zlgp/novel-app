<template>
	<view class="detail">
		<u-card>
			<view class="" slot="head">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="detail-msg">
						<view class="u-body-item-title u-line-2">书名:{{detaliMsg.title}}</view>
						<view class="u-body-item-title u-line-2 msg-author">作者:{{detaliMsg.author}}</view>
						<view class="u-body-item-title u-line-2 msg-type">类型:{{detaliMsg.category}}</view>
						<u-badge size="default" type="success" count="已完结" :offset="[-25,400]" v-if="detaliMsg.is_end==true"></u-badge>
						<u-badge size="default" type="success" count="连载中" :offset="[-25,400]" v-if="detaliMsg.is_end==false"></u-badge>
					</view>
				</view>
			</view>
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{detaliMsg.descript}}</view>
					<image :src="detaliMsg.cover" mode="aspectFill"></image>
				</view>
			</view>
			<view class="detail-foot" slot="foot">
				<u-button :ripple="true" ripple-bg-color="#909399" size="medium" type="success" shape="square"> 开始阅读</u-button>
			</view>
		</u-card>

		<view class="">
			<u-cell-group title="章节">
				<u-cell-item v-for="(value,index) in list" :key="index" :title="value.title" :value="'第'+value.chapter+'章'"></u-cell-item>
			</u-cell-group>
			<u-loadmore :status="status" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				detaliMsg: {},
				zerothList: [],
				status: 'loadmore',
				page: 1,
				zerothList: [],
				start: 0,
				limit: 10,
				list: []

			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		async onLoad(option) {
			this.id = option.id
			await this.getDetail()
		},
		onReachBottom() {
			// 总条数
			let total = this.zerothList.length
			// 总页数
			let total_page = (Math.ceil(parseInt(this.zerothList.length) / 10))
			if (this.page >= total_page) return;
			this.status = 'loading';
			this.page = ++this.page;
			this.start = (this.page - 1) * 10
			this.limit = this.start + 10
			setTimeout(() => {
				this.zerothList.slice(this.start, this.limit).forEach(item => {
					this.list.push(item)
				})
				if (this.page >= total_page) this.status = 'nomore';
				else this.status = 'loading';
			}, 2000)
		},
		methods: {
			async getDetail() {
				await this.request('post', `/book/detail/${this.id}`).then(res => {
					this.detaliMsg = res
				})
				await this.getBookCatelog()
			},
			// 获取所有章节
			getBookCatelog() {
				this.start = (this.page - 1) * this.limit
				this.request('post', '/book/catelog', {
					id: this.detaliMsg.id,
					ascending: true
				}).then(res => {
					this.zerothList = res.chapter_list
					this.list = res.chapter_list.slice(this.start, this.limit)
				})
			},
		}

	}
</script>
<style scoped lang="scss">
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
</style>
