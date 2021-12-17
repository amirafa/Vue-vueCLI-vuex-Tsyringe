<template>
    <div v-if="!loading" class="container">
    <div class="row d-flex justify-content-center align-items-center vh-100">
      <div
        class="spinner-grow"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
    </div>
  </div>

  <div v-else class="container">
    <div class="row">
      <header class="p-2 m-0">
        <h1>{{ title }}</h1>
      </header>
      <div
        class="d-inline-flex col-12 col-md-4"
        v-for="(plugin, index) in tabPluginsArr"
        :key="index"
      >
        <Plugin
          :plugin="plugin"
          :plugin-status="pluginStatus"
          :is-toggled="isToggled"
          :tab-data="tabData"
          :tab-number="tab"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'


export default class Marketing extends mixins {
  tab: number|undefined;
  
  data() {
    return {
        tab:1,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    console.log("Tab_Page mounted");
    this.checkRoute
  }

  checkRoute() {
      if (this.$route.name == "merkating") this.tab = 1;
      else if (this.$route.name == "finance") this.tab = 2;
      else if (this.$route.name == "personnel") this.tab = 3;
    }

}
</script>

<style>
</style>
