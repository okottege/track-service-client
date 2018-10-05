<template>
  <div>
    <b-card title="Health information for Service">
      <div>
        <span class="card-text"><strong>Version</strong></span>
        <span class="card-text">{{ version }}</span>
      </div>
      <div>
      </div>
    </b-card>
  </div>
</template>
<script>
// import { mapState } from 'vuex';

export default {
  name: 'HealthCheck',
  computed: {
    version () {
      const healthInfo = this.$store.state.healthCheck.healthInfo;
      return healthInfo ? healthInfo.Version : '';
    },
    numEmployees () {
      const healthInfo = this.$store.state.healthCheck.healthInfo;
      return healthInfo ? healthInfo.numEmployees : '';
    }
  },
  created () {
    this.$store.dispatch('healthCheck/getHealth');
  }
};
</script>
