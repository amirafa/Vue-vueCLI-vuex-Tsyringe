import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
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
  
    data() {
      return {
        tabNum: 1,
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
        global: new Service(),
        tabNames : ['marketing','finance','personnel']
      };
    }

    created() {
      console.log("tab created");
    }
  
    mounted() {
      console.log("tab mounted");
      this.setTabNum();
      this.tabData = this.$store.getters.getData
      this.setData();
      // this.getData()
      //   .then((response) => {
      //     this.tabData = response;
      //     this.setData();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  
    async getData(this: any) {
      try {
        return await this.global.fetchData(this.global);
      } catch (err) {
        return err;
      }
    }
  
    setTabNum(){
      //console.log("here",this.$route.name);
      if (this.$route.name == this.tabNames[0]) this.tabNum=1
      else if (this.$route.name == this.tabNames[1]) this.tabNum=2;
      else if (this.$route.name == this.tabNames[2]) this.tabNum=3;
    }
  
    setData() {
      this.allPlugins = this.tabData.data.plugins;
      this.allPluginsArr = Object.values(this.allPlugins);
      this.setTitle(this.tabNum);
                
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
      if (params == 1) {
        this.activeArr = this.tabData.data.tabdata.tab1.active;
        this.disabledArr = this.tabData.data.tabdata.tab1.disabled;
        this.inactiveArr = this.tabData.data.tabdata.tab1.inactive;
      } else if (params == 2) {
        this.activeArr = this.tabData.data.tabdata.tab2.active;
        this.disabledArr = this.tabData.data.tabdata.tab2.disabled;
        this.inactiveArr = this.tabData.data.tabdata.tab2.inactive;
      } else if (params == 3) {
        this.activeArr = this.tabData.data.tabdata.tab3.active;
        this.disabledArr = this.tabData.data.tabdata.tab3.disabled;
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
