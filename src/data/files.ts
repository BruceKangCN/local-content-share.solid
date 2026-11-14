"use server";

import { existsSync } from "node:fs";
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

const filesDir = join(process.cwd(), "files");

export async function list(): Promise<string[]> {
  return await readdir(filesDir);
}

interface UploadResult {
  error?: string;
}

export async function upload(form: FormData): Promise<UploadResult> {
  for (const value of form.values()) {
    if (typeof value === "string") {
      continue;
    }
    const filename = value.name;
    const path = join(filesDir, filename);
    if (existsSync(path)) {
      const error = `file ${filename} already exists`;
      return { error };
    }
    await writeFile(path, new Uint8Array(await value.arrayBuffer()));
  }
  return {};
}

export async function download(form: FormData): Promise<File | null> {
  const name = form.get("file");
  if (!name || typeof name !== "string") {
    return null;
  }
  const path = join(filesDir, name);
  if (!existsSync(path)) {
    return null;
  }
  return new File([await readFile(path)], name);
}

export async function del(form: FormData): Promise<void> {
  const name = form.get("file");
  if (!name || typeof name !== "string") {
    return;
  }
  const path = join(filesDir, name);
  if (!existsSync(path)) {
    return;
  }
  await unlink(path);
}
