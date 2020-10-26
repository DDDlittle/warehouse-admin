export function strictUrl(rule, value, callback) {
  const reg = /(http|https):\/\/[\w\-\.,@?^=%&amp;:/~\+#]{0,26}\.[\w]{2,6}[\w\-\.,@?^=%&amp;:/~\+#]{0,26}/
  if (value && !(reg.test(value))) {
    callback(new Error('请输入格式为：http://www.abc.com、http://abc.com的网址'))
  } else {
    callback()
  }
}
export function commonUrl(rule, value, callback) {
  const reg = /[\w\-\.,@?^=%&amp;:/~\+#]{0,26}\.[\w]{2,6}[\w\-\.,@?^=%&amp;:/~\+#]{0,26}/
  if (!(reg.test(value))) {
    callback(new Error('请输入格式为：www.abc.com、abc.com的网址'))
  } else {
    callback()
  }
}

