class User {
	constructor(url, self, catogoryList) {
		this.url = url
		this.self = self
		this.catogoryList = catogoryList
		// this.dataList = dataList
	}
	getCatogoryList() {
		this.self.request('post', this.url).then(res => {
			let result=res.girl.catogory
			// console.log(result);
			res.girl.catogory.forEach(item=>{
				this.catogoryList.push(item)
			})
			// this.catogoryList = res.boy.catogory
			// this.changeList()
		})
	}
	// changeList() {
	// 	this.catogoryList.forEach(item => {
	// 		this.dataList.push(item)
	// 	})
	// }


}

module.exports = {
	User
}
