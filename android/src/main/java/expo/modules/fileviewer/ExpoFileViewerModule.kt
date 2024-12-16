package expo.modules.fileviewer

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import java.net.URL

class ExpoFileViewerModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoFileViewer')` in JavaScript.
    Name("ExpoFileViewer")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    AsyncFunction("openFileAsync") { uri: String, viewTag: Number?, promise: Promise ->
      promise.resolve()
    }
  }
}
