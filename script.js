class ImageStackRotator {
  constructor() {
    this.currentIndex = 0;
    this.totalImages = 4;
    this.imageStack = document.getElementById("imageStack");
    this.indicatorDots = document.getElementById("indicatorDots");
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Add keyboard event listener
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));

    // Add click listeners to indicator dots
    this.setupIndicatorDots();

    // Add focus to image stack for keyboard navigation
    this.imageStack.setAttribute("tabindex", "0");

    // Add click listener to image stack for manual navigation
    this.imageStack.addEventListener("click", () => this.rotateNext());

    // Initialize aria-live region for screen readers
    this.createAriaLiveRegion();

    // Announce initial state
    this.announceCurrentImage();
  }

  handleKeyPress(event) {
    // Only respond to right arrow key
    if (event.key === "ArrowRight" || event.keyCode === 39) {
      event.preventDefault();
      this.rotateNext();
    }

    // Also support left arrow for better UX
    if (event.key === "ArrowLeft" || event.keyCode === 37) {
      event.preventDefault();
      this.rotatePrevious();
    }

    // Support spacebar and enter when image stack is focused
    if (
      (event.key === " " || event.key === "Enter") &&
      document.activeElement === this.imageStack
    ) {
      event.preventDefault();
      this.rotateNext();
    }
  }

  rotateNext() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.updateImageStack();
    this.updateIndicators();
    this.announceCurrentImage();

    // Reset animation lock after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  rotatePrevious() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex =
      (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.updateImageStack();
    this.updateIndicators();
    this.announceCurrentImage();

    // Reset animation lock after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  updateImageStack() {
    const cards = this.imageStack.querySelectorAll(".image-card");

    cards.forEach((card, index) => {
      // Remove active class from all cards
      card.classList.remove("active");

      // Calculate new position relative to current index
      let relativeIndex =
        (index - this.currentIndex + this.totalImages) % this.totalImages;

      // Update data-index for CSS targeting
      card.setAttribute("data-index", relativeIndex);

      // Add active class to front card
      if (relativeIndex === 0) {
        card.classList.add("active");
      }

      // Apply transform and opacity based on position
      this.applyCardTransform(card, relativeIndex);
    });
  }

  applyCardTransform(card, position) {
    const transforms = {
      0: "translateZ(0px) rotateY(0deg)",
      1: "translateZ(-20px) rotateY(-5deg) translateX(10px)",
      2: "translateZ(-40px) rotateY(-10deg) translateX(20px)",
      3: "translateZ(-60px) rotateY(-15deg) translateX(30px)",
    };

    const opacities = {
      0: 1,
      1: 0.9,
      2: 0.7,
      3: 0.5,
    };

    const zIndices = {
      0: 5,
      1: 3,
      2: 2,
      3: 1,
    };

    card.style.transform = transforms[position] || transforms[3];
    card.style.opacity = opacities[position] || opacities[3];
    card.style.zIndex = zIndices[position] || zIndices[3];
  }

  updateIndicators() {
    const dots = this.indicatorDots.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
      dot.setAttribute(
        "aria-current",
        index === this.currentIndex ? "true" : "false"
      );
    });
  }

  setupIndicatorDots() {
    const dots = this.indicatorDots.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
      // Add click listener
      dot.addEventListener("click", () => {
        if (this.isAnimating) return;
        this.goToIndex(index);
      });

      // Add keyboard support
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!this.isAnimating) {
            this.goToIndex(index);
          }
        }
      });

      // Make dots focusable
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("role", "button");
    });
  }

  goToIndex(targetIndex) {
    if (targetIndex === this.currentIndex || this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = targetIndex;
    this.updateImageStack();
    this.updateIndicators();
    this.announceCurrentImage();

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  createAriaLiveRegion() {
    const ariaLive = document.createElement("div");
    ariaLive.setAttribute("aria-live", "polite");
    ariaLive.setAttribute("aria-atomic", "true");
    ariaLive.className = "sr-only";
    ariaLive.id = "image-announcer";
    ariaLive.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;

    document.body.appendChild(ariaLive);
    this.ariaLiveRegion = ariaLive;
  }

  announceCurrentImage() {
    if (!this.ariaLiveRegion) return;

    const imageData = [
      { title: "Air Max Collection", subtitle: "Revolutionary comfort" },
      { title: "Jordan Retro", subtitle: "Iconic basketball legacy" },
      { title: "Running Elite", subtitle: "Performance redefined" },
      { title: "Lifestyle Essentials", subtitle: "Everyday innovation" },
    ];

    const current = imageData[this.currentIndex];
    const announcement = `Showing ${current.title}, ${
      current.subtitle
    }. Image ${this.currentIndex + 1} of ${this.totalImages}`;

    // Clear and set new announcement
    this.ariaLiveRegion.textContent = "";
    setTimeout(() => {
      this.ariaLiveRegion.textContent = announcement;
    }, 100);
  }

  // Public method to get current state (useful for testing)
  getCurrentIndex() {
    return this.currentIndex;
  }
}

// Enhanced error handling and feature detection
class ImageStackApp {
  constructor() {
    this.rotator = null;
    this.init();
  }

  init() {
    // Check for required DOM elements
    if (!this.checkRequiredElements()) {
      console.error("Required DOM elements not found");
      return;
    }

    // Check for modern browser features
    if (!this.checkBrowserSupport()) {
      console.warn("Some features may not work in this browser");
    }

    // Initialize the rotator
    try {
      this.rotator = new ImageStackRotator();
      this.addPerformanceOptimizations();
      console.log("Image stack application initialized successfully");
    } catch (error) {
      console.error("Failed to initialize image stack:", error);
    }
  }

  checkRequiredElements() {
    const requiredIds = ["imageStack", "indicatorDots"];
    return requiredIds.every((id) => document.getElementById(id));
  }

  checkBrowserSupport() {
    const features = {
      transforms3d: "transform" in document.documentElement.style,
      transitions: "transition" in document.documentElement.style,
      addEventListener: "addEventListener" in window,
    };

    return Object.values(features).every((supported) => supported);
  }

  addPerformanceOptimizations() {
    // Preload hover styles to prevent janky animations
    const style = document.createElement("style");
    style.textContent = `
            .image-card { will-change: transform, opacity; }
            .dot { will-change: background-color, width; }
        `;
    document.head.appendChild(style);

    // Add passive event listeners where appropriate
    document.addEventListener(
      "scroll",
      () => {
        // Throttle any scroll-based animations if needed
      },
      { passive: true }
    );
  }
}

// Preloader functionality
class PreloaderManager {
  constructor() {
    this.preloader = document.getElementById("preloader");
    this.init();
  }

  init() {
    // Hide preloader after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hidePreloader();
      }, 800); // Show for a minimum of 800ms
    });
  }

  hidePreloader() {
    if (this.preloader) {
      this.preloader.classList.add("fade-out");
      setTimeout(() => {
        this.preloader.style.display = "none";
      }, 500);
    }
  }
}

// Initialize the application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ImageStackApp();
    new PreloaderManager();
  });
} else {
  new ImageStackApp();
  new PreloaderManager();
}

// Export for testing purposes (if in a module environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ImageStackRotator, ImageStackApp };
}
