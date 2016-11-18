/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的filter都放在这里
 * 在js里面可以这样直接调用：Vue.filter('getLocalISOString')(new Date())
 * */
import Vue from 'vue'

/*将时间转换成本地时间*/
Vue.filter('getLocalISOString', function (value) {
  const now = new Date(value);

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  return now.getFullYear() + '-'
    + pad(now.getMonth() + 1) + '-'
    + pad(now.getDate()) + 'T'
    + pad(now.getHours()) + ':'
    + pad(now.getMinutes()) + ':'
    + pad(now.getSeconds());
});
