/**
 * 转换 extendscript 的 Array，
 * 使其可用 es6 中 array 的方法，
 * for...of...遍历等。
 * extendscript 自带的 Array 使用for...of...
 * 在build之后运行会得到一个异常，** 引用错误: Symbol 未定义. **
 *
 * @param arr Adobe 的数组，可遍历对象
 */
export function arr(arr: any[]) {
  let tmp = []
  for (let i = 0; i < arr.length; i++) {
    tmp.push(arr[i])
  }
  return tmp
}
