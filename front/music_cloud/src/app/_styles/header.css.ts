import { style } from "@vanilla-extract/css";
import { softAppear } from "./animations.css";
import { background_color_var } from "./vars.css";

export const header_container = style({
  top: "0",
  left: "0",
  right: "0",
  position: "fixed",
  margin: "auto",
  zIndex: "700",
  width: "100%",
  height: "3.5rem",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  animation: `${softAppear} 0.3s ease-in forwards`,
  transition: "all 0.3s ease",
  background: background_color_var,
});
