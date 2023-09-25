import { PropsWithChildren } from "react";
import { user_profile_card_container } from "@/app/_styles/cards.css";

export default function UserProfileCard(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className={user_profile_card_container}>{children}</div>;
}
