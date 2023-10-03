<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card card my-2">
    <v-card-title>
      <span class="app-body-large title--text">
        {{ $t('profile.yourGift') }}
      </span>
    </v-card-title>
    <v-card-text>
      <profile-balance-giftcard-card-credit-card
        :type="type"
        :name="name"
        :number="number"
        :month="month"
        :year="year"
      />
      <v-row class="mt-0">
        <v-col class="pb-0">
          <app-text-field
            :label="$t('profile.import')"
            :placeholder="'40'"
            :type="'number'"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Form from '~/mixins/form'
export default {
  name: 'Card',
  mixins: [Form],
  data:() => ({
    type: 1,
    name: 'Nombre Legal de Usuario',
    number: '4111 1111 1111 1111',
    month: '12',
    year: '22'
  })
}
</script>