// Reexport the native module. On web, it will be resolved to ExpoFileViewerModule.web.ts
// and on native platforms to ExpoFileViewerModule.ts
export { default } from './ExpoFileViewerModule';
export { default as ExpoFileViewerView } from './ExpoFileViewerView';
export * from  './ExpoFileViewer.types';
