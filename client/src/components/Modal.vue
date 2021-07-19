<template>
    <div class='heroModal'>
      <div class='wrapper'>
        <h3>{{task.name}}</h3><br>
        <p style='text-align: left'>Task Deadline:  {{task.date.slice(0, 10)}}</p>
        <p>Status: {{task.status}}</p>
        <p>{{task.description}}</p>
        <div class='optionlist'>
          <div class="close" @click="$emit('closeModal')"/>
          <div class="option" @click="openUpdate">Option</div>
          <div class="option" @click="$emit('delete-task', task)">Delete Task</div>
        </div>
        <ModalUpdate
        v-if="updateOpen"
        :task='task'
        @update="updateMe"
        @closeModalUpdate="updateOpen = false"
        />
      </div>
    </div>
</template>
<script>
import ModalUpdate from '@/components/ModalUpdate.vue';

export default {
  components: { ModalUpdate },
  name: 'Modal',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updateOpen: false,
    };
  },
  methods: {
    updateMe(task) {
      this.ModalUpdate = false;
      this.$emit('update-task', task);
    },
    openUpdate() {
      this.updateOpen = true;
    },
  },
};
</script>
<style lang="scss" scoped>
  .heroModal {
    display: flex;
    position: fixed;
    width: 50vw;
    height: 40vh;
    left:0;
    right:0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 4;
    font-size: 1.1rem;
  }
  .wrapper {
    display: block;
    position: relative;
    padding: 30px;
    margin-right: 20px;
    width: 100%;
    height: 100%;
    justify-content: center;
    text-align: center;
    border-radius: 20px;
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

  .close{
    position: relative;
    width: 30px;
    height: 30px;
    padding: 30px;
    right: 0;
    top: 0;
    cursor: pointer;

    &::before,
    &::after{
      position: absolute;
      top: 30px;
      right: 20px;
      content: '';
      width: 20px;
      height: 2px;
      background: black;
      display: block;
    }

    &::before{
      transform: rotate(45deg);
    }

    &::after{
      transform: rotate(-45deg);
    }
  }
    .optionlist{
      position: absolute;
      display: flex;
      flex-direction: column;
      top:10px;
      width: 80px;
      right: 10px;
    }
    .option{
      display: flex;
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 40px;
      justify-content: center;
      position: relative;
      border-radius: 30px;
      margin:2px;
      border: 0;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      box-shadow: 10px 10px 14px rgba(10, 10, 10, 0.7);

  &:hover {
    background: rgba(230, 230, 230, 0.6);
  }
  &:active {
    transform: scale(1.1);
  }
}
    p {
    position: relative;
      z-index: 3;
      width: 94%;
    }
    h3{
      width: 94%;
    }
</style>
