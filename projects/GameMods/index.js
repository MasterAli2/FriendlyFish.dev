function genMods() {
    fetch("data/mods.json")
        .then(response => response.json())
        .then(data => {
            


            const modContainer = document.getElementById("shit");

            // Pre-render all mod elements but keep them hidden
            for (let i = 0; i < data.mods.length; i++) {
                const modBox = document.createElement("button");

                modBox.classList.add("mod-box");

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
    const url = mod.querySelector(".links").children[1].href;
    if (url == null)
        return;

    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    // Redirect only if the random value is less than 0.5 (50% chance)
    if (randomValue < 0.987) {
        window.location.href = url;
    }
    else{
        window.location.href = "/404.html";

    }
}