<template>
  <div id="app">
    <div class="foldersListPage">
      <div class="foldersList">
        <div
          class="folderJa"
          v-for="(folder, index) in folders" 
          :key="index"
          @click="activeFolderId = folder.folderId"
        >
          <div class="circle2" :class="folder.folderColor"></div>
          <div>{{ folder.folderName }}</div>
        </div>
      </div>
      <div class="addFolder" v-if="isMenuVisible === false" @click="isMenuVisible = true">
        <button class="plus" >+</button>
        <div class="pages">
          Добавить папку
        </div>
      </div>
      <div class="addFolder" v-else @click="isMenuVisible = false">
        <button class="plus" >+</button>
        <div class="pages">
          Добавить папку
        </div>
      </div>
      <div class="pagesdob" v-if="isMenuVisible === true" >
        <input v-model="activeFolderName" style="font-size: 25px" placeholder="Введите название папки"/>
        <div class="colors">
          <div
            v-for="(color, index) in colors" 
            :key="index"
            :class="[{active: color === activeColor}, 'circle', color]"
            @click="activeColor = color"></div>
        </div>
        
         <button style="font-size: 20px" @click="addFolder">Добавить</button>
      </div>

    </div>
    <div  class="taskListPage">
      <div v-for="(folder, index) in tasks" :key="index">
        <div>{{folder.folderName}}</div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
    name:'App',
    data(){
        return {
        folders: [
          {
            folderName: 'testFolder',
            folderColor: 'aquamarine',
            folderId: '1',
            folderTasks: [
              {
                isDone: false,
                text: 'task №1'
              },
              {
                isDone: true,
                text: 'task №2'
              }
            ]
          }
        ],
        isMenuVisible: false,
        colors: ['red', 'blue', 'green', 'gray', 'pink', 'black', 'purple', 'aquamarine'],
        activeColor: 'red',
        activeFolderName: '', 
        isTaskVisible: false,
        activeFolderId: '-1',
        }
    },
    methods:{
      addFolder() {
        const folder = {
          folderName: this.activeFolderName,
          folderColor: this.activeColor,
          folderId: new Date().getTime(),
          folderTasks:[],
          
        }
        console.log(folder);
        this.folders.push(folder)
        this.isMenuVisible = false
        this.activeColor ='red'
        
      },
      addColor(){

      },
      tasks(){
        let index = this.folders.findIndex(x => x.id === this.activeFolderId)
        return [this.folders[index]]
      }
    }

}

</script>

<style>
#app {
  width: 100%;
  height: 1000vh;
}
body{
  position: relative;
  width: 100%;
  height: 100%;

  background:  #FFFFFF;
  margin: 0;
  padding: 0;
}

.foldersListPage{
  display: flex; 
  flex-direction: column;
  width: 30%;
  height: 100%  ;
  border-right: 3px solid #F1F1F1;
  background-color:  #F4F6F8;
}
.addFolder{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.plus{
  color: #868686;
  font-size: 30px;
  height: 35px;
  width: 30px;
  border: none;
  background-color: #F4F6F8;
}
.pages{
  width: 107px;
  height: 17px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.15px;

  color: #767676;
}
.circle{
  margin: 0 5px 0 5px;
  border-radius:50% ;
  width: 30px;
  height: 30px;
}
.circle2{
  margin: 0 5px 0 5px;
  border-radius:50% ;
  width: 15px;
  height: 15px;
}

.active{
  margin: 0 5px 0 5px;
  border-radius:50% ;
  width: 35px;
  height: 35px;
}

.red{
  background-color: red;
}
.blue{
  background-color: blue;
}
.green{
  background-color: green;
}
.gray{
  background-color: gray;
}
.pink{
  background-color: rgb(255, 103, 128);
}
.black{
  background-color: black;
}
.purple{
  background-color: purple;
}
.aquamarine{
  background-color: aquamarine;
}
.colors{
  display: flex;
  align-items:center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pagesdob{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 450px;
  height: 150px;
  background-color: rgb(201, 201, 201);
  border-radius:10px ;
  margin-left: 50px;
  border: 1px solid gray;
}
.foldersList{
  display: flex;
  flex-direction: column;
  margin: 20px 0 50px 30px;
 
  width: 100%;
}
.folderJa:hover{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 80%;
  height: 50px;
  background-color: #ffffff;
  border-radius:20px ;
  font-size: 25px;
}
.folderJa{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 80%;
  height: 50px;
  font-size: 25px;
}
.taskListPage{
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
