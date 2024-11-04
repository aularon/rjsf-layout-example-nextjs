import type { NextPage } from "next";
import SongForm from "./SongForm";
import SongFormLayout from "./SongFormLayout";

export const dynamic = "force-dynamic";

const SongAddPage: NextPage = () => {
  return (
    <div className="container max-w-[960px] mx-auto pt-5">
      <SongForm layout={SongFormLayout} />
    </div>
  );
};

export default SongAddPage;
