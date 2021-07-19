<template>
  <div id="app">
    <div id='menu'>
      <ul>
        <li @click="changeCard(0)" class='menuButton'>
          <span class='menup'>
            Intro
          </span>
        </li>
        <li @click="changeCard(1)" class='menuButton'>
          <span class='menup'>
            In Progress
          </span>
        </li>
        <li @click="changeCard(2)" class='menuButton'>
          <span class='menup'>
            Done
          </span>
        </li>
        <li @click="changeCard(3)" class='menuButton'>
          <span class='menup'>
            Lost
          </span>
        </li>
      </ul>
    </div>
    <transition name='next'>
      <section v-if="step === 0">
        <div class='todo'>
          <h2>Task Tracker</h2>
          <h3>Author: Anastazja</h3>
          <h3>Photo by Flavio <a href='https://unsplash.com/@flaviewxvx?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target="_blank">Gasperini</a> on <a href='https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target="_blank">Unsplash</a></h3>
        </div>
      </section>
    </transition>
    <transition name='next'>
      <section v-if="step === 1">
        <div class='todo'>
          <headerHero
            @show-form="showTaskForm"
          />
          <transition name='fade'>
            <HeroForm v-if="showForm" @add-task='AddTask' class='heroform' />
          </transition>
          <h2>In Progress</h2>
          <div class='todolist'>
          <Task v-for="item in tasksInProgress"
            :task="item"
            :key="item.id"
            class='task'
            @click.native='openTask(item)'/>
          </div>
        </div>
        <Modal
          v-if='modalOpen'
          :task='modalTask'
          @update-task="updateTask"
          @delete-task='deleteTask'
          @closeModal="modalOpen = false"
        />
      </section>
    </transition>
    <transition name='next'>
      <section v-if="step === 2">
        <div class='todo'>
          <h2>Done</h2>
          <div class='todolistOther'>
          <Task v-for="item in tasksDone"
            :task="item"
            :key="item.id"
            class='task'
            @click.native='openTask(item)'/>
          </div>
        </div>
        <Modal
          v-if='modalOpen'
          :task='modalTask'
          @update-task="updateTask"
          @delete-task='deleteTask'
          @closeModal="modalOpen = false"
        />
      </section>
    </transition>
    <transition name='next'>
      <section v-if="step === 3">
        <div class='todo'>
          <h2>Lost</h2>
          <div class='todolistOther'>
          <Task v-for="item in tasksLosts"
            :task="item"
            :key="item.id"
            class='task'
            @click.native='openTask(item)'/>
          </div>
        </div>
        <Modal
          v-if='modalOpen'
          :task='modalTask'
          @update-task="updateTask"
          @delete-task='deleteTask'
          @closeModal="modalOpen = false"
        />
      </section>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import headerHero from '@/components/HeaderHero.vue';
