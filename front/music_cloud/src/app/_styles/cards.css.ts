import { style } from "@vanilla-extract/css";
import { softAppear } from "./animations.css";

export const main_card_container = style({
  width: "100%",
  height: "100%",
  margin: "0px auto",
  animation: `${softAppear} 0.3s ease-in forwards`,
});

export const content_card_container = style({
  width: "100%",
  height: "auto",
  minHeight: "100%",
  paddingTop: "3.5rem",
  paddingBottom: "4rem",
});

export const footer_card_container = style({
  width: "100%",
  height: "3.5rem",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "10",
  position: "absolute",
  bottom: "0",
});

export const user_profile_card_container = style({
  width: "75%",
  margin: "auto",
});
