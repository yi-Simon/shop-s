import { reqCateGoryList } from '@/api'

const state = {
    categoryList: []
}
const mutations = {
    RECEIVECATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const getters = {}
const actions = {
    async getCategoryList({ commit }) {
        const result = await reqCateGoryList()
        if (result.status === 200) {
            commit('RECEIVECATEGORYLIST', result.data.data)
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}