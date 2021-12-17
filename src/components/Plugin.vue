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
import { Component,Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {
  },
})
export default class Plugin extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Prop()  plugin!: string;
  @Prop()  pluginStatus!: string;
  @Prop()  isToggled!: string;
  @Prop()  tabData!: string;
  @Prop()  tabNumber!: string;

  data() {
    return {
      checkb : null,
      card : null,
      allow:undefined,
      status:undefined,
      dataCopy:undefined
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    console.log("Plugin mounted");
    this.checkCb();
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
      this.$refs.checkb.disabled = !prop.value.isToggled;
      let nodes = this.$refs.card.getElementsByTagName("*");
      if (!prop.value.isToggled) {
        let nodes = this.$refs.card.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].disabled = true;
          nodes[i].style.userSelect="none"
        }
      }
      else{
        for (var j = 0; j < nodes.length; j++) {
          nodes[j].disabled = false;
          nodes[j].style.userSelect="all"
        }
      }
    }

    setActive() {
      let noSpace = props.plugin.title.replace(/\s/g, "");
      let lowCase = noSpace.toLowerCase();
      //console.log(props.pluginStatus.active,lowCase)
      props.pluginStatus.active.forEach((element) => {
        if (element == lowCase) {
          //console.log(element, lowCase);
          //console.log(root);
          status.value = 1;
          checkb.value.checked = true;
        }
      });
    }

    setDisabled() {
      let noSpace = props.plugin.title.replace(/\s/g, "");
      let lowCase = noSpace.toLowerCase();
      //console.log(props.pluginStatus.active,lowCase)
      props.pluginStatus.disabled.forEach((element) => {
        if (element == lowCase) {
          //console.log(element, lowCase);
          status.value = 2;
          checkb.value.disabled = true;
        }
      });
    }

    setInactive() {
      let noSpace = props.plugin.title.replace(/\s/g, "");
      let lowCase = noSpace.toLowerCase();
      //console.log(props.pluginStatus.active,lowCase)
      props.pluginStatus.inactive.forEach((element) => {
        if (element == lowCase) {
          //console.log(element, lowCase);
          status.value = 3;
          checkb.value.checked = false;
        }
      });
    }

    setCb() {
      setCbLabel();
      setNewData();
      pushData();
      //console.log(dataCopy.value)
    }

    setCbLabel() {
      allow.value.style.fontSize = "1em";
      if (checkb.value.disabled) {
        allow.value.innerHTML = "disabled";
        allow.value.style.color = "grey";
      } else if (checkb.value.checked) {
        allow.value.innerHTML = "allowed ";
        allow.value.style.color = "#0d6efd";
      } else {
        allow.value.innerHTML = "blocked ";
        allow.value.style.color = "#dc3545";
      }
    }

    setNewData() {
      let noSpace = props.plugin.title.replace(/\s/g, "");
      let lowCase = noSpace.toLowerCase();
      let tn = prop.value.tabNumber;
      //
      if (status.value == 1) {
        let arr = dataCopy.data.tabdata[`tab${tn}`].active;
        let itemIndex = arr.indexOf(lowCase);
        dataCopy.data.tabdata[`tab${tn}`].active.splice(itemIndex, 1);
        dataCopy.data.tabdata[`tab${tn}`].inactive.push(lowCase);
        status.value = 3;
        //console.log("active : ",dataCopy.data.tabdata.tab1.active);
        //console.log("inactive : ",dataCopy.data.tabdata.tab1.inactive);
      } else if (status.value == 3) {
        let arr = dataCopy.data.tabdata[`tab${tn}`].active;
        let itemIndex = arr.indexOf(lowCase);
        dataCopy.data.tabdata[`tab${tn}`].inactive.splice(itemIndex, 1);
        dataCopy.data.tabdata[`tab${tn}`].active.push(lowCase);
        status.value = 1;
        //console.log("inactive : ",dataCopy.data.tabdata.tab1.inactive);
        //console.log("active : ",dataCopy.data.tabdata.tab1.active);
      }
      console.log("--------------");
    }

    pushData() {
      console.log("Posted data = ", dataCopy);
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      };
      axios
        .post(
          "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130",
          //"http://localhost:3000/data",
          dataCopy,
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
</style>
