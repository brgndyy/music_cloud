import { createVar, style } from "@vanilla-extract/css";

export const main_background_color_var = createVar();
export const background_color_var = createVar();
export const banner_background_color_var = createVar();
export const bold_text1_color_var = createVar();
export const text1_color_var = createVar();
export const text2_color_var = createVar();
export const text3_color_var = createVar();
export const text4_color_var = createVar();
export const pale_text_color_var = createVar();
export const pale_text2_color_var = createVar();
export const border_color_var = createVar();
export const background1_color_var = createVar();
export const background2_color_var = createVar();
export const background3_color_var = createVar();
export const button_background_color_var = createVar();
export const button_text_color_var = createVar();
export const likes_color_var = createVar();

export const myStyle = style({
  vars: {
    [main_background_color_var]: "#fff",
    [background_color_var]: "#333",
    [text1_color_var]: "#666",
    [text2_color_var]: "#000",
    [text3_color_var]: "#fff",
    [text4_color_var]: "#1e1e1e",
    [pale_text_color_var]: "#b7b7b7",
    [pale_text2_color_var]: "#b7b7b7",
    [button_background_color_var]: "#fff",
    [button_text_color_var]: "#fff",
    [banner_background_color_var]: "#fff",
    [background1_color_var]: "#fefefe",
    [background2_color_var]: "#e5e5e5",
    [background3_color_var]: "#000",
    [border_color_var]: "#e1e1e1",
    [bold_text1_color_var]: "#999",
    [likes_color_var]: "#d04343",
  },
  selectors: {
    '[data-theme="dark"] &': {
      vars: {
        [main_background_color_var]: "#000",
        [background_color_var]: "#fff",
        [text1_color_var]: "#000",
        [text2_color_var]: "#fff",
        [text3_color_var]: "#fff",
        [text4_color_var]: "#1e1e1e",
        [pale_text_color_var]: "#b7b7b7",
        [pale_text2_color_var]: "#b7b7b7",
        [button_background_color_var]: "#fff",
        [button_text_color_var]: "#fff",
        [banner_background_color_var]: "#fff",
        [background1_color_var]: "#fff",
        [background2_color_var]: "#fff",
        [background3_color_var]: "#000",
        [border_color_var]: "#fff",
        [bold_text1_color_var]: "#fff",
      },
    },
  },
});
