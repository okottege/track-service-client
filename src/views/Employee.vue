<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="grpFirstName" label="First Name:" label-for="txtFirstName">
        <b-form-input id="txtFirstName" type="text" v-model="form.firstName" />
      </b-form-group>
      <b-form-group id="grpLastName" label="Last Name:" label-for="txtLastName">
        <b-form-input id="txtLastName" type="text" v-model="form.lastName" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

const getEmptyForm = () => ({
  firstName: '',
  lastName: '',
  dateOfBirth: undefined,
  startDate: undefined
});

export default {

  data () {
    return {
      form: {
        ...getEmptyForm()
      }
    };
  },
  methods: {
    getEmptyForm () {
      return {
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        startDate: undefined
      };
    },
    onSubmit (e) {
      e.preventDefault();
    },
    onReset (e) {
      e.preventDefault();
      this.form = getEmptyForm();
    }
  }
};

</script>
