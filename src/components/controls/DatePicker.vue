<template>
  <b-form-group :id="`grp${id}`">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="dateMenu"
          :close-on-content-click="false"
          v-model="dateMenu"
          :nudge-right="40"
          :return-value.sync="value"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFormatted"
            :label="label"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker :v-model="value" @input="onControlDateChanged" no-title scrollable>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </b-form-group>
</template>

<script>
import { formatDate } from '../../common/dates';

export default {
  name: 'date-picker',
  props: {
    label: String,
    errorMessage: String,
    value: String,
    id: String
  },
  data () {
    return {
      dateMenu: false
    };
  },
  computed: {
    dateFormatted () {
      return formatDate(this.value);
    }
  },
  methods: {
    onControlDateChanged (date) {
      this.dateMenu = false;
      this.$refs.dateMenu.save(date);
      this.$emit('input', date);
    },
    parseDate (date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
};
</script>
