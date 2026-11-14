import { createMemo, Errored, For, Loading, refresh } from "solid-js";
import { list } from "./data/files.ts";
import DropOverlay from "./DropOverlay.tsx";
import FileRecord from "./FileRecord.tsx";
import ThemeToggle from "./ThemeToggle.tsx";
import UploadButton from "./UploadButton.tsx";
import "virtual:uno.css";

export default function App() {
  const files = createMemo(() => list());

  // Server functions don't invalidate `files` on their own, so re-ask `list()`
  // after a mutation lands.
  const reloadFiles = () => {
    refresh(files);
  };

  return <>
    <Errored fallback={(err) => <p>{`Error: ${err()}`}</p>}>
      <header
        un-w="full"
        un-max-w="screen-md"
        un-mx="auto"
        un-my="8"
        un-flex="~ row"
        un-gap="2"
        un-items="center"
      >
        <h1 un-font="bold" un-text="3xl emerald-500">Local Content Share</h1>
        <span un-grow />
        <UploadButton onUploaded={reloadFiles} />
        <ThemeToggle />
      </header>
      <DropOverlay onUploaded={reloadFiles} />
      <main
        un-w="full"
        un-max-w="screen-md"
        un-mx="auto"
        un-flex="~ col"
        un-gap="2"
      >
        <Loading fallback={<p>Loading…</p>}>
          <For each={files()}>
            {(file) => <FileRecord name={file} onDelete={reloadFiles} />}
          </For>
        </Loading>
      </main>
    </Errored>
  </>;
}
