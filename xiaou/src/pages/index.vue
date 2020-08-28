<template>
<div>
<router-view></router-view>
<v-nav></v-nav>
</div>
</template>
<script>
import vNav from '../components/nav'
export default {
components:{
    vNav
},
data(){
   return {
   }
},
methods: {
},
}
</script>
<style scoped>
</style>