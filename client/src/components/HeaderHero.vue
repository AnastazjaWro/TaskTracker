<template>
  <div class='headerHero'>
    <h2>Task Tracker</h2>
    <AddButton @click-button='$emit("show-form")' />
  </div>
</template>

<script>
import AddButton from './AddButton.vue';

export default {
  name: 'headerHero',
  components: {
    AddButton,
  },
};
</script>
<style lang="scss" scoped>
.headerHero {
  display: flex;
  justify-content:  space-between;
  position: relative;
  margin: 0 0 20px;
  padding: 0;
  z-index: 2;
}
h2 {
    font-size: 30px;
    text-transform: uppercase;
}
</style>
