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
    // Expand all navigation items by default
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.add('expanded');
        const childItems = item.querySelector('.child-items');
        if (childItems) {
            childItems.classList.remove('hidden');
        }
    });

    // Expand/Collapse child navigation items on click
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

const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        content.classList.toggle('active');
    });
});
