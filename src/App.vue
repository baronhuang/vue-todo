<!--头部-->
<template>
  <div id="app">
    <top :text.sync="text"></top>
    <router-view></router-view>
    <footer class="footer">
      <p>© baron制作</p>
    </footer>
  </div>
</template>

<script>
import Top from './components/Top.vue'

export default {
  components: {
    Top
  },

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      text: 'VUE-TODO'
    }
  }

}
</script>

<style lang="less" rel="stylesheet/less">
  @import "less/common";
  .footer {
    text-align: center;
    font-size: 14px;
    color: #999;
    margin-top: 12px;
  }

</style>
