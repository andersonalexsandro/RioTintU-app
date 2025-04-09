export function renderFlags(flagInstance) {
    const contentDiv = document.getElementById("flags-content");

    contentDiv.innerHTML = '';

    const flagList = document.createElement('ul');
    flagList.className = 'flag-list';

    const flags = [
        { name: 'ZERO', value: flagInstance.getZero() },
        { name: 'COUT', value: flagInstance.getCout() },
        { name: 'MSB', value: flagInstance.getMsb() },
        { name: 'EVEN', value: flagInstance.getEven() }
    ];

    flags.forEach(flag => {
        const listItem = document.createElement('li');
        listItem.className = 'flag-item';
        listItem.innerHTML = `<span class="flag-name">${flag.name}:</span> 
                              <span class="flag-value">${flag.value}</span>`;
        flagList.appendChild(listItem);
    });

    // Adiciona a lista ao contêiner
    contentDiv.appendChild(flagList);
}