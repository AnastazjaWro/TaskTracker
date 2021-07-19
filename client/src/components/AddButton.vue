<template>
    <button @click='AddTask'>Show Form</button>
</template>
<script>
export default {
  name: 'AddButton.vue',
  methods: {
    AddTask() {
      this.$emit('click-button');
    },
  },
};
</script>
<style lang="scss" scoped>
button {
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
