import React from "react";
import {
  post_heading_ul,
  post_heading_list_container,
  post_heading_track_title,
  post_heading_track_likes,
  post_heading_artist_name,
  post_heading_track_time,
  post_heading_tagList_container,
} from "@/app/_styles/music_post.css";
import { myStyle } from "@/app/_styles/vars.css";

export default function HeadingPost() {
  return (
    <>
      <ul className={post_heading_ul}>
        <li className={`${post_heading_list_container} ${myStyle}`}>
          <span className={post_heading_track_title}>TITLE</span>
          <span className={post_heading_track_likes}>LIKES</span>
          <span className={post_heading_artist_name}>ARTIST</span>
          <span className={post_heading_track_time}>TIME</span>
          <span className={post_heading_tagList_container}>TAGS</span>
        </li>
      </ul>
    </>
  );
}
