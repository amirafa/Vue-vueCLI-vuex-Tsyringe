import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Service } from "../class/Service";

// You can declare mixins as the same style as components.
@Component
export class Tab extends Vue {
  @Prop() isToggled!: string;

  tabData: any;
  tabNum: any;
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
  tabNames: any;
  tabsProps: any;

  data() {
    return {
      tabNum: 1,
      loading: true,
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
      global: new Service(),
      tabNames: ["marketing", "finance", "personnel"],
      tabsProps: [],
    };
  }

  created() {
    console.log("tab created");
  }

  mounted() {
    console.log("tab mounted");
    this.tabData = this.$store.getters.getData;
    this.setTabNum();
    this.setData();
  }

  @Watch("loading")
  onLoadingChanged(newValue: any) {
    //console.log("changed",newValue);
  }

  setTabNum() {
    let tabdata = JSON.parse(JSON.stringify(this.$store.getters.getTabData));
    //this.tabsProps = Object.entries(tabdata).map((e) => ({[e[0]]:e[1]}));
    this.tabsProps = Object.entries(tabdata).map((e) => e);

    this.tabsProps.forEach((e: any, i: any) => {
      //console.log(e[0], e[1]);
      if (this.$route.name == e[1].title.toLowerCase()) this.tabNum = i;
    });
    //console.log(this.tabNum);
  }

  setData() {
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

  setTitle(params: any) {
    this.title = this.tabsProps[params][1].title;
  }

  getStatus() {
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

  getStatusArr(params: number) {
    //console.log(this.tabsProps[params][0]);
    this.activeArr =
      this.tabData.data.tabdata[this.tabsProps[params][0]].active;
    this.disabledArr =
      this.tabData.data.tabdata[this.tabsProps[params][0]].disabled;
    this.inactiveArr =
      this.tabData.data.tabdata[this.tabsProps[params][0]].inactive;
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
