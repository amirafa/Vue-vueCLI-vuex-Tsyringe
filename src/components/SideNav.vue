<template>
  <div ref="sideNav" @click="navClick()" class="p-0 m-0 bg-nav">
    <nav class="bg-nav bg-gradient navbar navbar-light m-0 p-0">
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
          >Marketing</router-link>
          <router-link class="nav-link ps-5 px-0 py-3 w-100" to="/finance">
            <i class="bi bi-circle-square my-auto me-2"></i
          >Finance</router-link>
          <router-link class="nav-link ps-5 px-0 py-3 w-100" to="/personnel">
            <i class="bi bi-check2-square my-auto me-2"></i
          >Personnel</router-link>
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
import router from "@/router";
//import { useRoute,useRouter } from "vue-router";

@Component({
  components: {},
})
export default class SideNav extends Vue {
  //@Prop() fData!: any;
  tabData: any;
  allEnable: boolean = true;
  cbText: string = "";
  route: any;
  routes: any;
  tabsProps: any;
  routerLinks: any;

  data() {
    return {
      tabData: undefined,
      allEnable: undefined,
      cbText: undefined,
      routerLinks: undefined,
      sideNav: undefined,
      router: undefined,
      route: undefined,
      routeName: undefined,
      routes: undefined,
      tabsProps: undefined,
    };
  }

  created() {
    console.log("SideNav created");
  }

  mounted() {
    this.route = this.$route;
    this.routerLinks = this.$refs.routerLinks;
    console.log("SideNav mounted => route is : ", this.$route);
    //
    //this.addRouterLink();
    //
    //this.setLinkTilte();
    //
    this.doThis();
  }

  @Watch("route")
  onRouteChanged(newValue: any) {
    //console.log("SideNav route changed");
    this.doThis();
  }

  @Watch("tabData")
  ontabDataChange(newValue: any) {
    //console.log("SideNav route changed");
    this.doThis();
  }

  // setLinkTilte() {   //مشکل دارد
  //   console.log("here...")
    
  //   console.log("here1...",this.$store.getters.getTabData)
  //   this.tabsProps = Object.entries(this.tabData).map((e) => e);
  //   console.log("here2...",this.tabsProps)
  //   this.routerLinks.childNodes.forEach((element: any, index: number) => {
  //     //console.log(this.tabsProps[index]);
  //     let title: string = this.tabsProps[index][1].title;
  //     element.innerHTML = title;
  //   });
  // }

  doThis() {
    const routerLinks: any = this.$refs.routerLinks;
    if (this.$route.path != "/marketing" && this.$route.path != "/") {
      routerLinks.firstChild.classList.remove("router-link-exact-active");
    } else {
      routerLinks.firstChild.classList.add("router-link-exact-active");
    }
  }

  // addRouterLink() {
  //   let ok = false;
  //   router.getRoutes().forEach((element: any, index: any) => {
  //     //console.log("now", this.tabsProps[index][1].title, index);
  //     if (ok) {
  //       let linkNode: string = `<a
  //       class="nav-link ps-5 px-0 py-3 w-100
  //       router-link-exact-active router-link-active"
  //       onclick='onClick()'
  //       >
  //       ${this.tabsProps[index - 1][1].title}
  //       </a>`;
  //       this.routerLinks.innerHTML = this.routerLinks.innerHTML + linkNode;
  //     }
  //     ok = true;
  //   });
  // }

  navClick() {
    this.doThis();
    //console.log("clicked");
    return this.allEnable;
  }

  @Emit("")
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


