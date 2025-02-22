function genMods() {
    fetch("data/mods.json")
        .then(response => response.json())
        .then(data => {
            


            const modContainer = document.getElementById("shit");

            // Pre-render all mod elements but keep them hidden
            for (let i = 0; i < data.mods.length; i++) {
                const modBox = document.createElement("button");

                modBox.classList.add("mod-box");
                modBox.id = get3DigitHash(data.mods[i].thunder) +1


                modBox.setAttribute("onclick", "OnModClick(this);");
                modBox.style.visibility = "hidden"; // Hide the element initially
                modBox.innerHTML = `
                    <img class="mod-img" src="${data.mods[i].img}">
                    <div class="c">
                        <p class="mod-title">${data.mods[i].title}</p>
                        <p class="mod-desc">${data.mods[i].desc}</p>
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

                modContainer.appendChild(modBox);
            }

            window.scrollTo({
                top: 100,
                behavior: 'smooth'
              });

            // Reveal the mod elements one by one with a delay
            let delay = 250; // Initial delay
            const modElements = modContainer.querySelectorAll(".mod-box");

            modElements.forEach((modBox, index) => {
                setTimeout(() => {
                    modBox.style.visibility = "visible"; // Make the element visible
                    modBox.classList.add("fade-in"); // Trigger the animation
                }, delay * index); // Increase delay for each subsequent mod
            });

            onLoad()
        })
        .catch(error => console.error('Error fetching mods:', error));
}

/**
 * @param {HTMLElement} mod Some XMLHttpRequest
 */
function OnModClick(mod) {
    // Handle mod click event
}

function get3DigitHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    // Ensure the hash is positive and 3 digits long
    return Math.abs(hash) % 10000; // Modulo 10000 ensures 4 digits (0-9999)
}



function onLoad() {

    const fragment = window.location.hash; // Returns "#section1"
    const elementId = fragment.substring(1); // Remove the '#' to get "section1"
    const elemelon = document.getElementById(elementId); // Get the element by ID
    
    console.log(fragment); // Logs "#section1"
    console.log(elementId); // Logs "section1"
    console.log(elemelon); // Logs the element with ID "section1"

    if (elemelon) {
        elemelon.scrollIntoView({ behavior: 'smooth', block: 'center' });
        elemelon.classList.add("Sel-12")
    } 


}
