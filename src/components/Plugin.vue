<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plugin from "../components/Plugin.vue";

@Component({
  components: {
  },
})
export default class Plugin extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted() {
    console.log("Plugin mounted");
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
