function genMods() {
    fetch("data/mods.json")
        .then(response => response.json())
        .then(data => {
            const modContainer = document.getElementById("shit");
            let delay = 250; // Initial delay

            for (let i = 0; i < data.mods.length; i++) {
                setTimeout(() => {
                    // Create a new mod element
                    const modBox = document.createElement("button");
                    modBox.classList.add("mod-box");
                    modBox.setAttribute("onclick", "OnModClick(this);")
                    modBox.innerHTML = `
                        <img class="mod-img" src="${data.mods[i].img}">
                        
                        <div class="c">
                            <p class="mod-title">
                                ${data.mods[i].title}
                            </p>
                            <p class="mod-desc">
                                ${data.mods[i].desc}
                            </p>
                        </div>

                        <div class="links">
                            <a href="${data.mods[i].github}" target="_blank" class="linkcon">
                                <img src="https://github.com/fluidicon.png" alt="Github">
                            </a>
                            <a href="${data.mods[i].thunder}" target="_blank" class="linkcon">
                                <img src="https://thunderstore.io/static/icon.ffafeeaa3ecf.png" alt="Thunderstore">
                            </a>
                        </div>
                    `;

                    // Append the mod to the container
                    modContainer.appendChild(modBox);

                    // Trigger the animation by adding a class
                    setTimeout(() => {
                        modBox.classList.add("fade-in");
                    }, 10); // Small delay to ensure the element is rendered before applying the animation
                }, delay);

                delay += 250; // Increase delay by 500ms (0.5 seconds) for each subsequent mod
            }
        })
        .catch(error => console.error('Error fetching mods:', error));
        
}


/**
 * @param {HTMLElement} mod Some XMLHttpRequest
 */
function OnModClick(mod){

    
}