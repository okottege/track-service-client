<template>
  <b-table striped hover :fields="fields" :items="employees"></b-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      fields: [
        { key: 'FirstName', label: 'First name' },
        { key: 'LastName', label: 'Surname' },
        { key: 'DateOfBirth', label: 'Date of birth' }
      ]
    };
  },
  computed: {
    ...mapGetters('employeeList', ['employees'])
  },
  created () {
    this.$store.dispatch('employeeList/getEmployees');
  }
};
</script>
