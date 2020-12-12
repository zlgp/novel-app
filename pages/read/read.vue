<template>
	<view class="read">
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
		<view class="" v-html="bookMsg.content" @touchstart="handleStart" @touchend="handleEnd"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 章节id
				chapter_id: 1,
				// 书id
				book_id: 24,
				bookMsg: {},
				startData: {
					clientX: '',
					clientY: ''
				},
				direction: ""
			}
		},
		async onLoad(option) {
			// this.chapter_id = option.chapter_id
			// this.book_id = option.book_id
			await this.getBook()
		},
		methods: {
			getBook() {
				this.request('post', `/book/${this.book_id}/${this.chapter_id}`).then(res => {
					this.bookMsg = res
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
					console.log('右滑')
					this.direction = '右滑'
					if (this.chapter_id != 1) {
						this.chapter_id -= 1
					}
					this.getBook()

				} else if (subX < -100) {
					console.log('左滑')
					this.direction = '左滑'
					this.chapter_id += 1
					this.getBook()
				} else {
					this.direction = '无效'
					console.log('无效')
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
		}
	}
</script>

<style lang="scss" scoped>
	.read {
		padding: 0rpx 30rpx;

		.read-msg {
			display: flex;
			justify-content: space-around;
			margin-top: 30rpx;
			margin-bottom: 30rpx;

			.name {
				font-size: 30rpx;
				font-weight: 400;
				color: #4bcacc;
			}

			.title {
				font-size: 30rpx;
				font-weight: 400;
				color: #86898f;

			}

			.chapter {
				font-size: 30rpx;
				font-weight: 400;
				color: #86898f;

			}
		}
	}
</style>
