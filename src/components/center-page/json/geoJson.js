/*
 * @Author: honghaosheng
 * @Date: 2023-07-12 10:42:50
 * @LastEditors: honghaosheng
 * @LastEditTime: 2023-07-12 15:42:05
 */
import axios from 'axios'
export async function getAdcode(url, parameters) {
  // fetch的get方法需要拼接，post，put这种方法才有对应的data参数，还得用json转换,axios已经封装好了的
  for (const key in parameters) {
    url = url + key + '=' + parameters[key] + '&'
  }
  const response = await fetch(url, { param: JSON.stringify(parameters) })
  return await response.json()
}
//  axios写法
export function getJson(url) {
  console.log('--------------', url)
  return axios.get(url)
}
// export default getJson
