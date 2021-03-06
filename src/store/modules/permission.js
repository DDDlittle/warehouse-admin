import { asyncRoutes, constantRoutes } from '@/router'
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    return roles.includes(route.meta.code)
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = [...constantRoutes, ...routes]
  }
}

const actions = {
  setRoutes({ commit }, data) {
    commit('SET_ROUTES', ...data)
  },
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      const arr = accessedRoutes.filter(i => !i.children || i.children.length > 0)
      commit('SET_ROUTES', arr)
      resolve(arr)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
