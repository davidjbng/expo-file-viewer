import { useAssets, type Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { openFileAsync } from "expo-file-viewer";
import { useRef } from "react";
import {
  Alert,
  Button,
  findNodeHandle,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function App() {
  const imageViewRef = useRef<Image>(null);
  const pdfViewRef = useRef<Button>(null);
  const [assets, error] = useAssets([
    require("./assets/dummy.pdf"),
    require("./assets/kitten.jpg"),
  ]);
  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!assets) {
    return <Text>Loading...</Text>;
  }

  const pdf = assets.at(0)!;
  const image = assets.at(1)!;

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 24 }}>Expo File Viewer Example</Text>
        <View style={{ marginTop: 30, gap: 20 }}>
          <View style={{ gap: 10, alignItems: "flex-start" }}>
            <Text>{pdf.localUri}</Text>
            <Button
              ref={pdfViewRef}
              title="Open PDF"
              onPress={() => {
                const viewTag = pdfViewRef.current
                  ? findNodeHandle(pdfViewRef.current)
                  : undefined;

                getFileUri(pdf).then((uri) => {
                  console.log("Opening PDF", uri);
                  openFileAsync(uri, { viewTag }).catch((e) =>
                    Alert.alert("Error", e.message)
                  );
                });
              }}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text>{image.localUri}</Text>
            <Pressable
              ref={imageViewRef}
              onPress={() => {
                const viewTag = imageViewRef.current
                  ? findNodeHandle(imageViewRef.current)
                  : undefined;

                getFileUri(image).then((uri) => {
                  console.log("Opening image", uri);
                  openFileAsync(uri, { viewTag }).catch((e) =>
                    Alert.alert("Error", e.message)
                  );
                });
              }}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "royalblue",
              }}
            >
              <Image
                source={{ uri: image.localUri! }}
                style={{
                  borderRadius: 5,
                  flex: 1,
                  height: 200,
                  objectFit: "cover",
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

async function getFileUri(asset: Asset) {
  const dir = FileSystem.documentDirectory + "file-viewer/";
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir);
  }

  const fileUri = `${dir}${asset.name}.${asset.type}`;
  console.log("Downloading to", fileUri);
  const fileDownloadResult = await FileSystem.downloadAsync(asset.uri, fileUri);

  const contentUri = await FileSystem.getContentUriAsync(
    fileDownloadResult.uri
  );
  console.log("Content URI", contentUri);
  return contentUri;
}
