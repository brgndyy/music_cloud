import Link from "next/link";
import Image from "next/image";
import {
  music_title,
  post_list,
  artist_name,
  track_artwork,
  track_artwork_image,
  track_border,
  track_title,
  track_artist,
  track_time,
  track_tagList,
  track_tag,
  track_tag_text,
  track_likes_count,
  likes_icon,
} from "@/app/_styles/music_post.css";
import { myStyle } from "@/app/_styles/vars.css";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import { formatTime } from "@/app/_utils/formatTime";
import { AiFillHeart } from "react-icons/ai";

type MusicPostPropsItemType = {
  music: MusicPostItemType;
  selectSongHandler: (music: MusicPostItemType) => void;
};

export default function PostItem({
  music,
  selectSongHandler,
}: MusicPostPropsItemType) {
  const { artistInfo, title, time, tagList, image, likesCount } = music;
  const formattedTime = formatTime(time);
  const { artistName } = artistInfo;

  return (
    <>
      <li className={post_list} onClick={() => selectSongHandler(music)}>
        <span className={track_artwork}>
          <Image
            className={image}
            src={image}
            width={50}
            height={50}
            alt="song_image"
          />
        </span>
        <div className={`${track_border} ${myStyle}`}></div>
        <span className={track_title}>
          <Link
            href={`/@${artistName}/${title}`}
            className={`${music_title} ${myStyle}`}
          >
            {title}
          </Link>
        </span>
        <span className={`${track_likes_count} ${myStyle}`}>
          <AiFillHeart className={likes_icon} />

          {likesCount}
        </span>

        <span className={track_artist}>
          <Link
            href={`/@${artistName}`}
            className={`${artist_name} ${myStyle}`}
          >
            {artistName}
          </Link>
        </span>

        <span className={track_time}>{formattedTime}</span>
        <span className={track_tagList}>
          {tagList.slice(0, 2).map((tag, key) => {
            return (
              <span className={track_tag} key={key}>
                <span className={track_tag_text}>{tag}</span>
              </span>
            );
          })}
        </span>
      </li>
    </>
  );
}
