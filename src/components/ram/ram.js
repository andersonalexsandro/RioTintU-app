export function renderRam(ramInstance) {
    const ramGrid = document.getElementById('ram-grid');

    ramGrid.innerHTML = '';

    for (let i = 0; i < ramInstance.getLengthInBytes(); i++) {
        const value = ramInstance.get(i); 

        const gridItem = document.createElement('div');
        gridItem.className = 'ram-item'; 
        gridItem.innerHTML = `<span class="ram-address">${i.toString().padStart(3, '0')}</span>: 
                              <span class="ram-value">${value.toString().padStart(3, '0')}</span>`;

        ramGrid.appendChild(gridItem);
    }
}