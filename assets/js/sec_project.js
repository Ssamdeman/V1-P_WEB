import { getFirestore, collection, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';

document.addEventListener('DOMContentLoaded', function() {
   const db = getFirestore();
   //Getting right url parameter. 
   function getUrlParameter(name) {
       const params = new URLSearchParams(window.location.search);
       return params.get(name);
   }

   function handleView() {
       const mode = getUrlParameter('mode');
       if (mode === 'new') {
           $('#projectGridView').hide();
           $('#banner').hide();   
           $('.project-fab').hide();
           $('#banner .inner').hide();
           $('#projectFormView').show();
       } else {
           $('#projectGridView').show();
           $('.project-fab').show();
           $('#banner .inner').show();
           $('#projectFormView').hide();
       }
   }
        //Adding event listener to feature button
   document.getElementById('addProjectBtn').addEventListener('click', function() {
       window.open('sec_project.html?mode=new', '_blank');
   });

   const addFeatureBtn = document.getElementById('addFeatureBtn');
   const featuresContainer = document.getElementById('featuresContainer');

   addFeatureBtn.addEventListener('click', function() {
       const featureHTML = `
           <div class="feature-entry">
               <div class="form-group">
                   <div class="feature-content">
                       <input type="text" class="feature-text" placeholder="Enter feature description">
                       <button type="button" class="remove-btn">×</button>
                   </div>
               </div>
           </div>
       `;
       featuresContainer.insertAdjacentHTML('beforeend', featureHTML);

       const removeButtons = document.querySelectorAll('.remove-btn');
       removeButtons.forEach(button => {
           button.addEventListener('click', function() {
               this.closest('.feature-entry').remove();
           });
       });
   });
   //adding event listener to challenge button
    const addChallengeBtn = document.getElementById('addChallengeBtn');
    const challengesContainer = document.getElementById('challengesContainer');

    addChallengeBtn.addEventListener('click', function() {
        const challengeHTML = `
            <div class="challenge-entry">
                <div class="form-group">
                    <div class="challenge-content">
                        <input type="text" class="challenge-text" placeholder="Enter technical challenge">
                        <button type="button" class="remove-btn">×</button>
                    </div>
                </div>
            </div>
        `;
        challengesContainer.insertAdjacentHTML('beforeend', challengeHTML);

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.challenge-entry').remove();
            });
        });
    });
    // Add event listeners for each tech section
    const techButtons = {
        frontend: document.getElementById('addFrontendTech'),
        backend: document.getElementById('addBackendTech'),
        deployment: document.getElementById('addDeploymentTech')
    };
    
    Object.entries(techButtons).forEach(([type, button]) => {
        button.addEventListener('click', function() {
            const container = document.getElementById(`${type}TechContainer`);
            const techHTML = `
                <div class="tech-entry">
                    <input type="text" class="tech-text" placeholder="Enter ${type} technology">
                    <button type="button" class="remove-btn">×</button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', techHTML);
    
            // Add remove functionality
            const removeButton = container.querySelector('.tech-entry:last-child .remove-btn');
            removeButton.addEventListener('click', function() {
                this.closest('.tech-entry').remove();
            });
        });
    });

    // Add event listener for screenshot submission
            // Add screenshot functionality
    const addScreenshotBtn = document.getElementById('addScreenshotBtn');
    const screenshotsContainer = document.getElementById('screenshotsContainer');

    addScreenshotBtn.addEventListener('click', function() {
        const screenshotHTML = `
            <div class="screenshot-entry">
                <div class="form-group">
                    <div class="screenshot-content">
                        <input type="file" class="screenshot-input" accept="image/*" style="display: none;">
                        <button type="button" class="upload-btn">Upload Screenshot</button>
                        <span class="filename-display"></span>
                        <button type="button" class="remove-btn">×</button>
                    </div>
                </div>
            </div>
        `;
        screenshotsContainer.insertAdjacentHTML('beforeend', screenshotHTML);

        // Add upload and remove functionality
        const entry = screenshotsContainer.lastElementChild;
        const uploadBtn = entry.querySelector('.upload-btn');
        const fileInput = entry.querySelector('.screenshot-input');
        const filenameDisplay = entry.querySelector('.filename-display');
        const removeBtn = entry.querySelector('.remove-btn');

        uploadBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function() {
            if (this.files[0]) {
                filenameDisplay.textContent = this.files[0].name;
                uploadBtn.style.display = 'none';
            }
        });

        removeBtn.addEventListener('click', function() {
            this.closest('.screenshot-entry').remove();
        });
    });



   document.getElementById('newProjectForm').addEventListener('submit', async function(e) {
       e.preventDefault();
        //getting all the features
       const features = [];
       document.querySelectorAll('.feature-entry').forEach(entry => {
           features.push({
               text: entry.querySelector('.feature-text').value
           });
       });

       //Getting all the challenges
        const challenges = [];
        document.querySelectorAll('.challenge-entry').forEach(entry => {
        challenges.push({
            text: entry.querySelector('.challenge-text').value
            });
        });
        //getting all the technologies
        const frontendTech = [];
        document.querySelectorAll('#frontendTechContainer .tech-entry').forEach(entry => {
            frontendTech.push({
                text: entry.querySelector('.tech-text').value
            });
        });

        const backendTech = [];
        document.querySelectorAll('#backendTechContainer .tech-entry').forEach(entry => {
            backendTech.push({
                text: entry.querySelector('.tech-text').value
            });
        });

        const deploymentTech = [];
        document.querySelectorAll('#deploymentTechContainer .tech-entry').forEach(entry => {
            deploymentTech.push({
                text: entry.querySelector('.tech-text').value
            });
        });

        //getting all screenshots
        const screenshots = [];
        document.querySelectorAll('.screenshot-entry').forEach(entry => {
            const fileInput = entry.querySelector('.screenshot-input');
            if (fileInput.files[0]) {
                screenshots.push({
                    text: fileInput.files[0].name
                });
            }
        });



        //naming database
       const projectTitle = document.getElementById('projectTitle').value;
       const sanitizedTitle = projectTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

       const projectData = {
           basicInformation: {
               title: projectTitle,
               briefDescription: document.getElementById('projectBrief').value
           },
           features: features,
           challenges: challenges,
           projectLinks: {
            demoUrl: document.getElementById('demoUrl').value,
            githubUrl: document.getElementById('githubUrl').value
            },
           technologies: {
                frontend: frontendTech,
                backend: backendTech,
                deployment: deploymentTech
            },
            screenshots: screenshots
            
       };

       try {
           await setDoc(doc(db, "projects", sanitizedTitle), projectData);
           alert("Project saved successfully!");
           window.location.href = 'sec_project.html';
       } catch (error) {
           console.error("Error adding project: ", error);
           alert("Error saving project. Please try again.");
       }
   });

   document.getElementById('cancelProject').addEventListener('click', function() {
       if (getUrlParameter('mode') === 'new') {
           window.close();
       } else {
           window.location.href = 'sec_project.html';
       }
   });

   handleView();
});