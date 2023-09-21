import { PropsWithChildren } from "react";
import { footer_card_container } from "@/app/_styles/cards.css";

export default function FooterCard(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className={footer_card_container}>{children}</div>;
}
