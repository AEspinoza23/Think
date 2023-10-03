<template>
  <v-row class="mt-5">
    <v-col cols="auto">
      <v-row class="app-heading-1">Extra Small (size='x-small')</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="x-small"> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="x-small" disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="x-small" outlined> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="x-small" outlined disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="x-small" text> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="x-small" text disabled> Añadir </app-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-row class="app-heading-1">Small (size='small')</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="small"> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="small" disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="small" outlined> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="small" outlined disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="small" text> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="small" text disabled> Añadir </app-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-row class="app-heading-1">Medium (size='medium')</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium"> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium" outlined> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" outlined disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium" text> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" text disabled> Añadir </app-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-row class="app-heading-1">Large (size='large')</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="large"> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="large" disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="large" outlined> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="large" outlined disabled> Añadir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="large" text> Añadir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="large" text disabled> Añadir </app-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-row class="app-heading-1">Label (icon="mdi-share-variant")</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant"> compartir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant" disabled> compartir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant" outlined> compartir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant" outlined disabled> compartir </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant" text> compartir </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn size="medium" icon="mdi-share-variant" text disabled> compartir </app-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <v-row class="app-heading-1">Fab icon (fab small icon="mdi-chevron-right")</v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small> </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small disabled> </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small outlined> </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small outlined disabled> </app-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small text> </app-btn>
        </v-col>
        <v-col cols="auto">
          <app-btn icon="mdi-chevron-right" fab small text disabled> </app-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Buttons'
}
</script>

<style scoped></style>
