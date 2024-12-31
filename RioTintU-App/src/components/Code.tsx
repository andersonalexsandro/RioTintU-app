import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet } from "react-native";

interface CodeProps {

    setCodeLines: React.Dispatch<React.SetStateAction<string[]>>;
  
  }
  
  export function Code({ setCodeLines }: CodeProps) {
  const [code, setCode] = useState("");

  const getCodeLines = () => {
    return code.split('\n');
    
  }

  const handleTextChange = (text: string) => {
    setCode(text);
    setCodeLines(getCodeLines());
    console.log(getCodeLines());
    
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your code here..."
          placeholderTextColor="#555"
          value={code}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
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
  },
  input: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600", // Semi-bold
    backgroundColor: "#1e1e1e",
    textTransform: "uppercase", // Tudo em maiúsculo
    padding: 10,
    textAlignVertical: "top",
    height: "100%", // Ocupa 100% da altura do contêiner
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