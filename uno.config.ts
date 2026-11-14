import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetWebFonts,
  presetIcons,
  presetAttributify,
  transformerVariantGroup,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography(),
    presetWebFonts(),
    presetIcons(),
    presetAttributify({
      prefix: "un-",
      prefixedOnly: true,
    }),
  ],
  transformers: [transformerVariantGroup(), transformerAttributifyJsx()],
});
