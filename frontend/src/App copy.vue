<template>
  <div class="container">
    <div class="map">
      <GoogleMap />
    </div>
    <div class="side">
      <SideBar />
    </div>
  </div>
</template>


<script setup>

import GoogleMap from './components/GoogleMap.vue';
import SideBar from './components/SideBar.vue';

</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 1px solid #CCC;
}

#app {
  font-family: Vanir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
}

.container {
  display: flex;
}

.map {
  width: 75%;
  height: 100vh;
}

.side {
  width: 25%;
  height: 100vh;
}
</style>
