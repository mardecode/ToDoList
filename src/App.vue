<template>
<div>
    <h2>To-Do list</h2>
        <router-view/>

</div>
</template>

<script>
export default {
  name: 'App',
  }

  // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyCxcbT68W6SqLXXJRwAIwyDSYMtNSDk9cE",
  //   authDomain: "todolist365.firebaseapp.com",
  //   databaseURL: "https://todolist365.firebaseio.com",
  //   projectId: "todolist365",
  //   storageBucket: "todolist365.appspot.com",
  //   messagingSenderId: "193605315528",
  //   appId: "1:193605315528:web:e163960fee86313206eefd",
  //   measurementId: "G-KX24C5DMN3"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  
</script>

<style>
body{
  font-family: 'Comfortaa', cursive;
  padding: 0;
  margin:0;
}

</style>