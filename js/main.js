const mainContent = document.getElementById("content");

export function loadHTML(filePath, elementId, callback = null) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;

            // Invoke the callback after the content is loaded
            if (callback) {
                callback();
            }
        });
}

// Initialize navigation behavior
function initializeNavigation() {
    // Expand/Collapse child navigation items
    document.querySelectorAll('.nav-item > a[data-target]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const targetId = anchor.getAttribute('data-target');
            const parent = anchor.parentElement;

            // Toggle the visibility of child items
            parent.classList.toggle('expanded');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.toggle('hidden');
            }
        });
    });

    // Load specific content when a content link is clicked
    document.querySelectorAll('.nav-item > a[data-content]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const contentId = anchor.getAttribute('data-content');

            // Hide all content sections
            document.querySelectorAll('.content > div').forEach(div => {
                div.classList.add('hidden');
            });

            loadContent(contentId);

            // Show the selected content section
            /*
            const contentToShow = document.getElementById(contentId);
            if (contentToShow) {
                contentToShow.classList.remove('hidden');
            } */
        });
    });
}

// Load sidebar and content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('components/sidebar.html', 'sidebar', initializeNavigation); // Pass initializeNavigation as a callback
    loadHTML('components/content.html', 'content');
});


function loadContent(file) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
            console.log('error loading file...');
          throw new Error(`Failed to load ${file}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        mainContent.innerHTML = html;
      })
      .catch(error => {
        console.log('error loading file...');
        mainContent.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  }
