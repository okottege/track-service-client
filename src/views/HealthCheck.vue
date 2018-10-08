<template>
  <div>
    <b-card class="top-gap" title="Health information for Service">
      <div>
        <span class="card-text col-md-4"><strong>Version</strong></span>
        <span class="card-text col-md-4">{{ version }}</span>
      </div>
      <div>
        <span class="card-text col-md-4"><strong>Number of Employees</strong></span>
        <span class="card-text col-md-4">{{ numEmployees }}</span>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';

const getStateProp = (obj, propName) => obj ? obj[propName] : '...loading';

export default {
  name: 'HealthCheck',
  computed: {
    ...mapState('healthCheck', {
      version: state => getStateProp(state.healthInfo, 'Version'),
      numEmployees: state => getStateProp(state.healthInfo, 'NumEmployees')
    })
  },
  created () {
    this.$store.dispatch('healthCheck/getHealth');
  }
};
</script>
<style>
.top-gap {
  margin-top: 10px;
}
</style>
