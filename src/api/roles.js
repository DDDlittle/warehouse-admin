import Request from '@/utils/request'

export function list(data) {
  return Request.post('/roles/list', data)
}

export function add(data) {
  return Request.post('/roles/add', data)
}

export function edit(data) {
  return Request.post('/roles/edit', data)
}

export function del(data) {
  return Request.post('/roles/del', data)
}

export function status(data) {
  return Request.post('/roles/status', data)
}

export function menus(data) {
  return Request.post('/roles/menus', data)
}
