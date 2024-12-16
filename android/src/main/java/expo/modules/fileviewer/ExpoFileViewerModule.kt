package expo.modules.fileviewer

import android.content.Intent
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.toCodedException

private const val REQUEST_CODE = 43

class ExpoFileViewerModule : Module() {
  private var pendingPromise: Promise? = null
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
        flags = Intent.FLAG_GRANT_READ_URI_PERMISSION
      }
      val packageManager = appContext.reactContext?.packageManager ?: throw Error("Did not find packageManager from react context")

      if (intent.resolveActivity(packageManager) != null) {
        try {
          appContext.throwingActivity.startActivityForResult(intent, REQUEST_CODE)
          pendingPromise = promise
        } catch (e: Throwable) {
          promise.reject(e.toCodedException())
        }
      }
      promise.resolve()
    }
  }
}