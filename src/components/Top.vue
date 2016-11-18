<template>
  <div class="header">
    <h1 class="title">{{text}}</h1>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .title {
    margin: 30px 0;
    font-weight: 400;
    font-size: 34px;
    color: #3cc51f;
    text-align: center;
  }
</style>

<script>
export default {
  props: {
    /**
     * 标题内容
     * */
    text: {
//      type: String,
      required: true,
      twoWay: true  /*这里显示声明需要双向绑定，外部传入时需要加上.sync*/
    }
  }
}

</script>


