const ROM_STORAGE_KEY = 'romCodeCache';
const DEFAULT_ROM_CODE = `ldi r15 number_display_low_8
ldi r1 0
ldi r2 1

.fibonacci
add r1 r1 r2
str r1 r15
add r2 r1 r2
str r2 r15

jmp .fibonacci`;

export function renderRom() {
  const editor = document.getElementById('rom-code-editor');
  const lineNumbers = document.getElementById('rom-line-numbers');
  const saveButton = document.getElementById('save-rom');

  editor.addEventListener('input', handleTextChange);
  editor.addEventListener('scroll', syncScroll);

  editor.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  editor.addEventListener('drop', handleDropFile);

  saveButton.addEventListener('click', handleSaveRom);

  function handleTextChange() {
    const lines = editor.value.split('\n');

    const validLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed !== "" && !trimmed.startsWith(".") && !trimmed.startsWith("/") && !trimmed.startsWith("#");
    });

    if (validLines.length > 256) {
      alert("You cannot write more than 255 valid lines.");
      return;
    }

    renderLineNumbers(lines);

    localStorage.setItem(ROM_STORAGE_KEY, editor.value);
  }

  function renderLineNumbers(lines) {
    let lineNumber = 0;
    lineNumbers.innerHTML = '';

    lines.forEach((line) => {
      const trimmed = line.trim();
      const lineDiv = document.createElement('div');
      lineDiv.classList.add('rom-line-number');

      // Verifica se a linha deve ser numerada
      if (
        trimmed === "" || 
        trimmed.startsWith(".") || 
        trimmed.startsWith("/") || 
        trimmed.startsWith("#") || 
        trimmed.startsWith("define")
      ) {
        lineDiv.textContent = '.';
        lineDiv.classList.add('hidden');
      } else {
        lineDiv.textContent = lineNumber;
        lineNumber++;
      }

      lineNumbers.appendChild(lineDiv);
    });
  }

  function syncScroll() {
    lineNumbers.scrollTop = editor.scrollTop;
  }

  function handleSaveRom() {
    const fileName = prompt('Type the file name:', 'rom-code') || 'rom-code';

    const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function handleDropFile(event) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      alert('Only text files are allowed!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      editor.value = text;
      localStorage.setItem(ROM_STORAGE_KEY, text);
      handleTextChange();
    };
    reader.readAsText(file);
  }

  const cachedCode = localStorage.getItem(ROM_STORAGE_KEY);
  if (cachedCode !== null) {
    editor.value = cachedCode;
  } else {
    editor.value = DEFAULT_ROM_CODE; // Define o texto inicial padrão
  }

  handleTextChange();
}

export function getRomCode() {
  const editor = document.getElementById('rom-code-editor');
  return editor.value;
}

export function highlightRomLine(pcValue) {
  const lineNumbers = document.querySelectorAll('.rom-line-number');

  lineNumbers.forEach(line => {
    if (parseInt(line.textContent) === pcValue) {
      line.style.color = 'orange';
      line.style.fontWeight = 'bold';
    } else {
      line.style.color = 'white';
      line.style.fontWeight = 'normal';
    }
  });
}