<template>
  <div>
    <b-card title="Health information for Service">
      <div>
        <span class="card-text"><strong>Version</strong></span>
        <span class="card-text">{{ healthCheckInfo.healthInfo.Version }}</span>
      </div>
      <div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'HealthCheck',
  computed: mapState({
    healthCheckInfo: state => state.healthInfo
  }),
  created () {
    this.$store.dispatch('healthCheck/getHealth');
  }
};
</script>
