

function generateProjectsGrid() {
  fetch("/data/projects.json")
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      const projectsContainer = document.getElementById("projects-container");
      for (let i = 0; i < data.projects.length; i++) {
        projectsContainer.innerHTML += `
        <a href="${data.projects[i].link}">
          <div class="grid-item">
              <img class="project-image" src="${data.projects[i].link}icon.png">
              <div class="project-text">
                  <h1>${data.projects[i].name}</h1>
                  <p>${data.projects[i].description}</p>
              </div>
          </div>
        </a>
        `;
      }
    })
    .then(data =>{
      // Get all elements with the class "random-color"
      const colorElements = document.querySelectorAll('.project-image');

      // Loop through each element and assign a unique random color
      colorElements.forEach(element => {
          element.style.backgroundColor = getRandomColor();
      });
    })
    .catch(error => console.error('Failed to fetch data:', error));



    
}



function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random red value (0-255)
  const g = Math.floor(Math.random() * 256); // Random green value (0-255)
  const b = Math.floor(Math.random() * 256); // Random blue value (0-255)
  return `rgb(${r}, ${g}, ${b})`; // Return RGB color string
}