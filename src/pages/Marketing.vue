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
          :tab-number="tabNum"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Plugin from "../components/Plugin.vue";
import { Mix } from "@/mixins/mixins";

@Component({
  components: {
    Plugin,
  },
})
export default class Marketing extends Mix {}
</script>

<style>
</style>
