// 请求的域名
let baseURL = ""
if (process.env.NODE_ENV == "development") {
	baseURL = "http://18.141.135.79:8100"
} else {
	baseURL = "http://18.141.135.79:8100"
}

module.exports = baseURL
