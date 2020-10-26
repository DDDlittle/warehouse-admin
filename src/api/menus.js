import Request from '@/utils/request'

export function list(data) {
  return Request.post('/menus/list', data)
}

export function add(data) {
  return Request.post('/menus/add', data)
}

export function edit(data) {
  return Request.post('/menus/edit', data)
}

export function del(data) {
  return Request.post('/menus/del', data)
}

export function status(data) {
  return Request.post('/menus/status', data)
}

