import { style } from "@vanilla-extract/css";
import {
  background2_color_var,
  background3_color_var,
  text3_color_var,
} from "./vars.css";

export const user_profile_header_card = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});

export const user_profile_header_container = style({
  width: "75%",
  display: "flex",
  flexDirection: "row",
  padding: "1.5rem",
});

export const avatar_image_container = style({
  margin: "0 3rem",
});

export const avatar_image = style({
  borderRadius: "20rem",
});

export const name_and_description_container = style({});

export const artist_name = style({
  padding: "0.5rem",
  background: background3_color_var,
  color: text3_color_var,
  margin: "1rem 0",
  fontWeight: "bold",
  fontSize: "1.5rem",
});

export const artist_description = style({
  padding: "0.5rem",
  background: background3_color_var,
  color: text3_color_var,
  margin: "1rem 0",
});
