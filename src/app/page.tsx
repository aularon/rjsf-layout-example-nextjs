import TODOList from "@/components/TODOList";
import UntypedTODOList from "@/components/UntypedTODOList";

export default function Home() {
  return (
    <main
      style={{
        padding: "10px",
      }}
    >
      <TODOList />
      {/* <UntypedTODOList /> */}
    </main>
  );
}
