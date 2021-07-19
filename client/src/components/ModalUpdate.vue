<template>
  <div class='window'>
    <div class="close" @click="$emit('closeModalUpdate')"/>
    <form @submit='update' class='form'>
      <label for="name" >Type task name</label>
      <input type="text" name='name' v-model="name" class='forminput' >
      <label for="date">Type task deadline</label>
      <input type="date" class="forminput" v-model="date" name="date"
        value="07-07-2021" >
      <label for="description">Type task description</label>
      <input type="text" name='description' v-model="description" class='forminput'>
      <label for="task-status">Choose a task status:</label>
        <select v-model="status" class='forminput' name="task-status">
          <option value="inProgress">inProgress</option>
          <option value="done" >done</option>
          <option value="lost" >lost</option>
        </select>
      <input type="submit" value="Submit" class='button'>
    </form>
  </div>
</template>
<script>
export default {
  name: 'ModalUpdate',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      date: '',
      description: '',
      status: `${this.task.status}`,
      beforeStatus: `${this.task.status}`,
    };
  },
  methods: {
    update(e) {
      e.preventDefault();
      this.date = this.date.slice(0, 10);
      this.beforeStatus = this.task.status;
      if (this.name === '') {
        this.name = this.task.name;
      }
      if (this.date === '') {
        this.date = this.task.date;
      }
      if (this.description === '') {
        this.description = this.task.description;
      }
      if (this.status === '' || (this.status !== 'inProgress' && this.status !== 'done' && this.status !== 'lost')) {
        this.status = this.task.status;
      }
      const updateTask = {
        id: this.task.id,
        name: this.name,
        date: this.date,
        description: this.description,
        status: this.status,
        beforeStatus: this.beforeStatus,
      };
      this.$emit('update', updateTask);
      this.name = '';
      this.date = '';
      this.description = '';
    },
  },
};
</script>
<style lang="scss" scoped>
  .window{
    display: block;
    position: fixed;
    width: 30vw;
    height: 35vh;
    left:0;
    right:0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 5;
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
  .form{
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 6;
    left:0;
    right:0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 20px;
    padding: 30px;
    justify-content: center;
    width: 90%;
    .forminput {
        background: transparent;
        border: 0;
        border-bottom: 1px solid black;
        padding-top: 2px;

        &:hover{
         box-shadow: 0 10px 20px -8px rgba(#1e3d4a,.2);
        }
      }
  }
  #task-status:active {
        background: transparent;
        border: 0;
        border-bottom: 1px solid black;
        padding-top: 2px;

        &:hover{
         box-shadow: 0 10px 20px -8px rgba(#1e3d4a,.2);
        }
  }
  .close{
    position: absolute;
    width: 30px;
    height: 30px;
    padding: 30px;
    right: 0;
    top: 0;
    cursor: pointer;
    z-index: 7;

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
  .button {
  position: relative;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  margin: 2px;
  border: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 14px rgba(10, 10, 10, 0.7);

  &:active {
    transform: scale(1.1);
  }
  &:hover{
    background: rgba(230, 230, 230, 0.6);
  }
}
</style>
