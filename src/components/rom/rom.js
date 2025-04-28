const ROM_STORAGE_KEY = 'romCodeCache';

export function renderRom() {
  const editor = document.getElementById('rom-code-editor');
  const lineNumbers = document.getElementById('rom-line-numbers');

  editor.addEventListener('input', handleTextChange);
  editor.addEventListener('scroll', syncScroll);

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

      if (trimmed === "" || trimmed.startsWith(".") || trimmed.startsWith("/") || trimmed.startsWith("#")) {
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

  // Se houver cache salvo, recupera
  const cachedCode = localStorage.getItem(ROM_STORAGE_KEY);
  if (cachedCode !== null) {
    editor.value = cachedCode;
  }

  handleTextChange(); // Inicializar números de linha e cache
}

export function getRomCode() {
  const editor = document.getElementById('rom-code-editor');
  return editor.value;
}
