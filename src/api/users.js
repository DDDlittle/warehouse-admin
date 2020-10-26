import Request from '@/utils/request'

export function list(data) {
  return Request.post('/users/list', data)
}

export function add(data) {
  return Request.post('/users/add', data)
}

export function edit(data) {
  return Request.post('/users/edit', data)
}

export function del(data) {
  return Request.post('/users/del', data)
}

export function status(data) {
  return Request.post('/users/status', data)
}

export function roles(data) {
  return Request.post('/users/roles', data)
}
