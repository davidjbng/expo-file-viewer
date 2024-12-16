package expo.modules.fileviewer

import android.content.Intent
import android.net.Uri
import androidx.core.content.ContextCompat.startActivity
import androidx.core.view.ContentInfoCompat.Flags
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

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
    AsyncFunction("openFileAsync") { uri: String, viewTag: Int?, promise: Promise ->
      val parsedUri = Uri.parse(uri)
      val intent = Intent(Intent.ACTION_VIEW).apply {
        data = parsedUri
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      val packageManager = appContext.reactContext?.packageManager ?: throw Error("Did not find packageManager from react context")
      if (intent.resolveActivity(packageManager) != null) {
        appContext.currentActivity?.startActivity(intent) ?: throw Error("Did not find currentActivity")
      }
      promise.resolve()
    }
  }
}
