import { createSignal } from "solid-js";
import { download } from "./data/files.ts";
import DeleteButton from "./DeleteButton.tsx";

interface FileRecordProps {
  name: string;
  onDelete?: () => void;
}

export default function FileRecord(props: FileRecordProps) {
  const [pending, setPending] = createSignal(false);

  const downloadFile = async () => {
    if (pending()) {
      return;
    }

    setPending(true);

    const data = new FormData();
    data.append("file", props.name);
    try {
      const file = await download(data);
      if (!file) {
        return;
      }
      saveFile(file);
    } catch (err) {
      console.error({ msg: "download request failed", err });
      alert("Download request failed!");
    } finally {
      setPending(false);
    }
  };

  return <>
    <div
      onClick={downloadFile}
      un-p="2"
      un-flex="~ row"
      un-items="center"
      un-gap="2"
      un-rounded="2xl"
      un-border="~ zinc-300 dark:zinc-600"
      un-bg="white hover:slate-50 dark:(slate-700 hover:slate-600)"
      un-text="zinc-600 hover:indigo-600 dark:(zinc-300 hover:indigo-400)"
      un-ring="focus-visible:(2 indigo-500/40 dark:indigo-400/40)"
      un-transition="colors"
      un-cursor="pointer"
    >
      <span>{props.name}</span>
      <span un-grow />
      <DeleteButton name={props.name} onDelete={props.onDelete} />
    </div>
  </>;
}

function saveFile(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
}
