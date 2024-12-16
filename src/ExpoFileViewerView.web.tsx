import * as React from 'react';

import { ExpoFileViewerViewProps } from './ExpoFileViewer.types';

export default function ExpoFileViewerView(props: ExpoFileViewerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
