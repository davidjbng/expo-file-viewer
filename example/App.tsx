import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { openFileAsync } from "expo-file-viewer";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function App() {
  const [assets, error] = useAssets([require("./assets/dummy.pdf")]);
  if (error) {
    return <Text>{error.message}</Text>;
  }
  const pdf = assets?.at(0)!;

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <ScrollView>
        <Text
          style={{
            flex: 1,
            fontSize: 36,
          }}
        >
          Expo File Viewer Example
        </Text>
        <View style={{ marginTop: 30, gap: 20, alignItems: "flex-start" }}>
          <Text>{pdf.localUri}</Text>
          <Button
            title="Open PDF"
            onPress={() => {
              FileSystem.getContentUriAsync(pdf.localUri!).then((uri) => {
                openFileAsync(uri).catch((e) =>
                  Alert.alert("Error", e.message)
                );
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
