import { style } from "@vanilla-extract/css";
import { pale_text_color_var, pale_text2_color_var } from "./vars.css";
import { text4_color_var } from "./vars.css";

export const user_posts_container = style({});

export const user_post_item_container = style({
  display: "flex",
  margin: "1rem 0",
});

export const artwork_container = style({});

export const artwork_image = style({});

export const info_and_canvas_wrapper = style({
  width: "100%",
});

export const song_info_container = style({
  display: "flex",
  alignItems: "center",
  marginBottom: "1.7rem",
});

export const artistName_and_title_container = style({
  width: "70%",
});

export const artist_name = style({});

export const song_title = style({
  color: text4_color_var,
  position: "relative",
  transition: "all 0.3s ease",

  "::before": {
    content: "",
    position: "absolute",
    width: "100%",
    height: "1px",
    background: text4_color_var,
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

export const created_at_and_likes_container = style({});

export const created_at = style({
  color: pale_text_color_var,
});

export const likes = style({});

export const playCount_and_comment_container = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginRight: "4rem",
  color: pale_text2_color_var,
  fontSize: "0.8rem",
});

export const playCountNum = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const play_icon = style({
  marginBottom: "3px",
  fontSize: "0.7rem",
  marginRight: "3px",
});

export const comment = style({
  marginLeft: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const comment_icon = style({
  marginRight: "3px",
});
