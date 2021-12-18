<template>
  <div class="d-flex min-vh-100">
    <SideNav @change-cb="getToggle($event)" />
    <div v-if="showData()" class="d-flex flex-grow-1">
      <router-view :fdata="fdata" :is-toggled="isToggled"></router-view>
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
import { Service } from "./class/Service";

@Component({
  components: {
    SideNav,
  },
})
export default class App extends Vue {

  service: Service = new Service();
  isData: boolean = false;
  fdata: any;
  isToggled: boolean=true;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      fdata: undefined,
      isData: undefined,
      isToggled: undefined,
      service: undefined,
    };
  }

  mounted() {
    console.log("App mounted");
    this.getData()
      .then((respnse) => {
        this.fdata = respnse;
        //console.log(this.fdata);
        this.isData = true;
        this.showData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getData(this: any) {
    try {
      return await this.service.fetchData();
    } catch (err) {
      return err;
    }
  }

  getToggle(toggle: boolean): void {
    console.log("App : toggle change recieve");
    this.isToggled = toggle;
  }

  showData() {
    return this.isData;
  }
}
// // @Prop()
// // private msg!: string;
// msg = "";
// name = "";
</script>

<style>
</style>
