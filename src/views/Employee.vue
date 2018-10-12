<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="grpFirstName" label="First Name:" label-for="txtFirstName">
        <b-form-input id="txtFirstName" type="text" v-model="firstName" @input="updateState($event, 'firstName')" />
      </b-form-group>
      <b-form-group id="grpLastName" label="Last Name:" label-for="txtLastName">
        <b-form-input id="txtLastName" type="text" v-model="lastName" @input="updateState($event, 'lastName')" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState('employeeCreate', [
      'firstName',
      'lastName',
      'dateOfBirth',
      'startDate'
    ])
  },
  methods: {
    updateState (data, fieldName) {
      console.log(`data: ${data}, field: ${fieldName}`);
      this.$store.dispatch('employeeCreate/updateState', { fieldName, value: data });
    },
    onSubmit (e) {
      e.preventDefault();
      this.$store.dispatch('employeeCreate/submitEmployee');
    },
    onReset (e) {
      e.preventDefault();
      this.$store.dispatch('employeeCreate/resetEmployee');
    }
  }
};

</script>
