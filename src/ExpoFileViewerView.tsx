import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoFileViewerViewProps } from './ExpoFileViewer.types';

const NativeView: React.ComponentType<ExpoFileViewerViewProps> =
  requireNativeView('ExpoFileViewer');

export default function ExpoFileViewerView(props: ExpoFileViewerViewProps) {
  return <NativeView {...props} />;
}
