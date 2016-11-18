<!--首页-->
<template>
  <div v-show="!loading">
    <div class="weui_cells weui_cells_form weui_cells_checkbox weui_cells_access">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" id="todo" type="text" @keydown.enter="insertTodo()" v-model="newTodo" placeholder="What needs to be done ?">
        </div>
      </div>
      <template v-for="todo in todoList">
        <a href="#/detail/{{todo.id}}" class="weui_cell weui_check_label item" :class="{'completed': todo.status}">
          <label class="weui_cell_hd" for="{{todo.id}}">
            <input type="checkbox" v-model="todo.status" class="weui_check" data-id="{{todo.id}}" id="{{todo.id}}" >
            <i class="weui_icon_checked"></i>
          </label>
          <div class="weui_cell_bd weui_cell_primary">
            <p v-if="todo.status"><s>{{todo.title.substring(0, 10)}}</s></p>
            <p v-if="!todo.status">{{todo.title.substring(0, 10)}}</p>
          </div>
          <div class="weui_cell_ft remark">
            {{todo.remark.substring(0, 10)}}
          </div>
        </a>
      </template>
    </div>
    <div class="weui_btn_area">
      <button @click="removeAll()" class="weui_btn weui_btn_warn">清空</button>
    </div>
  </div>
  <toast v-show="loading" type="loading">加载中</toast>
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

  .item {
    color: #222;
  }

  .completed {
    color: #999 !important;
  }

  .remark {
    font-size: inherit !important;
  }
</style>

<script>
  import Vue from 'vue'
  import Toast from  '../components/Toast.vue'
  import store from '../utils/store'
  import utils from '../utils/utils'

  export default {
    components: {
      Toast
    },
    data: function() {
      return {
        newTodo: '',
        todoList: [],
        loading: true
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      insertTodo: function (e) {
        console.log(333, this.newTodo.trim());
        console.log(store)
        if(this.newTodo.trim()){
          this.todoList.push({
            id: new Date().getTime().toString(),
            title: this.newTodo.trim(),
            status: false,
            finishTime: Vue.filter('getLocalISOString')(new Date()),
            remark: ''
          });

          this.newTodo = '';
        }
      },
      removeAll: function () {
        store.remove().then((data)=>{
          this.todoList = data;
        });
      }
    },
    created: function () {

      store.query().then((data)=>{
        this.loading = false;
        this.todoList = data;
        console.log('todoList', utils.parse(this.todoList));

        /*这里需要在初始化以后才进行监听*/
        this.$watch('todoList', function (nVal, oVal) {
          console.log('todoList', utils.parse(nVal), oVal);
          store.save(nVal);
        }, {deep: true});

      });

    },
    route: {
      data: function() {
        console.log('router start')
      }
    }

  };


</script>
