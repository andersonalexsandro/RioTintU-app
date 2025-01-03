import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Text } from "react-native";

const INSTRUCTIONS = [
  "nop", "hlt", "add", "sub", "nor", "and", "xor", "rsh",
  "ldi", "adi", "jmp", "brh", "jid", "adc", "lod", "str"
];

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

      // Check if the line is empty, a comment, or a label
      if (
        trimmedLine === "" || // Empty line
        trimmedLine.startsWith("/") || // Line starts with `/`
        trimmedLine.startsWith("#") || // Line starts with `#`
        trimmedLine.startsWith(".") // Line is a label
      ) {
        return (
          <Text key={index} style={[styles.lineNumber, { opacity: 0 }]}>
            ""{/* Invisible placeholder */}
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
          {currentNumber + 1}
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
          {/* Line Numbers */}
          <View style={styles.lineNumbers}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {renderLineNumbers()}
            </ScrollView>
          </View>

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
    paddingVertical: 10, // Adjusts vertical padding inside the line number column
    width: 30,
    paddingRight: 5
  },
  lineNumber: {
    color: "#999999",
    textAlign: 'right',
    fontSize: 20, // Match font size with code input
    lineHeight: 28, // Ensure this matches the codeLine lineHeight
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 20, // Match font size with line numbers
    lineHeight: 28, // Match lineHeight with line numbers
    fontWeight: "600", // Semi-bold
    backgroundColor: "#1e1e1e",
    padding: 10,
    textAlignVertical: "top",
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
