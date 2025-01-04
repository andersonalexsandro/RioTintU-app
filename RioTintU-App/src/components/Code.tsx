import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Text, Alert } from "react-native";

interface CodeProps {
  setCodeLines: React.Dispatch<React.SetStateAction<string[]>>;
  pc: number;
}

export function Code({ setCodeLines, pc }: CodeProps) {
  const [code, setCode] = useState("");

  const handleTextChange = (text: string) => {
    const lines = text.split("\n");

    // Filtrar apenas linhas válidas (não começam com '.', '/', ou '#')
    const validLines = lines.filter(
      (line) => 
        line.trim() !== "" &&
        !line.trim().startsWith(".") &&
        !line.trim().startsWith("/") &&
        !line.trim().startsWith("#")
    );

    // Verificar se excede o limite de linhas válidas
    if (validLines.length > 256) {
      Alert.alert("Line Limit Exceeded", "You cannot write more than 255 valid lines.");
      return;
    }

    // Atualizar o estado se estiver dentro do limite
    setCode(text);
    setCodeLines(lines);
  };

  const renderLineNumbers = () => {
    const lines = code.split("\n");
    let lineNumber = 0;

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      // Verificar se a linha não é válida
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

      // Renderizar o número da linha para linhas válidas
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
    textAlign: "right",
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
