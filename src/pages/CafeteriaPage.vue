<template>
  <q-page class="column items-center justify-evenly" style="margin-left: 10px; margin-right: 10px; margin-top: 10px">
    <div v-show="globalStore.isLoading" class="loading-container">
      <q-spinner
        class="loading"
        color="secondary"
        size="3em"
      />
    </div>
    <CafeteriaCard v-for="cafeteriaItem in cafeteriaList" :cafeteria-item="cafeteriaItem" style="margin-bottom: 10px"/>
  </q-page>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import CafeteriaCard from 'components/CafeteriaCard.vue';
import {useGlobalStore} from 'stores/global.store';
import {useCafeteriaStore} from 'stores/cafeteria.store';
import {CafeteriaItem} from 'src/models/cafeteria.item';

export default defineComponent({
  name: 'CafeteriaPage',
  components: {CafeteriaCard},
  setup () {
    const cafeteriaList = ref([] as CafeteriaItem[])

    const globalStore = useGlobalStore();
    globalStore.title = 'menu.cafeteria';

    const cafeteriaStore = useCafeteriaStore();
    cafeteriaStore.fetchMenuList();
    cafeteriaStore.$subscribe((mutation, state) => {
      cafeteriaList.value = state.restaurantList;
    });
    return { globalStore, cafeteriaList }
  }
});
</script>
<style scoped>
.loading-container {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
