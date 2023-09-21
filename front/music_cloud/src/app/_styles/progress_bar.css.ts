import { style } from "@vanilla-extract/css";
import {
  background2_color_var,
  background3_color_var,
  text3_color_var,
} from "./vars.css";

export const progress_bar_wrapper = style({
  width: "100%",
  position: "absolute",
  top: "-2px",
  left: "0",
  cursor: "pointer",
  zIndex: "120",
  height: "0.2rem",
  background: background2_color_var,
});

export const progress_bar_container = style({
  height: "1.5rem",
  padding: "1rem 0",
  position: "relative",
  bottom: "1.8rem",
});

export const progress_bar_ball = style({
  width: "1rem",
  height: "1rem",
  position: "absolute",
  top: "22px",
  borderRadius: "50%",
  cursor: "pointer",
  marginLeft: "-6px",
  background: "#000",
  transform: "scale(0)",
  transition: "all 0.3s ease",
  selectors: {
    [`${progress_bar_container}:hover &`]: {
      transform: "scale(1)",
    },
  },
});

export const progress_bar_percent = style({
  height: "0.2rem",
  background: background3_color_var,
  position: "absolute",
  bottom: "0",
});

export const progress_time_container = style({
  position: "absolute",
  top: "0",
  fontSize: "0.7rem",
  background: background3_color_var,
  color: text3_color_var,
  borderRadius: "0.5rem",
  padding: "0.2rem",
  transition: "all 0.3s ease",
  opacity: "0",
  selectors: {
    [`${progress_bar_container}:hover &`]: {
      opacity: "1",
    },
  },
});
