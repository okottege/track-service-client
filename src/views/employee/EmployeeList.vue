<template>
  <div>
    <b-card>
      <span>Creating new employees are easy</span>
      <b-button class="text-button" variant="primary" @click="newEmployee">Create Employee</b-button>
    </b-card>
    <b-card class="body-card">
      <b-table striped hover :fields="fields" :items="employees">
        <template slot="Details" slot-scope="data">
          <b-button @click="employeeDetails(data.item.EmployeeId)">Details</b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      fields: [
        { key: 'FirstName', label: 'First name' },
        { key: 'LastName', label: 'Surname' },
        { key: 'DateOfBirth', label: 'Date of birth' },
        { key: 'Details', label: '' }
      ]
    };
  },
  computed: {
    ...mapGetters('employeeList', ['employees'])
  },
  methods: {
    newEmployee () {
      this.$router.push('/employee/create');
    },
    employeeDetails (employeeId) {
      this.$router.push(`/employee/${employeeId}`);
    }
  },
  created () {
    this.$store.dispatch('employeeList/getEmployees');
  }
};
</script>
<style>
.text-button {
  margin-left: 15px;
}
.body-card {
  margin-top: 10px;
}
</style>
