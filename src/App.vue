<template>
  <div id="app">
    <v-app>
      <site-navigation />
      <div class="container">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
import SiteNavigation from '@/components/SiteNavigation';

export default {
  name: 'app',
  data () {
    return {};
  },
  components: {
    SiteNavigation
  }
};

</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
</style>
