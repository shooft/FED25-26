// To test if the Javascript is linked correctly
console.log("hi");

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video");

  // Create IntersectionObserver to play/pause videos in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Ensure the video is muted
          video.muted = true;

          // Check if the video is loaded enough to play
          if (video.readyState >= 3) {
            video.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          } else {
            // If the video is still loading, add an event listener to play when ready
            video.addEventListener(
              "canplay",
              () => {
                video.play().catch((error) => {
                  console.error("Error playing video after load:", error);
                });
              },
              { once: true }
            );
          }
        } else {
          // Pause the video when it is out of view
          video.pause();
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.2, // Play when 20% of the video is visible
    }
  );

  // Observe all video elements
  videos.forEach((video) => {
    observer.observe(video);
  });
});

// Carousel
const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselList = document.querySelector(".carousel-list");
const items = document.querySelectorAll(".carousel-list li");
const leftNav = document.querySelector(".carousel-nav.left");
const rightNav = document.querySelector(".carousel-nav.right");

let currentIndex = 0;

// Function to update the carousel position
function updateCarousel() {
  const itemWidth = carouselWrapper.offsetWidth; // Get the width of the carousel wrapper
  const offset = -currentIndex * itemWidth; // Calculate the offset based on current index
  carouselList.style.transform = `translateX(${offset}px)`; // Apply the calculated offset
}

// Event listener for left navigation button click
leftNav.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--; // Move to the previous item
    updateCarousel();
  }
});

// Event listener for right navigation button click
rightNav.addEventListener("click", () => {
  if (currentIndex < items.length - 1) {
    currentIndex++; // Move to the next item
    updateCarousel();
  }
});

// Initialize carousel position on load
updateCarousel();

// Optionally add event listener for window resize
window.addEventListener("resize", updateCarousel);
