<script>
	export default {
		onLaunch() {
			// const _self = this
			// const _handlePush = function(message) {
			// 	console.log(message);
			// 	// 获取自定义信息
			// 	let payload = message.payload
			// 	try {
			// 		// JSON解析
			// 		payload = JSON.parse(payload)
			// 		console.log(payload);
			// 		// 携带自定义信息跳转应用页面
			// 		uni.navigateTo({
			// 			url: '/pages/page?data=' + payload
			// 		})
			// 	} catch (e) {}
			// }
			// // 事件处理
			// plus.push.addEventListener('click', _handlePush)
			// plus.push.addEventListener('receive', _handlePush)
			// #ifdef APP-PLUS
			let timer = false;
			plus.push.addEventListener("click", (msg) => {
				// 防抖
				clearTimeout(timer);
				timer = setTimeout(() => {
					console.log(1111, msg);
					if (msg.payload) {
						uni.navigateTo({
							url: msg.payload
						})
					}
				}, 1500)
			}, false)
			plus.push.addEventListener("receive", (msg) => {
				if ("LocalMSG" == msg.payload) {} else {
					if (msg.type == 'receive') {
						var options = {
							cover: false,
							title: msg.title
						};
						plus.push.createMessage(msg.content, msg.payload, options);
					}
				}
			}, false)
			// #endif
		},


	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
