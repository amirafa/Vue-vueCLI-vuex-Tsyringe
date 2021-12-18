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
import { Component, Emit, Prop, Vue,Watch } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class Plugin extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Prop() plugin!: any;
  @Prop() pluginStatus!: any;
  @Prop() isToggled!: any;
  @Prop() tabData!: any;
  @Prop() tabNumber!: any;

  status: any;
  dataCopy: any;
  card: any;
  checkb: any;
  allow: any;

  data() {
    return {
      checkb: null,
      card: null,
      allow: null,
      status: undefined,
      dataCopy: undefined,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    console.log("Plugin mounted");
    this.card = this.$refs.card;
    this.checkb= this.$refs.checkb;
    this.allow= this.$refs.allow;
    this.dataCopy = JSON.parse(
      JSON.stringify(Object.assign({}, this.$props.tabData))
    );
    this.checkCb();
  }

  @Watch('isToggled')
  onIsToggledChanged(newValue:any) {
    //console.log("plugin watch",newValue);
    this.checkCb()
     // ... do whatever you need to do with the newValue here
  }

  checkCb() {
    this.checkToggle();
    this.setActive();
    this.setDisabled();
    this.setInactive();
    this.setCbLabel();
    //console.log(status.value)
  }

  checkToggle() {
    this.checkb.disabled = !this.$props.isToggled;
    let nodes = this.card.getElementsByTagName("*");
    if (this.$props.isToggled) {
      let nodes = this.card.getElementsByTagName("*");
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].style.userSelect = "none";
      }
    } else {
      for (var j = 0; j < nodes.length; j++) {
        nodes[j].disabled = false;
        nodes[j].style.userSelect = "all";
      }
    }
  }

  setActive() {
    let noSpace = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase = noSpace.toLowerCase();
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.active.forEach((element: any) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        //console.log(root);
        this.status = 1;
        this.checkb.checked = true;
      }
    });
  }

  setDisabled() {
    let noSpace = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase = noSpace.toLowerCase();
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.disabled.forEach((element: any) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        this.status = 2;
        this.checkb.disabled = true;
      }
    });
  }

  setInactive() {
    let noSpace = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase = noSpace.toLowerCase();
    //console.log(props.pluginStatus.active,lowCase)
    this.$props.pluginStatus.inactive.forEach((element: any) => {
      if (element == lowCase) {
        //console.log(element, lowCase);
        this.status = 3;
        this.checkb.checked = false;
      }
    });
  }

  setCb() {
    this.setCbLabel();
    this.setNewData();
    this.pushData();
    //console.log(dataCopy.value)
  }

  setCbLabel() {
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

  setNewData() {
    let noSpace = this.$props.plugin.title.replace(/\s/g, "");
    let lowCase = noSpace.toLowerCase();
    let tn = this.$props.tabNumber;
    //
    if (this.status == 1) {
      let arr = this.dataCopy.data.tabdata[`tab${tn}`].active;
      let itemIndex = arr.indexOf(lowCase);
      this.dataCopy.data.tabdata[`tab${tn}`].active.splice(itemIndex, 1);
      this.dataCopy.data.tabdata[`tab${tn}`].inactive.push(lowCase);
      this.status = 3;
      //console.log("active : ",dataCopy.data.tabdata.tab1.active);
      //console.log("inactive : ",dataCopy.data.tabdata.tab1.inactive);
    } else if (this.status == 3) {
      let arr = this.dataCopy.data.tabdata[`tab${tn}`].active;
      let itemIndex = arr.indexOf(lowCase);
      this.dataCopy.data.tabdata[`tab${tn}`].inactive.splice(itemIndex, 1);
      this.dataCopy.data.tabdata[`tab${tn}`].active.push(lowCase);
      this.status = 1;
      //console.log("inactive : ",dataCopy.data.tabdata.tab1.inactive);
      //console.log("active : ",dataCopy.data.tabdata.tab1.active);
    }
    console.log("--------------");
  }

  pushData() {
    console.log("Posted data = ", this.dataCopy);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130",
        //"http://localhost:3000/data",
        this.dataCopy,
        { headers }
      )
      .then(function (response) {
        console.log("Posted ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style>
.cb-text {
  font-size: 0.75em !important;
}
</style>
