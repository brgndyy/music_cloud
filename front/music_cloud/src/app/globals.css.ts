import { globalStyle } from "@vanilla-extract/css";
import { main_background_color_var } from "./_styles/vars.css";
import {
  progress_bar_ball,
  progress_bar_percent,
  progress_bar_container,
} from "./_styles/progress_bar.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: "0",
  width: "100vw",
  minHeight: "100vh",
  height: "auto",
  overflow: "scroll",
  transition: "all 0.3s ease",
  position: "relative",
  background: main_background_color_var,
});

globalStyle("li", {
  listStyle: "none",
});

globalStyle("ul", {
  padding: "0",
});

globalStyle("h1, h2, h3, p", {
  margin: "0",
  padding: "0",
});

globalStyle("a, a:link, a:visited", {
  textDecoration: "none",
});

globalStyle("input", {
  outline: "none",
});

globalStyle("input[type='range']", {
  WebkitAppearance: "none",
});

globalStyle("::-webkit-slider-thumb", {
  WebkitAppearance: "none",
  background: "#000",
  width: "0",
  height: "0",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginBottom: "0.6rem",
});

globalStyle("input[type='range']:hover::-webkit-slider-thumb", {
  width: "1rem",
  height: "1rem",
  marginTop: "10px",
  borderRadius: "10rem",
  zIndex: "100",
});

globalStyle(`.${progress_bar_container}:hover + .${progress_bar_ball}`, {
  transform: "scale(1.5)",
});

globalStyle("canvas", {
  width: "100%",
  display: "block",
  cursor: "pointer",
});
