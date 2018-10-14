<template>
  <div>
    <div>
      <b-alert v-if="hasError" variant="danger" show>
        There are few errors, please see below.
      </b-alert>
    </div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="grpFirstName" label="First Name:" label-for="txtFirstName">
        <b-form-input
          id="txtFirstName"
          type="text"
          v-model="form.firstName"
          :state="firstNameIsOk"
          @input="updateState($event, 'firstName')" />
      </b-form-group>
      <b-form-group id="grpLastName" label="Last Name:" label-for="txtLastName">
        <b-form-input
          id="txtLastName"
          type="text"
          v-model="form.lastName"
          :state="lastNameIsOk"
          @input="updateState($event, 'lastName')" />
      </b-form-group>

      <b-form-group id="grpEmail" label="Email:" label-for="txtEmail">
        <b-form-input
          id="txtEmail"
          type="email"
          v-model="form.email"
          :state="emailIsOk"
          @input="updateState($event, 'email')" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('employeeCreate', [
      'form',
      'submitted'
    ]),
    ...mapGetters('employeeCreate', [
      'hasError',
      'firstNameError',
      'lastNameError',
      'emailError'
    ]),
    firstNameIsOk () {
      return this.firstNameError === undefined ? null : false;
    },
    lastNameIsOk () {
      return this.lastNameError === undefined ? null : false;
    },
    emailIsOk () {
      return this.emailError === undefined ? null : false;
    }
  },
  methods: {
    updateState (data, fieldName) {
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
