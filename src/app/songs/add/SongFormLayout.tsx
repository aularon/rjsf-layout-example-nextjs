"use client";
import type { TypedField } from "rjsf-layout";
import type { genres, schema } from "./song.schema";
import { MicRounded, MusicNote, Note } from "@material-ui/icons";

const banners: Partial<Record<(typeof genres)[number], string>> = {
  Jazz: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Jazz_Track_banner.jpg/1197px-Jazz_Track_banner.jpg",
  Rock: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Rock_portal_banner.jpg/1200px-Rock_portal_banner.jpg",
};
const SongFormLayout: TypedField<typeof schema> = ({
  Title,
  Genre,
  Participations,
  $genre,
}) => {
  return (
    <div
      className="flex flex-col gap-2 "
      style={{
        paddingTop: "200px",
        backgroundRepeat: "no-repeat",
        ...($genre && banners[$genre]
          ? {
              backgroundImage: $genre && `url('${banners[$genre]}')`,
            }
          : {}),
      }}
    >
      <Title />
      <Genre label="Genre" />
      <Participations label="Made by">
        {({ Name, Role, $role }) => (
          <div className="flex flex-row gap-2">
            <Name label="Participant name" />
            <div style={{ width: "20em" }}>
              <Role label="Choose a role" />
            </div>
            {$role === "Composer" ? (
              <MusicNote />
            ) : $role === "Lyricist" ? (
              <Note />
            ) : $role === "Singer" ? (
              <MicRounded />
            ) : null}
          </div>
        )}
      </Participations>
    </div>
  );
};

export default SongFormLayout;
