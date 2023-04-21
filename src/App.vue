<template>
  <div id="app">
    <div style="display: flex;">
      
        <button @click="folderList" class="plus">+</button>
        <div class="pages">
          Добавить папку
        </div>
      
        
        <div v-if="folderList === 0"
        >
        добавленых постов нет
        </div>
      <div class="pages">
        Добавить папку
      </div>

    </div>  
  </div>


   

</template>
<script>


export default {
    name:'App',
    data(){
        return{
        folder:{
        folderName:'',
        folderColor:'',
        folderTasks:[],
            },
        }
    },
    methods:{
      folderList(){
         this.$emit
      },
    }

}

</script>

<style>
#app {
  background-color:  #F4F6F8;;
  text-align: center;
  width: 200px;;
  height: 1000vh;
  border-right: 3px solid #F1F1F1;
}
body{
  position: relative;
width: 746px;
height: 529px;

background:  #FFFFFF;
  margin: 0%;
  padding: 0%;
}

.line{
  position: absolute;
width: 1px;
height: 700px;
left: 200px;
top: 0px;


background: #F1F1F1;
transform: matrix(-1, 0, 0, 1, 0, 0);
}
.plus{
color: #868686;
font-size: 30px;
position: absolute;
height: 35px;
width: 30px;
left: 32px;
top: 333px;
border: none;
background-color: #F4F6F8;
cursor: pointer;
}
.pages{
  position: absolute;
width: 107px;
height: 17px;
left: 52px;
top: 323px;
margin-top: 20px;
margin-left: 10px;


font-family: 'Lato';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */

letter-spacing: 0.15px;

color: #767676;

}

</style>
