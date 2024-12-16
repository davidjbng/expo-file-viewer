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
  return (
    <SafeAreaView style={{ margin: 20 }}>
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
          <Button
            title="Open PDF"
            onPress={() => {
              openFileAsync("hello world")
                .then((r) => Alert.alert("Success", r))
                .catch((e) => Alert.alert("Error", e.message));
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
