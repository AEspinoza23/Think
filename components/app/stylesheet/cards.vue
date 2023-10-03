<template>
  <div>
    <v-row class="app-heading-1 mt-3">Cards</v-row>
    <v-row class="mt-1" justify="space-around">
      <!-- Offer card -->
      <v-col cols="auto">
        <div class="app-body-large-bold">Card Offer Small</div>
        <app-cardOffer :header="'Titulo'" color="broker" small />
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Card Offer Default</div>
        <app-cardOffer :header="'Titulo'" color="broker" />
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Card Offer Disabled</div>
        <app-cardOffer :header="'Titulo'" color="broker" disabled />
      </v-col>
      <!-- Rate card -->
      <v-col cols="auto">
        <div class="app-body-large-bold">Card Rate Small</div>
        <app-cardRate :header="'Titulo'" color="broker" small />
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Card Rate Default</div>
        <app-cardRate :header="'Titulo'" color="broker" />
      </v-col>
      <!-- Mini card -->
      <v-col cols="auto">
        <div class="app-body-large-bold">Mini Card</div>
        <app-miniCard />
      </v-col>
    </v-row>
    <!-- rate headers -->
    <v-row class="app-heading-1 mt-5">Rate header</v-row>
    <v-row>
      <v-col cols="auto">
        <div class="app-body-large-bold">Broker</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="broker" small title="broker" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="broker" title="Broker"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Travel</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="travel" small title="Travel" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="travel" title="Travel"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Security</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="security" small title="Security" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="security" title="Security"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Mobile</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="mobile" small title="Mobile" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="mobile" title="Mobile"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Data</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="data" small title="Data" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="data" title="Data"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Energy</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="energy" small title="Energy" />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="energy" title="Energy"</div>
      </v-col>
      <v-col cols="auto">
        <div class="app-body-large-bold">Consulting</div>
        <v-card max-height="304" max-width="163px">
          <v-img height="80px" width="163"></v-img>
          <app-headerRate color="consulting" small title="Cons." />
        </v-card>
        <div class="app-body-medium-bold mt-2">color="consulting" title="Cons."</div>
      </v-col>
    </v-row>
  </div>
</template>
