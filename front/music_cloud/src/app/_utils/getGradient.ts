import * as Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";

export const getGradient = async (avatarImage: string) => {
  let gradientStyle = "";

  const palette: Palette = await Vibrant.from(
    `/Users/brgndy/Library/Mobile Documents/com~apple~CloudDocs/Desktop/programming/music_cloud/front/music_cloud/public${avatarImage}`
  ).getPalette();

  if (palette && palette.Vibrant && palette.Muted) {
    let startColor = palette.LightVibrant
      ? palette.LightVibrant.getRgb()
      : palette.Vibrant.getRgb();
    let endColor = palette.DarkVibrant
      ? palette.DarkVibrant.getRgb()
      : palette.Muted.getRgb();

    gradientStyle = `linear-gradient(to right, rgb(${startColor.join(
      ", "
    )}), rgb(${endColor.join(", ")}))`;
  }

  return gradientStyle;
};
