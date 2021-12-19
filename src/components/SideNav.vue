<template>
  <div ref="sideNav" @click="navClick()" class="p-0 m-0 bg-nav">
    <nav class="bg-nav navbar navbar-light m-0 p-0">
      <div
        class="
          container-fluid
          d-flex
          flex-column
          justify-content-start
          m-0
          p-0
          h-100
        "
      >
        <!--  -->
        <a class="navbar-brand m-0 p-5" href="#">Data<strong>Guard</strong></a>
        <!-- Routes Container  -->
        <div ref="routerLinks" class="d-flex flex-column w-100">
          <router-link class="nav-link ps-5 px-0 py-3 w-100" to="/marketing">
            <i class="bi bi-grid-3x3-gap-fill my-auto me-2"></i
            >Marketing</router-link
          >
          <router-link class="nav-link ps-5 px-0 py-3 w-100" to="/finance">
            <i class="bi bi-circle-square my-auto me-2"></i>Finance</router-link
          >
          <router-link class="nav-link ps-5 px-0 py-3 w-100" to="/personnel">
            <i class="bi bi-check2-square my-auto me-2"></i
            >Personnel</router-link
          >
        </div>
        <!-- --------------- -->
        <div class="bg-nav d-flex mt-auto mx-auto mb-2 position-fixed bottom-0">
          <label
            class="me-1 form-check-label text-dark"
            for="flexSwitchCheckDefault"
            >All plugins enabled</label
          >
          <div class="d-flex form-check form-switch p-0 m-0">
            <input
              class="d-flex flex-row align-self-center form-check-input m-0"
              type="checkbox"
              id="flexSwitchCheckDefault"
              @change="changeCb()"
              checked
            />
          </div>
        </div>

        <!--  -->
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
//import { useRoute,useRouter } from "vue-router";

@Component({
  components: {},
})
export default class SideNav extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //@Prop() fData!: any;
  allEnable: boolean = true;
  cbText: string = "";

  data() {
    return {
      allEnable: undefined,
      cbText: undefined,
      routerLinks: undefined,
      sideNav: undefined,
      router: this.$router,
      route: this.$route,
      routeName: undefined,
    };
  }

  mounted() {
    console.log("SideNav mounted * route is : ", this.$route);
    this.doThis();
  }

  @Watch("route")
  onRouteChanged(newValue: any) {
    console.log("SideNav route changed");
  }

  doThis() {
    const routerLinks: any = this.$refs.routerLinks;
    if (this.$route.path != "/marketing" && this.$route.path != "/") {
      //console.log("if");
      //console.log(routerLinks.firstChild.classList);
      routerLinks.firstChild.classList.remove("router-link-exact-active");
    } else {
      //console.log("else");
      //console.log(routerLinks.firstChild.classList);
      routerLinks.firstChild.classList.add("router-link-exact-active");
    }
  }

  navClick() {
    this.doThis();
    //console.log("clicked");
    return this.allEnable;
  }

  @Emit()
  changeCb() {
    this.allEnable = !this.allEnable;
    return this.allEnable;
  }
}
</script>

<style>
.router-link-exact-active {
  color: rgb(0, 0, 0) !important;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  border-left: 0.5rem solid #dc3545;
}

.nav-link {
  color: rgb(0, 0, 0) !important;
}

.bg-nav {
  background-color: rgb(212, 212, 212);
}
</style>


