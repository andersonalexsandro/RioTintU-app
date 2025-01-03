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
    let lineNumber = 0; // Start numbering from 0

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      // Check if the line is a comment or label
      if (trimmedLine.startsWith("/") || trimmedLine.startsWith(".")) {
        return (
          <Text key={index} style={[styles.lineNumber, { opacity: 0 }]}>
            ""
          </Text>
        );
      }

      // For valid lines, render the line number and increment the counter
      const currentNumber = lineNumber;
      lineNumber++; // Increment only for valid lines
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
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.codeWrapper}>
          <View style={styles.lineNumbers}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {renderLineNumbers()}
            </ScrollView>
          </View>
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
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: "column",
  },
  codeWrapper: {
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
  },
  lineNumbers: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "flex-end",
  },
  lineNumber: {
    color: "#999999",
    textAlign: "right",
    fontSize: 14,
    lineHeight: 20, // Match lineHeight with input text
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600", // Semi-bold
    backgroundColor: "#1e1e1e",
    padding: 10,
    textAlignVertical: "top",
    lineHeight: 20, // Match lineHeight with line numbers
    height: "100%",
  },
  currentLine: {
    color: "#b3591e", // Highlight color for the current line
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