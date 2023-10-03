<template>
  <v-img :src="$assets.card" class="rounded-lg">
    <v-row>
      <v-col cols="6" class="d-flex align-end justify-start pl-10">
        <v-row>
          <v-img max-width="42" height="35" :src="$assets.chip"></v-img>
        </v-row>
      </v-col>
      <v-col cols="6" class="d-flex align-end mt-4">
        <v-icon size="65">
          {{ $icons.logoNegative }}
        </v-icon>
      </v-col>
    </v-row>
    <v-row class="mr-5">
      <v-col cols="7">
        <v-row justify="end" class="app-body-large">
          {{ number }}
        </v-row>
        <v-row justify="end" class="app-body-small">
          {{ $t('profile.validUntil') }}:
        </v-row>
        <v-row justify="end" class="app-body-medium">
          {{ month }}/{{ year }}
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="4" class="ml-2 app-body-medium">
        {{ name }}
      </v-col>
      <v-col cols="4" class="mb-2">
        <v-img width="58" height="40" :src="$assets.symbol"></v-img>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: 'CreditCard',
  props: {
    name: { type: String, default: null },
    number: { type: String, default: null },
    type: { type: Number, default: null },
    month: { type: String, default: null },
    year: { type: [Number, String], default: null },
    fullCard: { type: Boolean, default: true }
  },
  data: () => ({}),
  computed: {
    fullName() {
      if (this.name === null || this.name === '') {
        return 'John Doe';
      } else {
        return this.name;
      }
    },
    fullNumber() {
      if (this.number === null || this.number === '') {
        return '#### #### #### ####';
      } else {
        return this.number;
      }
    }
  }
};
</script>
