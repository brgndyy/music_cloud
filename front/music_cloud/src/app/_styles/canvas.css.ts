import { style } from "@vanilla-extract/css";

export const canvas_container = style({
  position: "absolute",
  top: "0%",
  left: "30%",
  opacity: "0.8",
  transition: "all 0.3s ease",
  ":hover": {
    opacity: " 1",
  },
});
