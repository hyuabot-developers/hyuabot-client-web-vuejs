<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <div v-show="globalStore.isLoading" class="loading-container">
      <q-spinner
        class="loading"
        color="secondary"
        size="3em"
      />
    </div>
    <BusCard v-for="busItem in busArrivalList" :bus="busItem" style="margin-bottom: 10px"/>
  </q-page>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useGlobalStore} from 'stores/global.store';
import {useBusArrivalStore} from 'stores/bus.store';
import BusCard from 'components/BusCard.vue'
import {BusItem} from 'src/models/bus.item';

export default defineComponent({
  name: 'BusPage',
  components: {BusCard},
  setup () {
    const busArrivalList = ref([] as BusItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.bus';

    const busStore = useBusArrivalStore();
    busStore.fetchArrivalList();
    const timer = setInterval(() => {
      busStore.fetchArrivalList();
    }, 60000);
    busStore.$subscribe((mutation, state) => {
      busArrivalList.value = state.arrivalList;
    })
    return {globalStore, busArrivalList, timer};
  },
  unmounted() {
    clearInterval(this.timer);
  }
});
</script>
<style>
.loading-container {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
