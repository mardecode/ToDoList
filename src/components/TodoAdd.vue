<template>
    <div class="add-container">
        <form action="" @submit="addTodo">
            <input type="text" v-model="title" placeholder="Agregar nuevo To-Do">
            <hr>
        </form>
    </div>
</template>

<script>
import{uuid} from 'vue-uuid';
export default {
    name:'TodoAdd',
    data(){
        return {
            title:''
        }
    },
    methods:{
        addTodo(e){
            e.preventDefault();
            const newTodo = {
                id: uuid.v4(),
                title: this.title,
                completed: false

            }
            this.title = ''
            this.$emit('add-todo',newTodo)
        }
    }
}
</script>

<style scoped>
    
    .add-container input{
        padding: 10px;
        outline: none;
        border: solid 1px #cccccc;
        
         box-sizing: border-box;
         width: 100%;
         border-radius: 23px;
        height: 51px;
        font-family: 'Comfortaa', cursive;
        font-size: 20px;
        border: 0px solid #ffffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin-bottom:20px;
    }
    .add-container hr{
        border: 0.5px solid #49D7AF;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 650px){
        .add-container input{
            font-size: 14px;
            height: 40px;
        }
    }
</style>>

