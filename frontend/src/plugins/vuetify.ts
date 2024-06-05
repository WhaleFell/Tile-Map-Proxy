/**
 * Vuetify3 Plugin
 */
import { createVuetify, type VuetifyOptions } from "vuetify"
// icons
import { aliases, mdi } from "vuetify/iconsets/mdi"
// Translations provided by Vuetify
import { en, zhHans } from "vuetify/locale"
import { md3 } from "vuetify/blueprints/md3"

import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader

// Misc

// Styles
import "vuetify/styles"
// import "@mdi/font/css/materialdesignicons.css"

/**
 * Vuetify Components
 *
 * @see {@link https://vuetifyjs.com/en/features/treeshaking/}
 */
let vuetifyConfig: VuetifyOptions = {
  // Global configuration
  // https://vuetifyjs.com/en/features/global-configuration/
  /*
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
  */
  // Icon Fonts
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
  // Internationalization (i18n)
  // https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
  locale: {
    locale: "zhHans",
    fallback: "zhHans",
    messages: { zhHans }
  },
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: "light"
  },
  // Blueprint
  // https://vuetifyjs.com/en/features/blueprints/
  blueprint: md3
}

// if (import.meta.env.DEV) {
//   // Disable treeshaking for DEV mode.
//   vuetifyConfig = {
//     components: { components, labsComponents },
//     directives,
//     ...vuetifyConfig
//   }
// }
export default createVuetify(vuetifyConfig)

// Export for test.
// export { components, directives }
