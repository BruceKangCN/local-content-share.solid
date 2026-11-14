import { createSignal, onSettled, Show } from "solid-js";
import { upload } from "./data/files.ts";

interface DropOverlayProps {
  onUploaded?: () => void;
}

export default function DropOverlay(props: DropOverlayProps) {
  const [active, setActive] = createSignal(false);
  const [pending, setPending] = createSignal(false);

  const uploadFiles = async (files: FileList) => {
    setPending(true);

    const data = new FormData();
    for (const file of files) {
      data.append("file", file);
    }

    try {
      const { error } = await upload(data);
      if (error) {
        console.error({ msg: "upload failed", error });
        alert(`Error: ${error}`);
      }
    } catch (err) {
      console.error({ msg: "upload request failed", err });
      alert("Upload request failed!");
    } finally {
      setPending(false);
      props.onUploaded?.();
    }
  };

  const onDragOver = (event: DragEvent) => {
    if (!includeFile(event)) {
      return;
    }
    // Required to mark the page as a drop target; without it drop never fires.
    event.preventDefault();
    // dragover repeats while the file is over the page, so it reveals the mask
    // and restores it after a dragleave.
    setActive(!pending());
    event.dataTransfer!.dropEffect = pending() ? "none" : "copy";
  };

  const onDragLeave = (event: DragEvent) => {
    // `dragleave` triggers during element transitions. Only deactivating when
    // leaving window by checking `relatedTarget`. It's `null` when leaving
    // window.
    if (event.relatedTarget === null) {
      setActive(false);
    }
  };

  const onDrop = (event: DragEvent) => {
    if (!includeFile(event)) {
      return;
    }
    // Stop the browser from opening the dropped file.
    event.preventDefault();
    setActive(false);
    if (!pending()) {
      void uploadFiles(event.dataTransfer!.files);
    }
  };

  onSettled(() => {
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  });

  return <>
    <Show when={active()}>
      <div
        un-fixed
        un-inset="0"
        un-z="50"
        un-flex="~"
        un-items="center"
        un-justify="center"
        un-bg="zinc-950/40"
        un-backdrop="blur-sm"
        un-pointer-events="none"
      >
        <div
          un-flex="~ col"
          un-items="center"
          un-gap="2"
          un-p="12"
          un-rounded="3xl"
          un-border="2 dashed white/70"
          un-text="white"
        >
          <span class="i-lucide-upload" un-w="10" un-h="10" un-shrink="0" />
          <span un-text="lg" un-font="medium">Drop files to upload</span>
        </div>
      </div>
    </Show>
  </>;
}

function includeFile(event: DragEvent) {
  return event.dataTransfer?.types.includes("Files") ?? false;
}
