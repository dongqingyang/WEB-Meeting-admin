import { getInfo, login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    avatar: '',
    onsid: '',
    uid: '',
    isadmin: '',
    ret_msg: '',
    SET_code: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ONSID: (state, onsid) => {
    state.onsid = onsid
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_ISADMIN: (state, isadmin) => {
    state.isadmin = isadmin
  },
  SET_MSG: (state, ret_msg) => {
    state.ret_msg = ret_msg
  },
  SET_CODE: (state, ret_code) => {
    state.ret_code = ret_code
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.onsid)
        setToken(response.onsid)
        sessionStorage.setItem('token', response.onsid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        if (!response) {
          return reject('验证失败，请重新登录.')
        }
        const { onsid, uid, isadmin, ret_msg, ret_code } = response
        commit('SET_ONSID', onsid)
        commit('SET_UID', uid)
        commit('SET_ISADMIN', isadmin)
        commit('SET_MSG', ret_msg)
        commit('SET_CODE', ret_code)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

