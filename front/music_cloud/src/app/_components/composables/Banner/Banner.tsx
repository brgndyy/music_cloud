import BannerImage from "../../../_assets/_images/banner_image.jpeg";
import Image from "next/image";
import { banner_container, banner_image } from "@/app/_styles/banner.css";
import { myStyle } from "@/app/_styles/vars.css";

export default function Banner() {
  return (
    <div className={`${banner_container} ${myStyle}`}>
      <Image
        className={`${banner_image} ${myStyle}`}
        src={BannerImage}
        width={200}
        height={200}
        alt="banner_image"
      />
    </div>
  );
}
