<template>
  <div>
    <div>
      <b-alert v-if="submitted" variant="success" show>
        Successfully created the employee.
      </b-alert>
    </div>
    <employee
      :onSuccessfulSave="redirectToEmployeeList"
      :onFailedToSave="onFailedToSave"
      submitButtonText="Create New Employee" />
  </div>
</template>

<script>

import { mapState } from 'vuex';
import Employee from '../../components/Employee';

export default {
  computed: {
    ...mapState('employeeDetails', ['submitted'])
  },
  components: {
    Employee
  },
  methods: {
    redirectToEmployeeList () {
      this.$router.push('/employees');
    },
    onFailedToSave () {

    }
  }
};

</script>
