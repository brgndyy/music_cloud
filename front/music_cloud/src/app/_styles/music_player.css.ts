import { style } from "@vanilla-extract/css";
import { background1_color_var } from "./vars.css";
import { slideUp } from "./animations.css";
import {
  bold_text1_color_var,
  text2_color_var,
  background_color_var,
  text3_color_var,
} from "./vars.css";

export const music_player_container = style({
  position: "fixed",
  left: "0",
  right: "0",
  bottom: "0",
  height: "3.5rem",
  width: "100%",
  zIndex: "100",
  background: background1_color_var,
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 8px",
  transform: "translateY(110%)",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.3rem",
});

export const player_visible = style({
  animation: `${slideUp} 1s ease forwards`,
});

export const player_info = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const image_and_info = style({
  display: "flex",
});

export const track_image = style({});

export const track_info = style({
  display: "flex",
  flexDirection: "column",
  margin: "0 1rem",
  width: "13rem",
});

export const track_title = style({
  color: bold_text1_color_var,
  fontWeight: "bold",
});

export const title = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const track_artist = style({
  color: text2_color_var,
  textAlign: "start",
  fontSize: "0.8rem",
});

export const player_buttons = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const repeat_button = style({
  display: "block",
  fontSize: "1rem",
  lineHeight: "1rem",
  cursor: "pointer",
  marginRight: "1.5rem",
});

export const prev_button = style({
  height: "1.5rem",
  width: "1.5rem",
  margin: "0. 0.5rem",
  cursor: "pointer",
});

export const play_button_div = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  marginRight: "0.5rem",
  border: "unset",
  borderRadius: "50%",
  cursor: "pointer",
  margin: "0.5rem",
  background: background_color_var,
  color: text3_color_var,
});
export const play_button = style({
  marginLeft: "3px",
});

export const pause_button = style({
  // marginLeft: "3px",
});

export const next_button = style({
  height: "1.5rem",
  width: "1.5rem",
  margin: "0. 0.5rem",
  cursor: "pointer",
});

export const shuffle_button = style({
  display: "block",
  fontSize: "1rem",
  lineHeight: "1rem",
  cursor: "pointer",
  marginLeft: "1.5rem",
  transition: "all 0.3s ease",
  color: "#555",
  opacity: "0.8",
});

export const shuffle_active = style({
  color: "#000",
  opacity: "1",
  fontWeight: "800",
});

export const player_actions = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "1rem",
});

export const volume_icon = style({
  fontSize: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const volume_slider_container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "1rem",
  position: "relative",
});

export const volume_slider_rail = style({
  width: "100%",
  height: "0.2rem",
  zIndex: "-10",
  borderRadius: "2px",
  background: "#fff",
  position: "absolute",
  top: "calc(50% - 2px)",
});

export const volume_slider_fill_track = style({
  height: "0.2rem",
  borderRadius: "2px",
  background: "#000",
  position: "absolute",
  top: "calc(50% - 2px)",
  left: "0",
});

export const volume_input = style({
  width: "100%",
  height: "3rem",
  background: "transparent",
  margin: "0",
  cursor: "pointer",
});
