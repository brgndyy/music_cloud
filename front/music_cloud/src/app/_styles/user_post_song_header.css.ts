import { style } from "@vanilla-extract/css";
import {
  text3_color_var,
  background3_color_var,
  pale_text_color_var,
} from "./vars.css";

export const post_song_header_card = style({
  width: "75%",
  margin: "auto",
  padding: "1rem",
});

export const post_song_header_container = style({
  display: "flex",
  marginBottom: "1rem",
  position: "relative",
});

export const music_info_card = style({
  minWidth: "70%",
});

export const music_info_container = style({
  display: "flex",
});

export const title_and_artist_name_container = style({});

export const song_title = style({
  color: text3_color_var,
  background: background3_color_var,
  marginBottom: "0.5rem",
});

export const artist_name_container = style({
  display: "flex",
});

export const artist_name = style({
  color: text3_color_var,
  background: background3_color_var,
});

export const canvas_container = style({
  marginTop: "1rem",
  width: "100%",
});

export const created_at_tag_list_container = style({
  margin: "0 7rem",
});

export const created_at = style({
  color: pale_text_color_var,
  marginTop: "0.5rem",
});

export const tag_list_container = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const post_tag = style({
  fontSize: "1rem",
  fontWeight: "600",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  height: "2rem",
  borderRadius: "1rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  background: "#000",
  color: "#fff",
  transition: "all 0.125s ease-in 0s",
  cursor: "pointer",
  marginLeft: "0.75rem",
  minWidth: "5rem",
  overflow: "hidden",
});

export const post_tag_text = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const play_icon = style({});

export const artwork_image_container = style({});

export const artwork_image = style({
  objectFit: "cover",
  position: "absolute",
  right: "0",
});
