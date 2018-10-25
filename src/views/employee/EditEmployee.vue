<template>
  <div>
    <employee
      :employeeId="employeeId"
      submitButtonText="Save Employee Details"
      :onSuccessfulSave="redirectToList"
      :onFailedToSave="() => {}" />
  </div>
</template>
<script>

import Employee from '../../components/Employee';

export default {
  props: {
    employeeId: {
      required: true
    }
  },
  methods: {
    redirectToList () {
      this.$router.push('/employees');
    }
  },
  components: {
    Employee
  }
};
</script>
