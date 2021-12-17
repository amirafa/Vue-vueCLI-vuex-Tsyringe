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
import { Component, Prop, Vue } from "vue-property-decorator";
import Plugin from "../components/Plugin.vue";
import { Global } from "../class/Service";

@Component({
  components: {
    Plugin,
  },
})
export default class Marketing extends Vue {
  @Prop() isToggled!: string;

  tabData: any;
  tabn: any;
  allPlugins: any;
  allPluginsArr: any;
  tabPlugins: any;
  pluginStatus: any;
  loading: any;
  global: any;
  title: any;
  activeArr: any;
  disabledArr: any;
  inactiveArr: any;
  tabDatae: any;
  tabPluginsArr: any;

  data() {
    return {
      tabn: 3,
      loading: false,
      tabData: "",
      pluginsActivate: undefined,
      pluginsDisabled: undefined,
      pluginsInactive: undefined,
      allPlugins: undefined,
      allPluginsArr: [],
      tabPlugins: undefined,
      tabPluginsArr: [],
      title: undefined,
      pluginStatus: {
        active: [],
        disabled: [],
        inactive: [],
      },
      activeArr: [],
      disabledArr: [],
      inactiveArr: [],
      global: new Global(),
    };
  }

  mounted() {
    console.log("tab mounted");
    this.getData()
      .then((response) => {
        this.tabData = response;
        this.setData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getData(this: any) {
    try {
      return await this.global.fetchData(this.global);
    } catch (err) {
      return err;
    }
  }

  setData() {
    this.allPlugins = this.tabData.data.plugins;
    this.allPluginsArr = Object.values(this.allPlugins);
    this.setTitle(this.tabn);
    this.getStatus();
    this.tabPlugins = this.pluginStatus.active
      .concat(this.pluginStatus.disabled)
      .concat(this.pluginStatus.inactive);
    //
    this.getTabPlugins();
    //
    this.loading = true;
  }

  setTitle(params: any) {
    if (params == 1) this.title = this.tabData.data.tabdata.tab1.title;
    else if (params == 2) this.title = this.tabData.data.tabdata.tab2.title;
    else if (params == 3) this.title = this.tabData.data.tabdata.tab3.title;
  }

  getStatus() {
    this.getStatusArr(this.tabn);
    //active--------------
    this.activeArr.forEach((element: string) => {
      this.pluginStatus.active.push(element);
    });
    //disabled
    this.disabledArr.forEach((element: string) => {
      this.pluginStatus.disabled.push(element);
    });
    //inactive
    this.inactiveArr.forEach((element: string) => {
      this.pluginStatus.inactive.push(element);
    });
  }

  getStatusArr(params: number) {
    if (params == 1) {
      this.activeArr = this.tabData.data.tabdata.tab1.active;
      console.log(this.activeArr);
      this.disabledArr = this.tabData.data.tabdata.tab1.disabled;
      this.inactiveArr = this.tabData.data.tabdata.tab1.inactive;
    } else if (params == 2) {
      this.activeArr = this.tabData.data.tabdata.tab2.active;
      this.disabledArr = this.tabData.data.tabdata.tab2.disabled;
      this.inactiveArr = this.tabData.data.tabdata.tab2.inactive;
    } else if (params == 3) {
      this.activeArr = this.tabData.data.tabdata.tab3.active;
      this.disabledArr = this.tabDatae.data.tabdata.tab3.disabled;
      this.inactiveArr = this.tabData.data.tabdata.tab3.inactive;
    }
    
  }


  getTabPlugins() {
    this.allPluginsArr.forEach((a: any) => {
      this.tabPlugins.forEach((b: any) => {
        let noSpace = a.title.replace(/\s/g, "");
        let lowCase = noSpace.toLowerCase();
        if (b == lowCase) {
          this.tabPluginsArr.push(a);
        }
      });
    });
    //console.log(tabPluginsArr.value);
  }
}
</script>

<style>
</style>
