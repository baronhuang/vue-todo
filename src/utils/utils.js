/**
 * Created by Administrator on 2016/9/27 0027.
 */


/*一般的工具方法*/
export default {
  parse: function (data) {
    return JSON.parse(JSON.stringify(data));
  }
}
