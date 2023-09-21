import Image from "next/image";
import Link from "next/link";
import { header_container } from "@/app/_styles/header.css";
import { myStyle } from "@/app/_styles/vars.css";
import whiteLogoImage from "../../_assets/_images/white_logo.svg";
import darkLogoImage from "../../_assets/_images/dark_logo.svg";

export default function Header() {
  return (
    <div className={`${header_container} ${myStyle}`}>
      <Link href={"/"}>
        <Image src={darkLogoImage} height={40} width={200} alt="logo" />
      </Link>
    </div>
  );
}
