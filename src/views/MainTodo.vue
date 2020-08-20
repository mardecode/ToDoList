<template>
  <div>
    <div id="header">
      <Search v-on:query-change="querySearch"/>
    </div>
    <div id="main-container">
      <h2 class="titulo">To-Do List</h2>
      <TodoAdd  v-on:add-todo="addTodo"/>
      <Todos v-bind:todoslist="copyTodos" v-on:delete-todo="deleteTodo"/>
    </div>
        <router-view/>

  </div>
</template>


<script>
import Search from '../components/Search'
// import Todos from '.components/Todos
import Todos from '../components/Todos'
import TodoAdd from '../components/TodoAdd'
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
body{
  font-family: 'Comfortaa', cursive;
  padding: 0;
  margin: 0;
}
#main-container{
  width: 40%;
  margin: 20px auto 100px auto;
}
#header{
  /* background-color: black; */
  padding-top: 60px;
}
h2{
  padding:  0 10px;
  font-family: 'Pacifico', cursive;
  text-align: center;
  font-size: 36px;
}
@media screen and (max-width: 900px){
  #main-container{
    width: 70%;
  }
}
@media screen and (max-width: 650px){
  h2{
    font-size: 26px;
  }
  #main-container{
    width: 90%;
  }
}
</style>