<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="4" md="6">
          <app-select :items="items" :label="'dropdown small'" small />
        </v-col>
        <v-col cols="12" lg="4" md="6">
          <app-select :items="items" :label="'dropdown medium'" medium />
        </v-col>
        <v-col cols="12" lg="4" md="6">
          <app-select :items="items" :label="'dropdown large'" large />
        </v-col>
      </v-row>

      <!-- check box, radio buttons, Switch -->
      <v-row align="center" justify="center">
        <v-col cols="4">
          <div>checkbox</div>
          not check
          <app-checkbox :value="check" />
          check
          <app-checkbox :value="checkTrue" />
          read-only
          <app-checkbox :value="check" read-only />
          disabled
          <app-checkbox disabled />
        </v-col>
        <v-col cols="4">
          <div>Radio</div>
          <v-radio-group v-model="radioGroup">
            <app-radio
              v-for="n in 2"
              :key="n"
              :label="`Radio ${n}`"
              :value="n"
              @change="radioGroup = n"
            />
            <app-radio :label="`Radio 3`" :value="3" readonly />
            <app-radio :label="`Radio ${4}`" disabled />
          </v-radio-group>
        </v-col>
        <v-col cols="4">
          <div>Conmutador</div>
          <app-switch :value="switch1" />
          <app-switch :value="switch2" disabled />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Selects',
  data() {
    return {
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ],
      check: false,
      checkTrue: true,
      radioGroup: 1,
      switch1: true,
      switch2: false
    }
  }
}
</script>

<style scoped></style>
