import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno({
      variablePrefix: 't-',
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
      }
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|ts|mdx?|astro|elm|php|phtml|html)($|\?)/]
    },
  },
})
