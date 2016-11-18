/**
 * Created by Administrator on 2016/9/27 0027.
 */

/*用于数据存档，模拟api*/
export default {
  TODOS: 'todos',
  /*获取列表或单个*/
  query(id){
    return new Promise((resolve, reject) => {
      let todos = localStorage.getItem(this.TODOS) || '[]';
      /*获取单个*/
      if(id){
        todos = JSON.parse(todos);
        for(let todo of todos ) {
          console.log(todo);
          if(todo.id == id){
            resolve(todo);
            break;
          }
        }

      /*列表*/
      }else{
        setTimeout(() => {
          resolve(JSON.parse(todos));
        }, 500);
      }
    });
  },
  /*插入单个*/
  insert(title){
    return new Promise((resolve, reject) => {
      let todos = localStorage.getItem(this.TODOS) || '[]';
      todos = JSON.parse(todos);
      todos.push({
        id: new Date().getTime(),
        title: title,
        status: 0,
        finishTime: new Date().getTime(),
        remark: ''
      });

      localStorage.setItem(this.TODOS, JSON.stringify(todos));
    });
  },
  /*保存列表*/
  save(list){
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(list);
      console.log(str)
      localStorage.setItem(this.TODOS, str);
      resolve(str);
    });
  },
  /*更新单个*/
  update(item){
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem(this.TODOS));
      for(var i=0;i<todos.length;i++){
        if(todos[i].id == item.id){
          todos.splice(i, 1, item);
          break;
        }
      }
      setTimeout(() => {
        localStorage.setItem(this.TODOS, JSON.stringify(todos));
        resolve(todos);
      }, 500);
    });
  },
  /*删除操作*/
  remove(id){
    return new Promise((resolve, reject) => {
      let todos = JSON.parse(localStorage.getItem(this.TODOS));
      if(id){
        for(var i=0;i<todos.length;i++){
          if(todos[i].id == id){
            todos.splice(i, 1);
            break;
          }
        }
      }else{
        todos = [];
      }

      setTimeout(() => {
        console.log(todos);
        localStorage.setItem(this.TODOS, JSON.stringify(todos));
        resolve(todos);
      }, 100);

    });

  }
};
