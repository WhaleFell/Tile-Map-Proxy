// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss"

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      customizations: {
        customize(props) {
          props.width = "2em"
          props.height = "2em"
          return props
        }
      }
    })
  ],
  theme: {
    // ...
    // screen: {
    //   sm: { max: "640px", min: "0px" },
    //   md: { max: "768px", min: "640px" },
    //   lg: { max: "1024px", min: "768px" },
    //   xl: { max: "1280px", min: "1024px" },
    //   "2xl": { min: "1280px" }
    // },
    breakpoints: {
      ssm: "0px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1280px"
    }
  }
})
