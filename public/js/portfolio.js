document.addEventListener('DOMContentLoaded', () => {

  const sideBar = document.querySelector('.sidebar');
  const iconSideBar = document.querySelector('.icon-sidebar');
  const logoIcon = document.querySelectorAll('.logo-icon');
  const date = document.querySelector('.date');
  const displayPopup = document.querySelectorAll('.display-popup');
  const loadingFill = document.querySelector('#loadingFill');
  const loadingBar = document.querySelector('.loading-bar')
  const toggle = document.querySelector("#customToggle");
  const browserBtn = document.querySelector('#browserBtn');
  const fileInput = document.querySelector('#fileInput');
  const uploadedFileContainer = document.querySelector('.uploaded');
  const grouped1 = document.querySelector('.grouped-1')
  const uploadingFileContainer = document.querySelector('.uploading');
  const featuredInput = document.querySelector('#featuredInput');

  function toggleSidebar() { 
    if (sideBar.classList.contains('hidden')) {
      sideBar.classList.remove('hidden');
    } else {
      sideBar.classList.add('hidden');
    }

    if (iconSideBar.classList.contains('hidden')) {
      iconSideBar.classList.remove('hidden');
    } else {
      iconSideBar.classList.add('hidden');
    }
  }

  logoIcon.forEach(logo => { 
    logo.addEventListener('click', toggleSidebar);
  });

  // Date logic
  const today = new Date()
  const day = today.getDate()
  const month = today.toLocaleDateString('en-US', {month: 'short'});
  const year = today.getFullYear()
  
  if (date) {
    date.innerHTML = `${day}, ${month} ${year}`
  }

  // Delete uploaded file
  if (uploadedFileContainer) {
    uploadedFileContainer.addEventListener('click', (e) => {
      if (e.target.closest('.delete-img')){
        const uploadedFileContainer = e.target.closest('.group-uploadedContent');
        uploadedFileContainer.remove();
      }
    })
  }

  // Delete uploading file
  if (grouped1) {
    grouped1.addEventListener('click', (e) => {
      if (e.target.closest('.fa-circle-xmark')){
        const uploadedFileContainer = e.target.closest('.group-uploadedContent');
        uploadedFileContainer.innerHTML = "";
      }
    })
  }

  // Toggle functionality - FIXED
  if (toggle && featuredInput) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      const isOn = toggle.classList.contains("active");
      featuredInput.value = isOn ? "true" : "false"; // UPDATE HIDDEN INPUT
      console.log(isOn ? "ON" : "OFF");
    });
  }

  // Browse button - FIXED (removed duplicate)
  if (browserBtn && fileInput) {
    browserBtn.addEventListener('click', function() {
      fileInput.click();
    });

    // File input change - SINGLE LISTENER
    fileInput.addEventListener('change', function(e) {
      const files = fileInput.files[0];
      
      if (!files) return;
      
      console.log('Selected file:', files.name);
      
      uploadingFile();
      
      // Reset loading bar
      if (loadingFill) {
        loadingFill.style.transition = 'none';
        loadingFill.style.width = '0%';
      }
      
      const fileSizeMb = files.size / (1024 * 1024); 
      const duration = Math.min(fileSizeMb, 5);
      
      if (grouped1) {
        grouped1.style.visibility = 'visible';
      }
      
      // Start loading animation
      setTimeout(() => {
        if (loadingFill) {
          loadingFill.style.transition = `width ${duration}s ease`;
          loadingFill.style.width = '100%';
        }
        if (loadingBar) {
          loadingBar.style.visibility = 'visible';
        }
      }, 50);

      // Show uploaded file
      setTimeout(() => {
        uploadedFile();
        if (uploadedFileContainer) {
          uploadedFileContainer.style.visibility = 'visible';
        }
      }, duration * 1000 + 100);
    });
  }

  const uploadingFile = () => {
    if (!fileInput.files[0] || !uploadingFileContainer) return;
    
    const file = fileInput.files[0];
    const uploadingHtmlTemplate = `
      <div class="group-uploadedContent">
        <li class="uploading-file">${file.name}</li>
        <i class="far fa-circle-xmark"></i>
      </div>
    `;
    uploadingFileContainer.innerHTML = uploadingHtmlTemplate;
  }

  const uploadedFile = () => {
    if (!fileInput.files[0] || !uploadedFileContainer) return;
    
    const file = fileInput.files[0];
    const uploadedHtmlTemplate = `
      <div class="group-uploadedContent">
        <li class="uploaded-file">${file.name}</li>
        <img class="delete-img" src="images/Delete-icon.svg" alt="">
      </div>
    `;
    uploadedFileContainer.innerHTML += uploadedHtmlTemplate;
  }

  // Preview function
  window.previewProject = function() {
    const portfolioname = document.querySelector('input[name="portfolioname"]').value;
    const portfoliodescription = document.querySelector('input[name="portfoliodescription"]').value;
    const servicecategory = document.querySelector('select[name="servicecategory"]').value;
    const featured = document.querySelector('input[name="featured"]').value;
    const selectedFile = fileInput.files[0];
    
    if (!portfolioname || !portfoliodescription || !servicecategory || !selectedFile) {
      alert('Please fill all fields and select an image before previewing.');
      return;
    }
    
    // Create preview (you can customize this)
    const previewData = {
      name: portfolioname,
      description: portfoliodescription,
      category: servicecategory,
      featured: featured === 'true',
      fileName: selectedFile.name
    };
    
    console.log('Preview data:', previewData);
    alert(`Preview:\nProject: ${previewData.name}\nDescription: ${previewData.description}\nCategory: ${previewData.category}\nFeatured: ${previewData.featured}\nFile: ${previewData.fileName}`);
  }

});


