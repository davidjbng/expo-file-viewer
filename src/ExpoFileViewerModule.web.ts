import { registerWebModule, NativeModule } from 'expo';

import { ExpoFileViewerModuleEvents } from './ExpoFileViewer.types';

class ExpoFileViewerModule extends NativeModule<ExpoFileViewerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoFileViewerModule);
