<template>
  <div>
    <div>
      <b-alert v-if="hasError" variant="danger" show>
        There seems to be some information missing or incorrect.  Please check the fields below.
      </b-alert>
      <b-alert v-if="submitted" variant="success" show>
        Successfully created the employee.
      </b-alert>
    </div>
    <b-form @submit="onSubmit" @reset="onReset">
      <form-text-box
        id="txtFirstName"
        label="First Name:"
        :errorMessage="firstNameError"
        v-model="form.firstName"
        :state="firstNameValid"
        @input="updateState($event, 'firstName')" />

      <form-text-box
        id="txtLastName"
        label="Last Name:"
        :errorMessage="lastNameError"
        v-model="form.lastName"
        :state="lastNameValid"
        @input="updateState($event, 'lastName')" />

      <form-text-box
        id="txtEmail"
        label="Email:"
        inputType="email"
        :errorMessage="emailError"
        v-model="form.email"
        :state="emailValid"
        @input="updateState($event, 'email')" />

      <date-picker label="Select Date of birth" id="dateOfBirth" v-model="form.dateOfBirth" @input="updateState($event, 'dateOfBirth')" />
      <date-picker label="Select Start date" id="startDate" v-model="form.startDate" @input="updateState($event, 'startDate')" />

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import DatePicker from '../components/controls/DatePicker';
import FormTextBox from '../components/controls/FormTextBox';

export default {
  data () {
    return {
      dateOfBirthMenu: false,
      startDateMenu: false
    };
  },
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
    firstNameValid () {
      return this.firstNameError === undefined ? null : false;
    },
    lastNameValid () {
      return this.lastNameError === undefined ? null : false;
    },
    emailValid () {
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
  },
  components: {
    DatePicker,
    FormTextBox
  }
};

</script>
<style scoped>
.reset-button {
  margin-left: 10px;
}
</style>
