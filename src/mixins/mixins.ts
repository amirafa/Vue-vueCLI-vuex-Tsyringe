import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Myjson, Tabdata, Plugin, Tab } from "@/interface/interface";

// You can declare mixins as the same style as components.

@Component
export class Mix extends Vue {
  @Prop() isToggled!: string;

  tabData!: Myjson;
  tabNum = 0;
  allPlugins!: Plugin;
  allPluginsArr!: Array<Plugin>;
  tabPlugins!: Array<string>;
  pluginStatus!: {
    active: Array<string>;
    disabled: Array<string>;
    inactive: Array<string>;
  };
  loading = true;
  title = "";
  activeArr: Array<string> = [];
  disabledArr: Array<string> = [];
  inactiveArr: Array<string> = [];
  tabPluginsArr: Array<Plugin> = [];
  tabNames: Array<string> = [];
  tabsProps!: Array<[string, Tab]>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      tabNum: undefined,
      loading: true,
      tabData: undefined,
      pluginsActivate: undefined,
      pluginsDisabled: undefined,
      pluginsInactive: undefined,
      allPlugins: undefined,
      allPluginsArr: [] as Array<string>,
      tabPlugins: undefined,
      tabPluginsArr: [] as Array<string>,
      title: "" as string,
      pluginStatus: {
        active: [] as Array<string>,
        disabled: [] as Array<string>,
        inactive: [] as Array<string>,
      },
      activeArr: [] as Array<string>,
      disabledArr: [] as Array<string>,
      inactiveArr: [] as Array<string>,
      tabNames: ["marketing", "finance", "personnel"] as Array<string>,
      tabsProps: [] as Array<[string, Tab]>,
    };
  }

  created(): void {
    console.log("tab created");
  }

  mounted(): void {
    console.log("tab mounted");
    this.tabData = this.$store.getters.getData;
    this.setTabNum();
    this.setData();
  }

  // @Watch("loading")
  // onLoadingChanged(newValue: boolean) {
  //   //console.log("changed",newValue);
  // }

  setTabNum(): void {
    const tabdata: Tabdata = JSON.parse(
      JSON.stringify(this.$store.getters.getTabData)
    );
    console.log("tabData ", this.tabData);
    //this.tabsProps = Object.entries(tabdata).map((e) => ({[e[0]]:e[1]}));
    this.tabsProps = Object.entries(tabdata).map(function (e: [string, Tab]) {
      //console.log(e);
      return e;
    });
    console.log("tabsProps ", this.tabsProps);

    this.tabsProps.forEach((e: [string, Tab], i: number) => {
      if (this.$route.name == "home") this.tabNum = 0;
      else if (this.$route.name == e[1].title.toLowerCase()) this.tabNum = i;
    });
  }

  setData(): void {
    //this.allPlugins = this.tabData.data.plugins;
    this.allPlugins = this.$store.getters.getPlugins;
    this.allPluginsArr = Object.values(this.allPlugins);
    this.setTitle(this.tabNum);
    //---
    this.getStatus();
    //---
    this.tabPlugins = this.pluginStatus.active
      .concat(this.pluginStatus.disabled)
      .concat(this.pluginStatus.inactive);
    //
    this.getTabPlugins();
    //
  }

  setTitle(params: number): void {
    this.title = this.tabsProps[params][1].title;
  }

  getStatus(): void {
    this.getStatusArr(this.tabNum);
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

  getStatusArr(params: number): void {
    const tabname = this.tabsProps[params][0];
    //ignor error
    this.activeArr = this.tabData.data.tabdata[tabname].active;
    this.disabledArr = this.tabData.data.tabdata[tabname].disabled;
    this.inactiveArr = this.tabData.data.tabdata[tabname].inactive;
  }

  getTabPlugins(): void {
    //console.log(this.allPluginsArr);
    this.allPluginsArr.forEach((a: Plugin) => {
      this.tabPlugins.forEach((b: string) => {
        const noSpace = a.title.replace(/\s/g, "");
        const lowCase = noSpace.toLowerCase();
        if (b == lowCase) {
          this.tabPluginsArr.push(a);
        }
      });
    });
    //console.log(tabPluginsArr.value);
  }
}
