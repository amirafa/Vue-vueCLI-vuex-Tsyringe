<template>
  <div class="d-flex min-vh-100">
    <SideNav @change-cb="getToggle($event)" />
    <div
      v-if="!this.$store.getters.getLoadingStatus && isData"
      class="d-flex flex-grow-1"
    >
      <router-view :is-toggled="isToggled"></router-view>
    </div>
    <div v-else class="container">
      <div class="row d-flex justify-content-center align-items-center vh-100">
        <div
          class="spinner-grow"
          style="width: 3rem; height: 3rem"
          role="status"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import SideNav from "./components/SideNav.vue";
//import { Service } from "./class/service/Service";
import { DiContainer} from "./class/dicontainer/DiContainer";
import { Myjson } from "@/interface/interface";

@Component({
  components: {
    SideNav,
  },
})
export default class App extends Vue {
  isData!: boolean ;
  fdata!: Myjson;
  isToggled!: boolean;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      fdata: undefined,
      isData: undefined,
      isToggled: undefined,
    };
  }

  created():void {
    console.log("App created");
  }

  mounted():void {
    this.getData()
      .then((respnse: Myjson) => {
        this.fdata = respnse;
        //console.log(this.fdata);
        this.isData = true;
      })
      .catch((err: unknown) => {
        console.log(err);
      });
    // console.log("App mounted");
    // console.log("Loading = ", !this.isData);
    // this.$store.dispatch("fetchData").then((response) => {
    //   this.isData = !this.$store.getters.getLoadingStatus;
    //   console.log("Fetched Data = ", response);
    //   console.log("Loading = ", !this.isData);
    // });
  }

  // async getData(): Promise<Myjson> {
  //   this.service = new Service();
  //   try {
  //     return await this.service.fetchData();
  //   } catch (err: any) {
  //     return err;
  //   }
  // }

  async getData(): Promise<Myjson> {
    const di=new DiContainer()
    try {
      return await di.injectGet();
    } catch (err: any) {
      return err;
    }
  }

  // @Watch("isData")
  //   onLoadingChanged(newValue: any) {

  //   }

  getToggle(toggle: boolean): void {
    console.log("App : toggle change recieve");
    this.isToggled = toggle;
  }
}

// // @Prop()
// // private msg!: string;
// msg = "";
// name = "";
</script>

<style>
</style>
