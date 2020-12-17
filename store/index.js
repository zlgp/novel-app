import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uerInfo: {
			token:""
		},
		hasLogin: false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.uerInfo.token = provider.token
			state.uerInfo.userName = provider.user_name
			state.uerInfo.nickName=provider.nickName
			state.uerInfo.avatarUrl=provider.avatarUrl
			uni.setStorage({
				key: 'uerInfo',
				data: provider
			})
		},
		loginout(state) {
			state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			});
		}
	}
})

export default store
