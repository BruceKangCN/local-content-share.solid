import DeleteButton from "./DeleteButton";
import DownloadButton from "./DownloadButton";

interface FileRecordProps {
  name: string;
  onDelete?: () => void;
}

export default function FileRecord(props: FileRecordProps) {
  return <>
    <div
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
      // un-cursor="pointer"
    >
      <span>{props.name}</span>
      <span un-grow />
      <DownloadButton name={props.name} />
      <DeleteButton name={props.name} onDelete={props.onDelete} />
    </div>
  </>;
}
