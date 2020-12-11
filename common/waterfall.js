class Water {
	constructor(url,flowList, recommendList, self) {
		this.url=url
		this.self = self
		this.flowList = flowList
		this.recommendList = recommendList
	}
	getRecommendList() {
		this.self.request('post', this.url).then(res => {
			this.recommendList = res.recommandlist||res.online
			console.log(this.recommendList);
			this.addRandomData()
		})

	}
	addRandomData() {
		for (let i = 0; i < this.recommendList.length; i++) {
			// let index = this.$u.random(0, this.recommendList.length - 1);
			// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
			let item = JSON.parse(JSON.stringify(this.recommendList[i]))
			this.flowList.push(item);
		}
	}

}

module.exports = {
	Water
}
