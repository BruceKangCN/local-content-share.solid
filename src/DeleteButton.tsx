import { createSignal } from "solid-js";
import { del } from "./data/files.ts";
import Button from "./Button.tsx";

interface DeleteButtonProps {
  name: string;
  onDelete?: () => void;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const [pending, setPending] = createSignal(false);
  let form: HTMLFormElement | undefined;

  const delFile = async () => {
    if (!form || pending()) {
      return;
    }

    setPending(true);

    const data = new FormData(form);
    try {
      await del(data);
    } catch (err) {
      console.error({ msg: "upload request failed", err });
      alert("Upload request failed!");
    } finally {
      setPending(false);
      props.onDelete?.();
    }
  };

  return <>
    <form
      method="post"
      ref={form}
      onSubmit={(e) => e.preventDefault()}
    >
      <input name="file" type="hidden" value={props.name} />
      <Button disabled={pending()} onClick={() => delFile()}>
        <span class="i-lucide-trash" un-w="4" un-h="4" un-shrink="0" />
      </Button>
    </form>
  </>;
}
