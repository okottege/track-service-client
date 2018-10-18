<template>
  <b-form-group :id="`grp${id}`" :label="label" :label-for="id">
    <b-form-input
      :id="id"
      type="text"
      v-model="value"
      :state="state"
      @input="onInputChanged" />
    <div v-if="state === false">
      <span class="error-message">{{errorMessage}}</span>
    </div>
  </b-form-group>
</template>
<script>
export default {
  name: 'form-text-box',
  props: {
    id: String,
    label: String,
    errorMessage: String,
    value: String,
    state: Boolean
  },
  methods: {
    onInputChanged (text) {
      this.$emit('input', text);
    }
  }
};
</script>
<style scoped>
.error-message {
  color: #dc3545;
  padding-top: 10px;
  font-size: 0.85rem;
}
</style>
