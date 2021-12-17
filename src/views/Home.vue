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
import { Component,Emit,Prop, Vue } from 'vue-property-decorator';
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Component({
//   components: {
//     HelloWorld,
//   },
// })


@Component
export default class Home extends Vue {
  // @Prop()  msg!: string;
  // @Prop()  nme!: string;

  // @Emit("last")


  // data(){
  //   return {
  //     last:"rafati"
  //   }
  // }
}
</script>
