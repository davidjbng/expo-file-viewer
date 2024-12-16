package expo.modules.fileviewer

import android.app.ActivityOptions
import android.content.Intent
import android.net.Uri
import android.view.View
import android.view.Window
import androidx.core.view.drawToBitmap
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.toCodedException
import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

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
            var options = ActivityOptions.makeBasic()
            if (viewTag != null) {
                appContext.currentActivity?.window?.addFlags(Window.FEATURE_ACTIVITY_TRANSITIONS)
                val transitionView =
                    appContext.currentActivity?.window?.decorView?.findViewById<View>(viewTag)
                        ?: throw Error("Failed to find transition view")
                val thumbnail = transitionView.drawToBitmap()

//                options = ActivityOptions.makeCustomAnimation(
//                    appContext.currentActivity,
//                    android.R.anim.fade_in,
//                    android.R.anim.fade_out,
//                )
//                options =
//                    ActivityOptions.makeThumbnailScaleUpAnimation(
//                        transitionView,
//                        thumbnail,
//                        0,
//                        0
//                    )

                options = ActivityOptions
                    .makeClipRevealAnimation(
                        transitionView,
                        0,
                        0,
                        transitionView.width,
                        transitionView.height
                    )
//                options = ActivityOptions
//                    .makeScaleUpAnimation(
//                        transitionView,
//                        0,
//                        0,
//                        transitionView.width,
//                        transitionView.height,
//                    )
//                 options = ActivityOptions
//                     .makeSceneTransitionAnimation(
//                         appContext.currentActivity,
//                         transitionView,
//                         "image"
//                     )
            }
            try {
                appContext.throwingActivity.startActivityForResult(
                    intent,
                    REQUEST_CODE,
                    options.toBundle()
                )
                pendingPromise = promise
            } catch (e: Throwable) {
                promise.reject(e.toCodedException())
            }
        }.runOnQueue(Queues.MAIN)
    }
}
