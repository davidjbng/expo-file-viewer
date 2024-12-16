import { requireNativeModule } from "expo";

declare class ExpoFileViewerModule {
  openFileAsync(uri: string, viewTag?: number): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoFileViewerModule>("ExpoFileViewer");
