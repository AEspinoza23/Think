<template>
  <v-container>
    <v-row justify="center">
      <h1>{{ $t('component') }}</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-switch
          v-model="theme"
          class="app-switch"
          hint="Cambia a tema oscuro"
          inset
          label="Vuetify Theme Dark"
          persistent-hint
          @change="changeAppTheme(theme)"
        />
      </v-col>
    </v-row>

    <!--    TEST DIALOG-->
    <v-dialog
      v-model="dialogValue"
      :width="$vuetify.breakpoint.width"
      @click:outside="changeDialogValue"
    >
      <v-card>
        <v-card-text> OPEN DIALOG WHEN ACTION HEADER IS CLICKED DIALOG 1</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="changeDialogValue"> I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-expansion-panels v-model="panels" class="mt-3" multiple>
      <!-- Colors -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <v-row>
            <v-col>
              <div class="white--text app-heading-1">Colors</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <!-- Primary Colors -->
              <app-stylesheet-colors-primary />
              <!-- Primary Degraded Colors -->
              <app-stylesheet-colors-degraded />
              <!-- Secondary Colors -->
              <app-stylesheet-colors-secundary />
              <!-- Sub-Brand Colors -->
              <app-stylesheet-colors-sub-brand />
              <!-- Lights colors -->
              <app-stylesheet-colors-light />
              <!-- Darks colors -->
              <app-stylesheet-colors-dark />
              <!-- Alerts colors -->
              <app-stylesheet-colors-alert />
              <!-- Greys colors -->
              <app-stylesheet-colors-grey />
              <!-- Extra darks colors -->
              <app-stylesheet-colors-extraDark />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Typography -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <v-row>
            <v-col>
              <div class="white--text app-heading-1">Typography</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <app-stylesheet-typography />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Inputs -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <v-row>
            <v-col>
              <div class="white--text app-heading-1">Inputs</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Selects -->
          <v-row>
            <v-col>
              <app-stylesheet-selects />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Buttons -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <v-row>
            <v-col>
              <div class="white--text app-heading-1">Buttons</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <app-stylesheet-buttons />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Shades and cards blur -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Shades and cards blur</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <app-stylesheet-shades class="mt-1" />
          <app-stylesheet-cardsBlur />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Icons SVG -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Icons Svg</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-0">
            <v-col v-for="(icon, index) in $iconsSvg" :key="index" cols="auto" sm="2">
              <v-row justify="center">
                <v-col class="d-flex align-center justify-center">
                  <v-icon class="icon--lg">{{ icon }}</v-icon>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col class="d-flex align-center justify-center">
                  <span>{{ index }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--Icons-->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Icons</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-0">
            <v-col v-for="(icon, index) in $icons" :key="index" cols="auto" sm="2">
              <v-row justify="center">
                <v-col class="d-flex align-center justify-center">
                  <v-icon large>{{ icon }}</v-icon>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col class="d-flex align-center justify-center">
                  <span>{{ index }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--Examples-->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Icons Examples</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="ma-0">
            <v-col>
              <p>
                <v-row align="center" class="mx-0">
                  <v-col>
                    <v-icon class="icon--xs">{{ $iconsSvg.affiliates }}</v-icon>
                    class='icon-xs': 14px de width
                  </v-col>
                </v-row>
                <v-row align="center" class="mx-0">
                  <v-col>
                    <v-icon class="icon--sm">{{ $iconsSvg.affiliates }}</v-icon>
                    class='icon-sm': 18px de width
                  </v-col>
                </v-row>
                <v-row align="center" class="mx-0">
                  <v-col>
                    <v-icon class="icon--md">{{ $iconsSvg.affiliates }}</v-icon>
                    class='icon-md': 20px
                  </v-col>
                </v-row>
                <v-row align="center" class="mx-0">
                  <v-col>
                    <v-icon class="icon--lg">{{ $iconsSvg.affiliates }}</v-icon>
                    class='icon-lg': 24px de width
                  </v-col>
                </v-row>
                <v-row align="center" class="mx-0">
                  <v-col>
                    <v-icon class="icon--xl">{{ $iconsSvg.affiliates }}</v-icon>
                    class='icon-xl': 30px de width
                  </v-col>
                </v-row>
              </p>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- alerts -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Alerts</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-3">
          <app-stylesheet-alerts />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Logo -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <div class="white--text app-heading-1">Logo</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <app-stylesheet-logo />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Menus -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <span class="white--text app-heading-1">Menu</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <app-stylesheet-menu />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--Forms-->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <span class="white--text app-heading-1">Forms</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pt-5">
          <v-row>
            <v-col>
              app-text-field :label='"Dirección"' small
              <app-text-field :label="'Dirección'" :placeholder="'Dirección'" small />
              app-text-field :label='"Dirección"'
              <app-text-field :label="'Dirección'" :placeholder="'Dirección'" />
              app-text-field :label='"Dirección"' large
              <app-text-field :label="'Dirección'" :placeholder="'Dirección'" large />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              app-textarea :label='"Mensaje"'
              <app-textarea :label="'Mensaje'" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              app-search :placeholder='"Buscar Afiliado"' large
              <app-search :placeholder="'Buscar Afiliado'" large />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Cards -->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <span class="white--text app-heading-1">Cards</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-4">
          <app-stylesheet-cards />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--SnackBars-->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <span class="white--text app-heading-1">Flash - SnackBars</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-4">
          <v-row>
            <v-col>
              <v-btn color="success" @click="activeSuccess">Active Flash Success</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="error" @click="activeError">Active Flash Error</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="warning" @click="activeWarning">Active Flash Warning</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="info" @click="activeInfo">Active Flash Info</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!--Ilustraciones-->
      <v-expansion-panel>
        <v-expansion-panel-header class="button-primary">
          <span class="white--text app-heading-1">Ilustraciones</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-4">
          <v-row>
            <v-col v-for="(item, index) in $assets" :key="index" class="text-center">
              <v-img :lazy-src="item" :src="item" height="auto" width="100" />
              {{ index }}
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'default',
  auth: false,
  data() {
    return {
      panels: [],
      theme: false
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      isDarkTheme: 'app/isDark'
    })
  },
  watch: {
    isDarkTheme(val) {
      this.theme = val
    }
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig(
      {
        isBack: false,
        isTitle: true,
        title: 'Components',
        isNotification: false,
        isMenu: false,
        isFilter: false,
        isOptions: true
      },
      true
    )
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      changeAppTheme: 'app/changeAppTheme'
    }),
    activeSuccess() {
      this.$flash({
        message: 'Success',
        color: 'success',
        type: 'success'
      })
    },
    activeError() {
      this.$flash({
        message: 'Error',
        color: 'error',
        type: 'error'
      })
    },
    activeWarning() {
      this.$flash({
        message: 'Warning',
        color: 'warning',
        type: 'warning'
      })
    },
    activeInfo() {
      this.$flash({
        message: 'Info',
        color: 'info',
        type: 'info'
      })
    }
  }
}
</script>
