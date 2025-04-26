export function renderRom() {
  const editor = document.getElementById('rom-code-editor');
  const lineNumbers = document.getElementById('rom-line-numbers');
  const scrollContainer = document.getElementById('rom-editor-scroll');

  editor.addEventListener('input', handleTextChange);
  scrollContainer.addEventListener('scroll', () => {
    lineNumbers.scrollTop = scrollContainer.scrollTop;
  });

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

  handleTextChange();
}
