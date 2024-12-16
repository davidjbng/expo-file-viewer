import { openFileAsync } from "expo-file-viewer";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <ScrollView style={{ margin: 20 }}>
        <Text
          style={{
            flex: 1,
            fontSize: 36,
          }}
        >
          Module API Example
        </Text>
        <View style={{ margin: 30, gap: 20, alignItems: "flex-start" }}>
          <Button
            title="Open PDF"
            onPress={() => openFileAsync("hello world")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
