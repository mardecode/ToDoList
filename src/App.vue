<template>
  <div>
    <div id="header">
      <Search v-on:query-change="querySearch"/>
    </div>
    <div id="main-container">
      <h2>To-dos</h2>
      <TodoAdd  v-on:add-todo="addTodo"/>
      <Todos v-bind:todoslist="copyTodos" v-on:delete-todo="deleteTodo"/>
    </div>
  </div>
</template>

<script>

import Search from './components/Search'
import Todos from './components/Todos'
import TodoAdd from './components/TodoAdd'

export default {
  name: 'App',
  components: {
    Todos,TodoAdd,Search
  },
  methods:{
    deleteTodo(id){
      this.todos = this.todos.filter(todo=> todo.id != id);
      this.copyTodos = [... this.todos]
    },
    addTodo(todo){
      this.todos.push(todo)
      this.copyTodos = [... this.todos]
    },
    querySearch(query){
      if(query.trim()==''){
        this.copyTodos = [... this.todos]
      }else{
        const temp = this.todos.filter(todo=>{
          return todo.title.includes(query)
        })
        this.copyTodos = [... temp]
      }
    }

  },
  data(){
    return {
      todos:[
        {
          id:0,
          title: 'Despertar temprano',
          completed:false
        },
        {
          id:1,
          title: 'Programar',
          completed:true
        },
        {
          id:2,
          title: 'Terminar tutorial',
          completed:true
        },
        {
          id:3,
          title: 'Dormir temprano',
          completed:false
        }
      ],
      copyTodos:[]
    }
  },
  created(){
    this.copyTodos = [... this.todos];
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}

#main-container{
  border: solid 1px #cccccc;
  width: 600px;
  margin: 100px auto;
}
#header{
  background-color: black;
  padding: 10px;
}
h2{
  padding:  0 10px;
}
</style>
