<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="dateMenu"
          :close-on-content-click="false"
          v-model="dateMenu"
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
            v-model="dateFormatted"
            :label="label"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker :v-model="date" @input="onControlDateChanged" no-title scrollable>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'date-picker',
  props: {
    onDateSelected: Function,
    label: String,
    errorMessage: String
  },
  data () {
    return {
      date: null,
      dateMenu: false
    };
  },
  computed: {
    dateFormatted () {
      return this.formatDate(this.date);
    }
  },
  methods: {
    onControlDateChanged (date) {
      this.dateMenu = false;
      this.$refs.dateMenu.save(date);
      this.onDateSelected(date);
    },
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
};
</script>
