<template>
<List kind="garbage"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import List from "@/helper/List.vue";

export default defineComponent({
  name: "Garbage",
  components: {List}
})
</script>

<style lang="scss" scoped>

</style>