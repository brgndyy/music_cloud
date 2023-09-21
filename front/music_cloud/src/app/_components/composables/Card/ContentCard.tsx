import { PropsWithChildren } from "react";
import { content_card_container } from "@/app/_styles/cards.css";

export default function ContentCard(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className={content_card_container}>{children}</div>;
}
