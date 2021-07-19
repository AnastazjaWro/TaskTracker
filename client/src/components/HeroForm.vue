<template>
  <form @submit='send' id='form'>
    <label for="name" >Type task name</label>
    <input type="text" name='name' v-model="name" class='forminput' required>
    <label for="date">Type task deadline</label>
    <input type="date" class="forminput" v-model="date" name="date"
       value="07-07-2021" required>
    <label for="description">Type task description</label>
    <input type="text" name='description' v-model="description" class='forminput'>
    <input type="submit" value="Submit" class='button'>
  </form>
</template>
<script>
export default {
  name: 'HeroForm',
  data() {
    return {
      name: '',
      date: '',
      description: '',
    };
  },
  methods: {
    send(e) {
      e.preventDefault();
      this.date = this.date.slice(0, 10);
      const newTask = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
        date: this.date,
        description: this.description,
        status: 'inProgress',
      };
      this.$emit('add-task', newTask);
      this.name = '';
      this.date = '';
      this.description = '';
    },
  },
};
</script>
<style lang="scss" scoped>
  form{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin:10px;

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
  .button {
  position: relative;
  width: 100px;
  height: 30px;
  border-radius: 30px;
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
</style>
