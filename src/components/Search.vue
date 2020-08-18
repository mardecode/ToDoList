<template>
    <div id="search-container">
        <input type="text" v-model="query" v-on:input="$emit('query-change',query)" placeholder="Buscar">
    </div>
</template>

<script>
export default {
    name:'Seacrh',
    data(){
        return{
            query:''
        }
    }
}
</script>

<style scoped>
    #search-container{
     /* width: 600px; */
     width: 40%;
     margin: 0 auto;   
    }
    input{
        padding:10px;
        width: 100%;
        outline: none;
        border: 1px solid #F4686C;
        box-sizing: border-box;
        border-radius: 23px;
        height: 51px;
        font-family: 'Comfortaa', cursive;
        font-size: 20px;

    }
    @media screen and (max-width: 900px){
            #search-container{
                width: 70%;
            }

    }
    @media screen and (max-width: 650px){
            #search-container{
                width: 90%;
            }
            input{
                font-size: 14px;
                height: 40px;
            }

    }
</style>
