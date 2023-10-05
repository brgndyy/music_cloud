import Image from "next/image";
import Link from "next/link";
import {
  header_container,
  auth_container,
  sign_up_container,
  sign_up_icon,
  login_container,
  login_icon,
  link,
} from "@/app/_styles/header.css";
import { myStyle } from "@/app/_styles/vars.css";
import whiteLogoImage from "../../_assets/_images/white_logo.svg";
import darkLogoImage from "../../_assets/_images/dark_logo.svg";
import { GoPerson } from "react-icons/go";
import { IoMdCreate } from "react-icons/io";

export default function Header() {
  return (
    <>
      <div className={`${header_container} ${myStyle}`}>
        <Link href={"/"}>
          <Image src={darkLogoImage} height={40} width={200} alt="logo" />
        </Link>

        <div className={`${auth_container} ${myStyle}`}>
          <div className={sign_up_container}>
            <IoMdCreate className={sign_up_icon} />
            <Link href={"/signup"} className ={`${link} ${myStyle}`}>회원가입</Link>
          </div>
          <div className={login_container}>
            <GoPerson className={login_icon} />
            <Link href={"/login"} className={`${link} ${myStyle}`}>로그인</Link>
          </div>
        </div>
      </div>
    </>
  );
}
