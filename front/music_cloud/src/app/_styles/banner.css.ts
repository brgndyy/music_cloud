import { style } from "@vanilla-extract/css";
import { spin } from "./animations.css";
import { banner_background_color_var } from "./vars.css";

export const banner_container = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: banner_background_color_var,
  marginTop: "1rem",
});

export const banner_image = style({
  objectFit: "cover",
  animation: `${spin} 20s linear infinite`,
  background: banner_background_color_var,
});
