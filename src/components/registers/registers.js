export function renderRegisters(registersInstance) {
    const registersGrid = document.getElementById('registers-grid');

    if (!registersGrid) {
        console.error('Contêiner de registradores não encontrado!');
        return;
    }

    registersGrid.innerHTML = '';

    const registerNames = registersInstance.getRegisterNames();

    registerNames.forEach(name => {
        const value = registersInstance.getByName(name); 

        const gridItem = document.createElement('div');
        gridItem.className = 'register-item';
        gridItem.innerHTML = `<span class="register-address">${name.toUpperCase()}</span>: 
                              <span class="register-value">${value}</span>`;

        registersGrid.appendChild(gridItem);
    });
}