import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";

export function Code() {
  const [code, setCode] = useState("");

  // Generate line numbers considering blank lines and skipping comments
  const getLineNumbers = (input: string): (number | string)[] => {
    const lines = input.split("\n");
    let lineNumber = 1;
    return lines.map((line) => {
      if (line.trim().startsWith("/") || line.trim().startsWith("#")) {
        return ""; // Skip numbering for comment lines
      } else if (line.trim() === "") {
        return ""; // Keep a blank line but no number
      }
      return lineNumber++;
    });
  };

  const renderCodeWithLineNumbers = () => {
    const lines = code.split("\n");
    const lineNumbers = getLineNumbers(code);

    return lines.map((line, index) => (
      <View key={index} style={styles.line}>
        <Text style={[styles.lineNumber]}>
          {lineNumbers[index]}
        </Text>
        <Text style={styles.codeText}>{line || " "}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.codeContainer}>{renderCodeWithLineNumbers()}</View>
      </ScrollView>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your code here..."
        placeholderTextColor="#555"
        value={code.toUpperCase()} // Ensures uppercase
        onChangeText={(text) => setCode(text.toUpperCase())} // Ensures uppercase
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  scrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  codeContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 2,
  },
  lineNumber: {
    width: 30,
    textAlign: "right",
    paddingRight: 10,
    color: "#888888", // Gray color for line numbers
    fontSize: 14,
    fontWeight: "600", // Semi-bold
  },
  codeText: {
    color: "#ffffff",
    fontSize: 14,
    flex: 1,
    fontWeight: "600", // Semi-bold
    textTransform: "uppercase", // Ensures uppercase text
  },
  input: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0, // Makes the TextInput transparent but usable
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600", // Semi-bold
    backgroundColor: "#1e1e1e",
    flex: 1,
    textTransform: "uppercase", // Ensures uppercase input
  },
});

// Minimalistic scrollbar style (for web platforms)
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #444;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;
  document.head.appendChild(style);
}

export default Code;
