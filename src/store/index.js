import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
        userToken: localStorage.getItem('userToken') ? localStorage.getItem('UserToken') : '',
        noticeUserCount: 0
    },
    mutations: {
        //用户登录，保存用户信息和token
        changeLogin(state, {user, userToken}) {
            state.user = user;
            state.userToken = userToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userToken', userToken);
        },
        //用户登出，清除用户信息和token
        changeLogout(state) {
            state.user = null;
            state.userToken = '';
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
        },
        changeUserInfo(state, {user}) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        changeNoticeUserCount(state){
            state.noticeUserCount += 1;
        }
    },
    actions: {
        //用户登录
        changeLogin({commit}, {user, userToken}) {
            commit('changeLogin', {user: user, userToken: userToken});
        },
        //用户登出
        changeLogout({commit}) {
            commit('changeLogout');
        },
        changeUserInfo({commit}, {user}) {
            commit('changeUserInfo', {user: user});
        },
        changeNoticeUserCount({commit}){
            commit('changeNoticeUserCount');
        }
    },
    modules: {}
})