import HeroForm from '@/components/HeroForm.vue';
import Task from '@/components/Task.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'App',
  components: {
    headerHero,
    HeroForm,
    Task,
    Modal,
  },
  data() {
    return {
      modalOpen: false,
      showForm: false,
      tasksDone: [],
      tasksInProgress: [],
      tasksLosts: [],
      step: 0,
      tasks: [],
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    changeCard(id) {
      if (this.showForm === true) {
        this.showForm = false;
      }
      if (this.modalOpen === false) {
        this.step = id;
      }
    },
    async updateTask(task) {
      this.modalOpen = false;
      await axios.put('http://localhost:8000/tasks/', task);
      if (task.beforeStatus === 'inProgress') {
        this.tasksInProgress = this.tasksInProgress.filter((deleted) => deleted.id !== task.id);
      } else if (task.beforeStatus === 'done') {
        this.tasksDone = this.tasksDone.filter((deleted) => deleted.id !== task.id);
      } else if (task.beforeStatus === 'lost') {
        this.tasksLosts = this.tasksLosts.filter((deleted) => deleted.id !== task.id);
      }
      if (task.status === 'inProgress') {
        this.tasksInProgress = [...this.tasksInProgress, task];
      } else if (task.status === 'done') {
        this.tasksDone = [...this.tasksDone, task];
      } else if (task.status === 'lost') {
        this.tasksLosts = [...this.tasksLosts, task];
      }
    },
    async deleteTask(task) {
      // eslint-disable-next-line
      if (window.confirm('Are you sure?')) {
        await axios.delete('http://localhost:8000/tasks/', { params: { id: task.id } });
        if (task.status === 'inProgress') {
          this.tasksInProgress = this.tasksInProgress.filter((taskp) => taskp.id !== task.id);
        } else if (task.status === 'done') {
          this.tasksDone = this.tasksDone.filter((taskp) => taskp.id !== task.id);
        } else {
          this.tasksLosts = this.tasksLosts.filter((taskp) => taskp.id !== task.id);
        }
        this.modalOpen = false;
      }
    },
    openTask(item) {
      this.modalOpen = true;
      this.modalTask = item;
    },
    showTaskForm() {
      this.showForm = !this.showForm;
    },
    async AddTask(task) {
      this.tasksInProgress = [...this.tasksInProgress, task];
      await axios.post('http://localhost:8000/tasks/', task);
    },
    async getTasksFromStatus(taskStatus) {
      await axios.get(`http://localhost:8000/tasks/${taskStatus}`)
        .then((response) => {
          if (response.data) {
            this.tasks = response.data;
          }
        });
    },
    async getTasks() {
      this.getTasksFromStatus('done')
        .then(
          (() => {
            if (this.tasks) {
              for (let x = 0; x !== this.tasks.length; x += 1) {
                this.tasksDone = [...this.tasksDone, this.tasks[x]];
              }
              this.tasks = [];
            }
          }),
        );
      this.getTasksFromStatus('InProgress')
        .then(
          (() => {
            if (this.tasks) {
              for (let x = 0; x !== this.tasks.length; x += 1) {
                this.tasksInProgress = [...this.tasksInProgress, this.tasks[x]];
              }
              this.tasks = [];
            }
          }),
        );
      this.getTasksFromStatus('lost')
        .then(
          (() => {
            if (this.tasks) {
              for (let x = 0; x !== this.tasks.length; x += 1) {
                this.tasksLosts = [...this.tasksLosts, this.tasks[x]];
              }
              this.tasks = [];
            }
          }),
        );
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
#app{
  width: 100vw;
  height: 100vh;
  background-image: url('./assets/bgHero.jpg');
  background-size: cover;
  background-attachment: fixed;
}
#menu{
  position: absolute;
  display: flex;
  top: 30px;
  left: 20px;
  flex-direction: row ;
  width: 200px;
  z-index: 3;
  color: white;
  &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      bottom: -20px;
      right: -20px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      box-shadow: 10px 10px 14px rgba(10, 10, 10, 0.7);
      border-radius: 40px;
    }
}
.menuButton{
  width: 200px;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 50px;
  border: 0;
  margin:2px;
  background: rgba(156, 235, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 14px rgba(10, 10, 10, 0.7);

  &:hover {
    background: rgba(156, 235, 255, 0.6);
  }
  &:active {
    transform: scale(1.1);
  }
}
.menup{
  display: flex;
  position: relative;
  top: 15px;
}
section{
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 30px;
}
.todo{
  display: block;
  position: relative;
  width: 50vw;
  max-height: 70%;
  color: #000;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    bottom: -20px;
    right: -20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 10px 10px 14px rgba(10, 10, 10, 0.7);
    border-radius: 40px;
  }
}
.todolist,
.todolistOther{
  width: 90%;
  background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
  z-index: 4;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: scroll;
}
.todolist{
  max-height: 55%;
}
.todolistOther{
  max-height: 90%;
}
.task{
  display: flex;
  position: relative;
  cursor: pointer;
  height: 100px;
}
.fade-enter-active {
  transition: opacity .6s ease;
}
.fade-leave-active {
  transition: opacity .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.next-enter-active {
  transition: opacity .6s ease, transform .6s ease;
}
.next-leave-active {
  transition: opacity .6s cubic-bezier(1.0, 0.5, 0.8, 1.0), transform .6s ease;
}
.next-enter, .next-leave-to{
  opacity: 0;
  transform: translateY(0px);
}
.next-enter{
  transform: translateY(-200px);
}
.next-leave-to{
  transform: translateY(200px);
}
h2,h3 {
  display: flex;
  position: relative;

  a:focus, a:hover, a:visited{
    color: rgb(0, 174, 255);
  }
  a:active {
    color: silver;
  }
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius:10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(153, 153, 153);
  border: 2px solid #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
