<template>
  <div id="app">
    <FliptProvider entity-id="entity-1" flag-key="test-flag-2">
      <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <Flipt>
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
        </Flipt>
        <Flipt>
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
        </Flipt>
      </div>
    </FliptProvider>
  </div>
</template>

<script>
import Flipt from "@/components/Flipt";
import FliptProvider from "@/components/FliptProvider";

export default {
  name: "App",
  components: {
    Flipt,
    FliptProvider,
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
