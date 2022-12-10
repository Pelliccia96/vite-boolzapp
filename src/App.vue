<template>
  <div class="bg-banner"></div>
    <TheMain></TheMain>
</template>

<script>
import TheMain from './components/TheMain.vue';

export default {
  components: { TheMain }
}
</script>

<style lang="scss">
@use "@fortawesome/fontawesome-free/css/all.min.css";
@use "./styles/general.scss";
</style>
