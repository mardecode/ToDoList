<template>
    <div class="todo" >
        <div class="todo__check" >
            <input type="checkbox" v-bind:checked="todo.completed ? 'checked': '' " v-on:change="checkTodo" v-bind:id="todo.id">

                <label v-bind:for="todo.id">
                    <span class="material-icons " v-bind:class="{checkOculto: todo.completed}">check_box_outline_blank</span>
                    <span class="material-icons " v-bind:class="{checkOculto: !todo.completed}">check_box</span>
                </label>
          
        </div>
        <div class="todo__info" v-bind:class="{completed: todo.completed}">
            <p>{{todo.title}}</p>
            <button @click="$emit('delete-todo',todo.id)" >
                <span class="material-icons">delete</span>
            </button>

        </div>
    </div>
</template>


<script>
export default {
    name: 'TodoItem',
    props:['todo'],
    methods:{
        checkTodo(){
            this.todo.completed = ! this.todo.completed
        }
    }
}
</script>

<style  scoped>
.checkOculto{
    display: none;
}
    .todo{
        display: flex;
        font-family: 'Comfortaa', cursive;
        color: #282A2C;
    }
    .todo__info:not(.completed):hover{
        background-color: #eeeeee;
    }
    .completed{
        color: rgba(99, 99, 99, 0.79);
        text-decoration: line-through;
    }
    .todo__check{
        margin: auto;
    }
    .todo__check input{
        display: none;
    }
    .todo__check span{
        color: #49D7AF;
        align-self:center;
        padding-right: 10px;
        padding-bottom: 15px;
        font-size: 32px;
        /* background-color: red; */
    }
    .todo__check span:hover{
        color: #33cfa3;
        cursor: pointer;
    }
  .todo__info{
      display: grid;
      grid-template-columns: 80% 20%;
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 30px;
      padding: 10px;
      margin-bottom: 20px;
      font-size: 20px;
      align-items: center;
  }
  .todo__info button{
      justify-self: end;
      /* align-self: center; */
      width: 48px;
      height: 48px;
      border-radius: 24px;
      border: 0px solid #fff ;
      background-color: #F4686C;
  }
   .todo__info button:hover{
       background-color: #ff5154;
       cursor: pointer;
   }
  .todo__info  span{
      color: #ffffff;
  }
  .todo__info  p{
      margin: 0;
  }
    @media screen and (max-width: 650px){
        .todo__info{
            font-size: 14px;
        }
        .todo__info button{
            justify-self: end;
            /* align-self: center; */
            width: 28px;
            height: 28px;
            border-radius: 14px;
            border: 0px solid #fff ;
            background-color: #F4686C;
        }
        .todo__info  span{
            color: #ffffff;
            font-size: 14px;
        }
    }
    
  

</style>