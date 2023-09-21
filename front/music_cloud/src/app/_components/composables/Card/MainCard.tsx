import { PropsWithChildren } from "react";
import { main_card_container } from "@/app/_styles/cards.css";

export default function MainCard(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className={main_card_container}>{children}</div>;
}
