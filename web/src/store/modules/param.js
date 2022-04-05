// 路由参数仓库
export default {
    namespaced: true,
    state: {
        courseOutline: {}
    },
    mutations: {
        setCourseOutline(state, payload) {
            state.courseOutline = payload
        }
    }
}