import { createSignal } from "solid-js";
import { upload } from "./data/files.ts";
import Button from "./Button.tsx";

interface UploadButtonProps {
  onUploaded?: () => void;
}

export default function UploadButton(props: UploadButtonProps) {
  const [pending, setPending] = createSignal(false);
  let form: HTMLFormElement | undefined;
  let input: HTMLInputElement | undefined;

  const requestUpload = async () => {
    if (!form || !input || pending()) {
      return;
    }

    setPending(true);

    const data = new FormData(form);
    try {
      const { error } = await upload(data);
      if (error !== undefined) {
        console.error({ msg: "upload failed", error });
        alert(`Error: ${error}`);
        return;
      }
    } catch (err) {
      console.error({ msg: "upload request failed", err });
      alert("Upload request failed!");
    } finally {
      input.value = "";
      setPending(false);
      props.onUploaded?.();
    }
  };

  return <>
    <form
      method="post"
      enctype="multipart/form-data"
      ref={form}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        name="file"
        type="file"
        un-hidden="~"
        ref={input}
        onChange={requestUpload}
      />
      <Button disabled={pending()} onClick={() => input!.click()}>
        <span class="i-lucide-upload" un-w="6" un-h="6" un-shrink="0" />
      </Button>
    </form>
  </>;
}
