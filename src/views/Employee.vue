<template>
  <div>
    <div>
      <b-alert v-if="hasError" variant="danger" show>
        There seems to be some information mission or incorrect.  Please check the fields below.
      </b-alert>
    </div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="grpFirstName" label="First Name:" label-for="txtFirstName">
        <b-form-input
          id="txtFirstName"
          type="text"
          v-model="form.firstName"
          :state="firstNameValid"
          @input="updateState($event, 'firstName')" />
        <div v-if="firstNameError">
          <span class="error-message">{{firstNameError.error}}</span>
        </div>
      </b-form-group>
      <b-form-group id="grpLastName" label="Last Name:" label-for="txtLastName">
        <b-form-input
          id="txtLastName"
          type="text"
          v-model="form.lastName"
          :state="lastNameValid"
          @input="updateState($event, 'lastName')" />
        <div v-if="lastNameError">
          <span class="error-message">{{lastNameError.error}}</span>
        </div>
      </b-form-group>

      <b-form-group id="grpEmail" label="Email:" label-for="txtEmail">
        <b-form-input
          id="txtEmail"
          type="email"
          v-model="form.email"
          :state="emailValid"
          @input="updateState($event, 'email')" />
        <div v-if="emailError">
          <span class="error-message">{{emailError.error}}</span>
        </div>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
    </b-form>
    <div>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

export default {
  data () {
    return {
      date: null,
      menu: false
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
  }
};

</script>
<style scoped>
.reset-button {
  margin-left: 10px;
}
.error-message {
  color: #dc3545;
  padding-top: 10px;
  font-size: 0.85rem;
}
</style>
