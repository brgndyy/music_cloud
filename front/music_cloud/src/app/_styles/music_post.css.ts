import { style } from "@vanilla-extract/css";
import { text1_color_var, border_color_var, likes_color_var } from "./vars.css";

export const post_wrapper = style({
  width: "75%",
  margin: "5rem auto",
});

export const music_posts_ul_container = style({
  display: "block",
  width: "100%",
  height: "auto",
  margin: "0",
  padding: "0",
  overflow: "auto",
});

export const post_heading_ul = style({
  display: "block",
  width: "100%",
  height: "auto",
  margin: "0",
  padding: "0",
  overflow: "auto",
});

export const post_heading_list_container = style({
  position: "relative",
  padding: "1rem 0",
  fontSize: "0.7rem",
  fontWeight: "700",
  letterSpacing: "2px",
  opacity: "0.7",
  color: text1_color_var,
  margin: "1rem 0 ",
  display: "flex",
  flexDirection: "row",
});

export const post_heading_track_title = style({
  paddingRight: "2rem",
  paddingLeft: "4rem",
  flex: "1 1 100%",
  maxWidth: "33%",
});

export const post_heading_track_likes = style({
  maxWidth: "12%",
  flex: "1 1 100%",
});

export const post_heading_artist_name = style({
  maxWidth: "10%",
  flex: "1 1 100%",
});
export const post_heading_track_time = style({
  maxWidth: "5%",
  flex: "1 1 100%",
  marginLeft: "10%",
});
export const post_heading_tagList_container = style({
  display: "flex",
  maxWidth: "20%",
  flex: "1 1 100%",
  margin: "0 2.5rem",
});

export const post_list = style({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  alignItems: "center",
  height: "4rem",
  fontSize: "1rem",
  fontWeight: "600",
  letterSpacing: "2px",
  overflow: "hidden",
  cursor: "pointer",
});

export const track_artwork = style({
  position: "absolute",
  top: "8px",
  left: "0",
  width: "3rem",
  height: "3rem",
  padding: "0",
});

export const track_artwork_image = style({
  width: "100%",
  height: "auto",
  display: "block",
  maxWidth: "100%",
});

export const track_border = style({
  position: "absolute",
  bottom: "0",
  width: "100%",
  marginLeft: "4rem",
  border: `0.3px solid ${border_color_var}`,
});

export const track_title = style({
  display: "flex",
  flexDirection: "row",
  maxWidth: "33%",
  maxHeight: "100%",
  flex: "1 1 100%",
  paddingRight: "2rem",
  paddingLeft: "4rem",
});

export const likes_icon = style({
  marginBottom: "3px",
  marginRight: "3px",
});

export const track_likes_count = style({
  flex: "1 1 100%",
  maxWidth: "12%",
  maxHeight: "100%",
  cursor: "auto",
  color: likes_color_var,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

export const track_artist = style({
  maxWidth: "15%",
  maxHeight: "100%",
  flex: "1 1 100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
export const track_time = style({
  maxWidth: "5%",
  flex: "1 1 100%",
  marginLeft: "5%",
});

export const track_tagList = style({
  display: "flex",
  maxWidth: "20%",
  flex: "1 1 100%",
  margin: "0 1.5rem",
  maxHeight: "100%",
  marginBottom: "0.2rem",
});

export const track_tag = style({
  fontSize: "1rem",
  fontWeight: "600",
  display: "inline-flex",
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
  // animation: `0.125s ease-in-out 0s 1 normal forwards running ${hashtag_appear}`,
});

export const track_tag_text = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const music_title = style({
  color: text1_color_var,
  position: "relative",
  transition: "all 0.3s ease",

  "::before": {
    content: "",
    position: "absolute",
    width: "100%",
    height: "1px",
    background: text1_color_var,
    bottom: "0",
    left: "0",
    opacity: "0",
    transition: "opacity 0.3s ease",
  },

  selectors: {
    "&:hover::before": {
      opacity: "1",
    },
  },
});

export const artist_name = style({
  color: text1_color_var,
  position: "relative",
  transition: "all 0.3s ease",

  "::before": {
    content: "",
    position: "absolute",
    width: "100%",
    height: "1px",
    background: text1_color_var,
    bottom: "0",
    left: "0",
    opacity: "0",
    transition: "opacity 0.3s ease",
  },

  selectors: {
    "&:hover::before": {
      opacity: "1",
    },
  },
});

export const canvas_container = style({
  width: "100%",
  opacity: "0.8",
  transition: "all 0.3s ease",
  ":hover": {
    opacity: " 1",
  },
});

export const user_post_canvas_card = style({
  position: "relative",
  height: "60px",
  marginTop: "0.7rem",
  width: "100%",
});

export const user_post_canvas_container = style({
  position: "absolute",
  top: "0",
  left: "5%",
  width: "100%",
  height: "100%",
  cursor: "pointer",
});

export const user_post_initial_canvas = style({
  width: "90%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "3%",
});

export const user_post_canvas = style({
  width: "90%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "3%",
  cursor: "pointer",
  opacity: "0.8",
  transition: "all 0.3s ease",
  ":hover": {
    opacity: " 1",
  },
});
