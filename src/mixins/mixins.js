import Vue from "vue";
import Component from "vue-class-component";
import Plugin from "../components/Plugin.vue";

// You can declare mixins as the same style as components.
@Component({
    components: {
        Plugin,
    },
})
export class useTab extends Vue {
    data() {
        return {
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
        };
    }

    mounted() {
        this.getData()
            .then((response) => {
                this.tabData = response;
                this.setData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setData(response) {
        this.allPlugins = this.tabData.data.plugins;
        this.allPluginsArr = Object.values(this.allPlugins);
        this.setTitle(tab);
        this.getStatus();
        this.tabPlugins = this.pluginStatus.active
            .concat(this.pluginStatus.disabled)
            .concat(this.pluginStatus.inactive);
        //
        this.getTabPlugins();
        //
        this.loading = true;
    }

    async getData() {
        try {
            return await this.global.fetchData(this.global);
        } catch (err) {
            return err;
        }
    }

    setTitle(params) {
        if (params == 1) this.title = this.tabData.data.tabdata.tab1.title;
        else if (params == 2) this.title = this.tabData.data.tabdata.tab2.title;
        else if (params == 3) this.title = this.tabData.data.tabdata.tab3.title;
    }

    getStatus() {
        this.getStatusArr(tab);
        //active--------------
        this.activeArr.forEach((element) => {
            this.pluginStatus.active.push(element);
        });
        //disabled
        this.disabledArr.forEach((element) => {
            this.pluginStatus.disabled.push(element);
        });
        //inactive
        this.inactiveArr.forEach((element) => {
            this.pluginStatus.inactive.push(element);
        });
    }

    getStatusArr(params) {
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
            this.disabledArr = this.tabDatae.data.tabdata.tab3.disabled;
            this.inactiveArr = this.tabData.data.tabdata.tab3.inactive;
        }
    }

    getTabPlugins() {
        this.allPluginsArr.forEach((a) => {
            this.tabPlugins.forEach((b) => {
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
