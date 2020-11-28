<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <FliptEvaluate entity-id="entity-1" flag-key="test-flag-2">
      <template #default="{ error, loading, match, value }">
        <div>
          <ul>
            <li>Error: {{ error }}</li>
            <li>Loading: {{ loading }}</li>
            <li>Match: {{ match }}</li>
            <li>Value: {{ value }}</li>
          </ul>
          <h3 v-if="!loading && !error">Loaded!</h3>
        </div>
      </template>
    </FliptEvaluate>
    <FliptEvaluate entity-id="entity-1" flag-key="test-flag-2">
      <template #default="{ error, loading, match, value }">
        <div>
          <ul>
            <li>2Error: {{ error }}</li>
            <li>2Loading: {{ loading }}</li>
            <li>2Match: {{ match }}</li>
            <li>2Value: {{ value }}</li>
          </ul>
          <h3 v-if="!loading && !error">2Loaded!</h3>
        </div>
      </template>
    </FliptEvaluate>
  </div>
</template>

<script>
import FliptEvaluate from "@/components/FliptEvaluate";

export default {
  name: "App",
  components: { FliptEvaluate },
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
