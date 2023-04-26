<template>
  <div id="app">
    <div style="display: flex;">
      
        <button class="plus" @click="isMenuVisible = true">+</button>
        <div class="pages">
          Добавить папку
        </div>

        
      
      <div class="pages">
        Добавить папку
      </div>
      <div class="pagesdob" v-if="isMenuVisible === true" >
        <input v-model="folder.folderName" placeholder="Введите название папки"/>
        <div class="color">
          <button class="red" @click="addColor"></button>
          <button class="blue" @click="addColor"></button>
          <button class="green" @click="addColor"></button>
          <button class="gray" @click="addColor"></button>
          <button class="pink" @click="addColor"></button>
          <button class="black" @click="addColor"></button>
          <button class="purple" @click="addColor"></button>
          <button class="aquamarine" @click="addColor"></button>

        </div>
         <button @click="addFolder">Добавить</button>
      </div>

      <div 
        v-for="(folder, index) in folders" 
        :key="index"
      >
        {{ folder.folderName }}
      </div>
      <div 
        v-for="(folder, index) in colors" 
        :key="index"
      >
        {{ folder.folderColor }}
      </div>  
      

    </div>  
  </div>


   

</template>
<script>


export default {
    name:'App',
    data(){
        return {
        folder:{
          folderName:'',
          folderColor:'',
          folderTasks:[],
            },
            folders: [],
            isMenuVisible: false,
            colors: [],
        }
    },
    methods:{
      addFolder() {
         this.colors.push({
          ...this.folder,
         })
      },
      addColor(){
         this.colors.push({
          ...this.folder,
         })
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
.red{
  background-color: red;
  margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
  width: 30px;
  height: 30px;
}
.blue{
  background-color: blue;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.green{
  background-color: green;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.gray{
  background-color: gray;
       margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.pink{
  background-color: pink;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.black{
  background-color: black;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.purple{
  background-color: purple;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.aquamarine{
  background-color: aquamarine;
      margin-left: 5px;
  margin-right: 5px;
  border-radius:50% ;
    width: 30px;
  height: 30px;
}
.color{

  display: flex;
  align-items:center
 

}
.pagesdob{
  width: 450px;
  height: 150px;
  background-color: rgb(201, 201, 201);
  position: absolute;
  border-radius:10px ;
  margin-top: 370px;
  margin-left: 50px;
  border: 1px solid gray;
}
</style>
