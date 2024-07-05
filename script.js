document.addEventListener("DOMContentLoaded", () => {
    displayRandomPhotos();
    initializeMode();

    // Add event listener to the search input for dynamic search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', searchPhotos);

    // Load photos initially
    loadPhotos();
});

// Function to load photos from JSON and display in gallery
function loadPhotos() {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = '';

    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.tags.join(', ');
        img.onclick = function() {
            openModal(photo.url, photo.tags.join(', '));
        };
        gallery.appendChild(img);
    });
}

// Open modal and display selected image
function openModal(imgSrc, caption) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img01');
    var captionText = document.getElementById('caption');
    var downloadBtn = document.getElementById('downloadBtn');
    var shareBtn = document.getElementById('shareBtn');

    modal.style.display = 'block';
    modalImg.src = imgSrc;
    captionText.innerHTML = caption;

    // Download button functionality (example)
    downloadBtn.onclick = function() {
        alert('Implement download functionality here for ' + imgSrc);
        // Example: You can implement download functionality here
    };

    // Share button functionality (example)
    shareBtn.onclick = function() {
        const shareableLink = window.location.origin + '/share/' + encodeURI(imgSrc);
        alert('Shareable link: ' + shareableLink);
        // Example: You can generate and share the link here
    };
}

// Close modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Function to display random photos initially
function displayRandomPhotos() {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = '';

    const randomPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, 10);
    randomPhotos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.tags.join(', ');
        img.onclick = function() {
            openModal(photo.url, photo.tags.join(', '));
        };
        gallery.appendChild(img);
    });
}

// Function to search photos based on input text
function searchPhotos() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = '';

    const filteredPhotos = photos.filter(photo => 
        photo.tags.some(tag => tag.includes(query))
    );

    filteredPhotos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.tags.join(', ');
        img.onclick = function() {
            openModal(photo.url, photo.tags.join(', '));
        };
        gallery.appendChild(img);
    });

    if (filteredPhotos.length === 0) {
        gallery.innerHTML = '<p>No photos found.</p>';
    }

    // Display random photos if search input is empty
    if (query === '') {
        displayRandomPhotos();
    }
}

// Function to toggle dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Function to initialize dark mode based on local storage
function initializeMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}
