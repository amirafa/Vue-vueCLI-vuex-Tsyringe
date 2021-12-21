import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Service } from "../class/Service";
import { Myjson, Tabdata, Tab } from "@/interface/interface";

// You can declare mixins as the same style as components.
interface tabProps {
  tab: string;
  tabdata: Tabdata;
}

@Component
export class Mix extends Vue {
  @Prop() isToggled!: string;

  tabData!: Myjson;
  tabNum: number = 0;
  allPlugins: any;
  allPluginsArr: any;
  tabPlugins: any;
  pluginStatus: any;
  loading: boolean = true;
  global: any;
  title: string = "";
  activeArr: Array<string> = [];
  disabledArr: Array<string> = [];
  inactiveArr: Array<string> = [];
  tabPluginsArr: Array<string> = [];
  tabNames: Array<string> = [];
  tabsProps!: Array<[string, Tab]>;

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
      global: new Service() as Service,
      tabNames: ["marketing", "finance", "personnel"] as Array<string>,
      tabsProps: [] as Array<[string, Tab]>,
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
  onLoadingChanged(newValue: boolean) {
    //console.log("changed",newValue);
  }

  setTabNum() {
    let tabdata: Tabdata = JSON.parse(
      JSON.stringify(this.$store.getters.getTabData)
    );
    //this.tabsProps = Object.entries(tabdata).map((e) => ({[e[0]]:e[1]}));
    this.tabsProps = Object.entries(tabdata).map((e: any) => e);
    console.log(this.$route.name);

    this.tabsProps.forEach((e: [string, Tab], i: number) => {
      if (this.$route.name == "home") this.tabNum = 0;
      else if (this.$route.name == e[1].title.toLowerCase()) this.tabNum = i;
    });
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

  setTitle(params: number) {
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

  getStatusArr(params: any) {
    var tabname = this.tabsProps[params][0];
    //ignor error
    this.activeArr = this.tabData.data.tabdata.tab1.active;
    this.disabledArr = this.tabData.data.tabdata.tab1.disabled;
    this.inactiveArr = this.tabData.data.tabdata.tab1.inactive;
  }

  getTabPlugins() {
    this.allPluginsArr.forEach((a: any) => {
      this.tabPlugins.forEach((b: string) => {
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
