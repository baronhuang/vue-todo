<!--详情-->
<template>
  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label for="title" class="weui_label label">标题</label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input type="text" class="weui_input" id="title" v-model="todo.title">
      </div>
      <div class="weui_cell_ft"></div>
    </div>

    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label for="finish-time" class="weui_label label">完成时间</label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input type="datetime-local" class="weui_input" id="finish-time" v-model="todo.finishTime">
      </div>
      <div class="weui_cell_ft"></div>
    </div>

    <div class="weui_cell weui_cell_switch">
      <div class="weui_cell_bd weui_cell_primary">
        <p>是否完成</p>
      </div>
      <div class="weui_cell_ft">
        <input class="weui_switch" type="checkbox" id="status" v-model="todo.status">
      </div>
    </div>
  </div>

  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
        <textarea class="weui_textarea" id="remark" placeholder="请输入备注说明" rows="3" v-model="todo.remark"></textarea>
      </div>
    </div>
  </div>
  <div class="weui_btn_area">
    <a class="weui_btn weui_btn_primary" @click="update()" href="javascript:" id="back">确认</a>
    <a class="weui_btn weui_btn_warn" @click="remove()" href="javascript:" id="delete">删除</a>
  </div>

  <toast v-show="loading" type="loading">保存中</toast>
  <dialog v-show="dialogControl" type="confirm" title="确认"
          @dialog-confirm="yesToRemove(true)"
          @dialog-cancel="yesToRemove(false)">
    <p>确定要删除该任务？</p>
  </dialog>

</template>

<style lang="less" rel="stylesheet/less" scoped>
  .label {
    width: 4em;
    margin-right: 1em;
  }
</style>

<script>
  import Vue from 'vue'
  import store from '../utils/store'
  import utils from '../utils/utils'
  import Toast from  '../components/Toast.vue'
  import Dialog from  '../components/Dialog.vue'

  export default {
    components: {
      Toast,
      Dialog
    },
    data: function() {
      return {
        loading: false,
        dialogControl: false,
        todo: {},
      }
    },
    created: async function  () {
      let id = this.$route.params.id;
      console.log(this.$route.params.id);
      let data = await store.query(id);
      this.todo = data;
    },
    methods: {
      update: function (e) {
        this.loading = true;
        store.update(this.todo).then((data) => {
          this.loading = false;
        });
      },
      remove: function (e) {
        this.dialogControl = true;
      },
      /*确定要删除了*/
      yesToRemove: function (type) {
        if(type){
          store.remove(this.todo.id).then((data)=>{
            /*手动路由*/
            this.$router.go('/');
            this.dialogControl = false;
          });
        }else{
          this.dialogControl = false;
        }

      },
    }
  }
</script>
