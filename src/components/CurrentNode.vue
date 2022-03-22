<template>
currentNode
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {getCurrentNode} from "@/helper/allRequest";
const route=useRoute()
getCurrentNode.request("/getCurrentNode",route.params).then((res)=>{
  console.log(res)
})
</script>

<style lang="scss" scoped>

</style>