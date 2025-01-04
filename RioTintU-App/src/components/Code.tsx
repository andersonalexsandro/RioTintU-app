import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Text } from "react-native";

interface CodeProps {
  setCodeLines: React.Dispatch<React.SetStateAction<string[]>>;
  pc: number;
}

export function Code({ setCodeLines, pc }: CodeProps) {
  const [code, setCode] = useState("");

  const handleTextChange = (text: string) => {
    setCode(text);
    setCodeLines(text.split("\n"));
  };

  const renderLineNumbers = () => {
    const lines = code.split("\n");
    let lineNumber = 0;

    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (
        trimmedLine === "" || // Empty line
        trimmedLine.startsWith("/") || // Comment
        trimmedLine.startsWith("#") || // Comment
        trimmedLine.startsWith(".") // Label
      ) {
        return (
          <Text key={index} style={[styles.lineNumber, { opacity: 0 }]}>
            ""
          </Text>
        );
      }

      const currentNumber = lineNumber;
      lineNumber++;
      return (
        <Text
          key={index}
          style={[
            styles.lineNumber,
            pc === currentNumber && styles.currentLine,
          ]}
        >
          {currentNumber}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.codeWrapper}>
          {/* Line Numbers */}
          <View style={styles.lineNumbers}>{renderLineNumbers()}</View>

          {/* Code Editor */}
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your code here..."
            placeholderTextColor="#555"
            value={code}
            onChangeText={handleTextChange}
            autoCapitalize="none"
            autoCorrect={false}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  codeWrapper: {
    flexDirection: "row",
    flex: 1,
  },
  lineNumbers: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 10,
    minWidth: 30,
    textAlign: 'right',
  },
  lineNumber: {
    color: "#999999",
    textAlign: "right",
    fontSize: 18,
    lineHeight: 24,
    paddingHorizontal: 5,
  },
  currentLine: {
    color: "#b3591e", // Highlight color for the current line
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    backgroundColor: "#1e1e1e",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
});

export default Code;
