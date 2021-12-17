<template>
  <div class="d-flex min-vh-100">
    <SideNav :data="data" @is-toggled="getToggle" />
    <div v-if="showData()" class="d-flex flex-grow-1">
      <router-view :data="data" :is-toggled="isToggled"></router-view>
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
import { Global } from "./class/Service.js";

@Component({
  components: {
    SideNav,
  },
})
export default class App extends Vue {
  data() {
    return {
      data : "",
      isData:false,
      isToggled : false,
      global : new Global()
    };
  }

  mounted(){
    console.log("mounted");
    this.data = 
      
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
}
</script>

<style>
</style>
