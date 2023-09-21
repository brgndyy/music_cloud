import { keyframes } from "@vanilla-extract/css";

export const softAppear = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export const slideUp = keyframes({
  from: {
    transform: "translateY(100%)",
  },
  to: {
    transform: "translateY(0%)",
  },
});
