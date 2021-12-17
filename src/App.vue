<template>
  <div class="d-flex min-vh-100">
    <SideNav :fdata="fdata" @is-toggled="getToggle($event)" />
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
import { Component, Vue } from "vue-property-decorator";
import SideNav from "./components/SideNav.vue";
import { Global } from "./class/Service";

@Component({
  components: {
    SideNav,
  },
})
export default class App extends Vue {
  global: any;
  isData: any;
  fdata:any
  isToggled: any;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      fdata : "",
      isData:false,
      isToggled : false,
      global : new Global()
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted(){
    console.log("App mounted");
    try {
        this.fdata = await this.global.fetchData(this.global);
        this.isData = true;
        //console.log(this.fdata/*,this.isData,this.isToggled,this.global*/)
      } catch (err) {
        console.log("App error:",err)
      }
      this.showData()
    }

    getToggle(toggle: any) {
      this.isToggled = toggle;
      //console.log("changed ",toggle)
    }

    showData() {
      return this.isData;
    }

    
  }
  // // @Prop()
  // // private msg!: string;
  // msg = "";
  // name = "";

  // data() {
  //   return {
  //     msg: "hello",
  //     nme: "amir",
  //   };
  // }
  // // mounted() {
  // //   this.name="amir"
  // // }

  // doSth(): void {
  //   this.msg = "bye";
  //   this.name = "ali";
  // }

  // show(a) {
  //   this.msg += ` ${a.last}`;
  // }

</script>

<style>
</style>
