<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <FliptMatch entity-id="entity-1" flag-key="test-flag">
      <template slot="loading"> <div>loading</div></template>
      <div>ciccio</div>
    </FliptMatch>
    <FliptMatch entity-id="entity-1" flag-key="test-flag">
      <template slot="loading"> <div>loading2</div></template>
      <div>ciccio2</div>
    </FliptMatch>
  </div>
</template>

<script>
import FliptMatch from "@/components/FliptMatch";

export default {
  name: "App",
  components: {
    FliptMatch,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
