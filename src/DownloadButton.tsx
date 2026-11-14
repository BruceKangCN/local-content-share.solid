import { createSignal } from "solid-js";
import { download } from "./data/files.ts";
import Button from "./Button.tsx";

interface DownloadButtonProps {
  name: string;
}

export default function DownloadButton(props: DownloadButtonProps) {
  const [pending, setPending] = createSignal(false);
  let form: HTMLFormElement | undefined;

  const downloadFile = async () => {
    if (!form || pending()) {
      return;
    }

    setPending(true);

    const data = new FormData(form);
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
    <form
      method="post"
      ref={form}
      onSubmit={(e) => e.preventDefault()}
    >
      <input name="file" type="hidden" value={props.name} />
      <Button disabled={pending()} onClick={() => downloadFile()}>
        <span class="i-lucide-download" un-w="4" un-h="4" un-shrink="0" />
      </Button>
    </form>
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
