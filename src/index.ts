// Reexport the native module. On web, it will be resolved to ExpoFileViewerModule.web.ts
// and on native platforms to ExpoFileViewerModule.ts
import FileViewer from "./ExpoFileViewerModule";

export type FileViewerOptions = {
  viewTag?: number;
};

export function openFileAsync(
  uri: string,
  { viewTag }: FileViewerOptions = {}
): Promise<string> {
  return FileViewer.openFileAsync(uri, viewTag);
}
