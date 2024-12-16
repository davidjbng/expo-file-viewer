import { NativeModule, requireNativeModule } from 'expo';

import { ExpoFileViewerModuleEvents } from './ExpoFileViewer.types';

declare class ExpoFileViewerModule extends NativeModule<ExpoFileViewerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoFileViewerModule>('ExpoFileViewer');
