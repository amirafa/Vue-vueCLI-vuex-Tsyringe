<template>
  <div ref="card" class="m-2 border border-3 border-grey rounded p-2 w-100">
    <header class="d-flex flex-row justify-content-between">
      <h4>{{ plugin.title }}</h4>
      <div class="d-flex flex-column">
        <div class="form-check form-switch d-flex align-self-center p-0">
          <input
            ref="checkb"
            id="checkb"
            class="d-flex flex-row align-self-center form-check-input m-0"
            type="checkbox"
            @change="setCb"
          />
        </div>
        <p ref="allow" class="cb-text d-flex align-self-center"></p>
      </div>
    </header>
    <section>
      <p class="just text-black-50">
        {{ plugin.description }}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Service } from "@/class/Service";
import { Myjson, Plugin } from "@/interface/interface";

@Component({
  components: {},
})
export default class CardPlugin extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Prop() plugin!: Plugin;
  @Prop() pluginStatus!: {
    active: Array<string>;
    disabled: Array<string>;
    inactive: Array<string>;
  };
  @Prop() isToggled!: boolean;
  @Prop() tabNumber!: number;

  tabData!: Myjson;
  status!: number;
  dataCopy!: Myjson;
  card: any;
  checkb: any;
  allow: any;
  service!: Service;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      checkb: null,
      card: null,
      allow: null,
      status: undefined,
      dataCopy: undefined,
      service: new Service(),
      tabData: undefined,
    };
  }

  created(): void {
    console.log("Plugins created");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    console.log("Plugin mounted");
    //getData
    this.getData();
    //--------
    this.card = this.$refs.card;
    this.checkb = this.$refs.checkb;
    this.allow = this.$refs.allow;

    this.checkCb();
  }

  getData(): void {
    this.tabData = this.$store.getters.getData;
    this.dataCopy = JSON.parse(JSON.stringify(Object.assign({}, this.tabData)));
  }

  @Watch("isToggled")
  onIsToggledChanged(): void {
    //console.log("plugin watch",newValue);
    this.checkCb();
    // ... do whatever you need to do with the newValue here
  }

  checkCb(): void {
    this.checkToggle();
    this.setPreloadCheckbox();
    this.setCbLabel();
    //console.log(status.value)
  }

  checkToggle(): void {
    this.checkb.disabled = !this.$props.isToggled;
    //---
    this.makeDisabled(this.$props.isToggled);
  }

  setPreloadCheckbox(): void {
    let noSpace: string = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase: string = noSpace.toLowerCase();
    this.setActive(noSpace, lowCase);
    this.setDisabled(noSpace, lowCase);
    this.setInactive(noSpace, lowCase);
  }

  setActive(noSpace: string, lowCase: string): void {
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.active.forEach((element: string) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        //console.log(root);
        this.status = 1;
        this.checkb.checked = true;
      }
    });
  }

  setDisabled(noSpace: string, lowCase: string): void {
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.disabled.forEach((element: string) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        this.status = 2;
        this.makeDisabled(true);
      }
    });
  }

  setInactive(noSpace: string, lowCase: string): void {
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.inactive.forEach((element: string) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        this.status = 3;
        this.checkb.checked = false;
      }
    });
  }

  makeDisabled(bool: boolean): void {
    if (bool) {
      let nodes = this.card.getElementsByTagName("*");
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].style.userSelect = "none";
      }
    } else {
      let nodes = this.card.getElementsByTagName("*");
      for (var j = 0; j < nodes.length; j++) {
        nodes[j].disabled = false;
        nodes[j].style.userSelect = "all";
      }
    }
  }

  setCb(): void {
    //this.$store.dispatch("setLoadingStatus",true)
    //console.log(this.$store.getters.getLoadingStatus)
    this.getData();
    this.setNewData();
    this.setCbLabel();
    this.pushData();
    //console.log(dataCopy.value)
  }

  setCbLabel(): void {
    this.allow.style.fontSize = "1em";
    if (this.checkb.disabled) {
      this.allow.innerHTML = "disabled";
      this.allow.style.color = "grey";
    } else if (this.checkb.checked) {
      this.allow.innerHTML = "allowed ";
      this.allow.style.color = "#0d6efd";
    } else {
      this.allow.innerHTML = "blocked ";
      this.allow.style.color = "#dc3545";
    }
  }

  setNewData(): void {
    let noSpace: string = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase: string = noSpace.toLowerCase();
    let tn: number = this.$props.tabNumber + 1;
    console.log(noSpace, lowCase, tn);
    console.log(this.dataCopy);
    //ignore
    if (this.status == 1) {
      let arr = this.dataCopy.data.tabdata[`tab${tn}`].active;
      let itemIndex = arr.indexOf(lowCase);
      this.dataCopy.data.tabdata[`tab${tn}`].active.splice(itemIndex, 1);
      this.dataCopy.data.tabdata[`tab${tn}`].inactive.push(lowCase);
      this.status = 3;
    } else if (this.status == 3) {
      let arr = this.dataCopy.data.tabdata[`tab${tn}`].inactive;
      let itemIndex = arr.indexOf(lowCase);
      this.dataCopy.data.tabdata[`tab${tn}`].inactive.splice(itemIndex, 1);
      this.dataCopy.data.tabdata[`tab${tn}`].active.push(lowCase);
      this.status = 1;
    }
    console.log("here", this.dataCopy);

    console.log("--------------");
  }

  pushData(): void {
    this.service = new Service();
    this.service
      .postData(this.dataCopy)
      .then((response: any) => {
        console.log("Server Status = ", response.status);
        //this.setCbLabel();
      })
      .catch((err: any) => {
        console.log("Plugin -> pushData", err);
        this.checkb.checked = !this.checkb.checked;
        this.setCbLabel()
      });
  }
}
</script>

<style>
.cb-text {
  font-size: 0.75em !important;
}
</style>
