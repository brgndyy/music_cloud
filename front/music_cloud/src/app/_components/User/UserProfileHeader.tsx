"use client";
import {
  user_profile_header_card,
  user_profile_header_container,
  avatar_image_container,
  avatar_image,
  name_and_description_container,
  artist_name,
  artist_description,
} from "@/app/_styles/user_profile_header.css";
import Image from "next/image";
import { myStyle } from "@/app/_styles/vars.css";

type UserProfileHeaderType = {
  artistName: string;
  avatarImage: string;
  artistDescription?: string;
  gradientColor?: string;
};

export default function UserProfileHeader({
  artistName,
  avatarImage,
  artistDescription,
  gradientColor,
}: UserProfileHeaderType) {
  return (
    <>
      <div className={user_profile_header_card}>
        <div
          className={`${user_profile_header_container} ${myStyle}`}
          style={{
            background: gradientColor,
          }}
        >
          <div className={avatar_image_container}>
            <Image
              src={avatarImage}
              width={200}
              height={200}
              alt="avatar_image"
              className={avatar_image}
            />
          </div>

          <div className={name_and_description_container}>
            <div className={`${artist_name} ${myStyle}`}>{artistName}</div>
            <div className={`${artist_description} ${myStyle}`}>
              {artistDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
