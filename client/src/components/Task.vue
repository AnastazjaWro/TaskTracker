<template>
    <div class='task'>
      <h3>{{task.name}}</h3>
      <p>{{task.date.slice(0, 10)}}</p>
    </div>
</template>
<script>
export default {
  name: 'task',
  props: {
    task: Object,
  },
};
</script>
<style lang="scss" scoped>
  .task{
      display: flex;
      flex-direction: column;
      position: relative;
      text-align: center;
      justify-content: center;
      min-width:100%;
      height:5%;
      background: rgba(63, 141, 151, 0.2);
      backdrop-filter: blur(30px);
      margin-bottom: 3px;
      border-radius: 15px;
  }
</style>
