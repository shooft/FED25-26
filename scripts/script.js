// To test if the Javascript is linked correctly
console.log("hi");

document.addEventListener('DOMContentLoaded', () => {
    const firstVideo = document.getElementById('firstVideo');
    
    // Play the first video immediately
    if (firstVideo) {
      firstVideo.muted = true; // The video is muted for autoplay
      firstVideo.play().catch((error) => {
        console.error("Error playing the first video:", error);
      });
    }
  
    const videos = document.querySelectorAll('video:not(#firstVideo)'); // Exclude the first video
  
    // Create IntersectionObserver to play/pause videos in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
          // Ensure the video is muted
          video.muted = true;
  
          // Check if the video is loaded enough to play
          if (video.readyState >= 3) {
            video.play().catch((error) => {
              console.error("Error playing video in viewport:", error);
            });
          } else {
            // If the video is still loading, add an event listener to play when ready
            video.addEventListener('canplay', () => {
              video.play().catch((error) => {
                console.error("Error playing video after load:", error);
              });
            }, { once: true });
          }
        } else {
          // Pause the video when it is out of view
          video.pause();
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.2 // Play when 20% of the video is visible
    });
  
    // Observe all video elements
    videos.forEach(video => {
      observer.observe(video);
    });
  });  