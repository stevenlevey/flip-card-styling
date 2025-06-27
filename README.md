# Nike Landing Page - Image Stack Rotator

A modern, accessible web application featuring a rotating stack of four images with keyboard navigation, built following Nike's design system principles.

## Features

✨ **Image Stack Rotation**: Four layered images that rotate with smooth 3D animations
🎹 **Keyboard Navigation**: Use right/left arrow keys to navigate through images
🖱️ **Multiple Interaction Methods**: Click on images or indicator dots
📱 **Responsive Design**: Optimized for all screen sizes
♿ **Accessibility Features**: Full keyboard support, screen reader announcements, and WCAG compliance
🎨 **Nike Design System**: Follows the provided design system for colors, typography, and spacing
⚡ **Preloader Animation**: Smooth loading experience with animated Nike logo
🎯 **Enhanced Visual Effects**: Gradient text, improved shadows, and micro-interactions
🔄 **Card Entrance Animations**: Staggered card appearance with smooth transitions
✨ **Subtle Brand Elements**: Background gradients and refined typography for premium feel

## Navigation Controls

- **Right Arrow Key**: Rotate to next image
- **Left Arrow Key**: Rotate to previous image
- **Click**: Click on image stack or indicator dots to navigate
- **Keyboard**: Tab to focus elements, Enter/Space to activate

## Technical Implementation

### Architecture

- **HTML**: Semantic structure with ARIA labels for accessibility
- **CSS**: Modern CSS with 3D transforms and smooth transitions
- **JavaScript**: Modular class-based architecture with error handling

The JavaScript architecture includes three main classes:

- `ImageStackRotator`: Core functionality for image rotation and navigation
- `ImageStackApp`: Application initialization and coordination
- `PreloaderManager`: Loading state management and smooth transitions

### Key Technologies

- CSS 3D Transforms for stack effect
- CSS Grid and Flexbox for responsive layout
- CSS Custom Properties for theming
- CSS Keyframe Animations for enhanced UX
- ARIA Live regions for screen reader support
- Intersection Observer API for performance optimization
- Modular JavaScript Classes for maintainability

### Browser Support

- Modern browsers with CSS 3D transform support
- Graceful degradation for older browsers
- Mobile-first responsive design

## File Structure

```
nike-landings-screen/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
├── design-system.json  # Nike design system reference
├── project-requirements.md # Project specifications
└── README.md           # This file
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **Use the right arrow key** to rotate through the image stack
4. **Enjoy** the smooth animations and responsive design!

### Local Development

For local development with live reload:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Or simply open index.html directly in your browser
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: ARIA labels and live regions for announcements
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Support for high contrast mode
- **Semantic HTML**: Proper heading structure and landmark regions

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## Performance Optimizations

- **CSS**: `will-change` properties for smooth animations
- **JavaScript**: Debounced event handlers and animation locks
- **Images**: Optimized gradients instead of heavy image files
- **Loading**: Minimal DOM manipulation and efficient event delegation
- **Preloader**: Optimized loading experience with fade-out transition
- **Animation Performance**: Hardware-accelerated transforms and cubic-bezier easing
- **Memory Management**: Proper event cleanup and efficient DOM queries

## Customization

### Visual Enhancements

The application includes several premium visual effects:

- **Gradient Text Effect**: Main heading uses gradient background-clip for premium look
- **Multi-layer Shadows**: Sophisticated shadow system with multiple layers for depth
- **Subtle Background**: Radial gradients for visual interest without distraction
- **Card Entrance Animations**: Staggered animations with delays for smooth appearance
- **Enhanced Indicators**: Circular dots with ripple animations and improved styling
- **Preloader Animation**: Floating Nike logo with smooth fade-out transition

### Colors

Edit the CSS custom properties or modify the gradient backgrounds in the HTML to match your brand colors.

### Images

Replace the gradient backgrounds in the `.image-card` elements with actual images:

```html
<div
  class="image-placeholder"
  style="background-image: url('your-image.jpg');"
></div>
```

### Content

Update the text content in the `.image-content` sections to match your products or messaging.

## Testing

The application has been tested for:

- ✅ Keyboard accessibility
- ✅ Screen reader compatibility
- ✅ Mobile responsiveness
- ✅ Cross-browser compatibility
- ✅ Performance on various devices
- ✅ Animation performance and smoothness
- ✅ Loading states and preloader functionality
- ✅ Reduced motion preferences compliance

## Design System Compliance

This application follows the Nike design system specifications including:

- Typography scales and font weights with enhanced gradient effects
- Color palette and usage with subtle brand-appropriate gradients
- Spacing and layout principles with improved visual hierarchy
- Component patterns and interactions with premium micro-interactions
- Animation timing and easing with sophisticated cubic-bezier curves
- Accessibility standards with enhanced focus indicators
- Brand consistency with refined Nike aesthetic elements

## License

This project is for demonstration purposes and follows Nike's design principles as specified in the provided design system.
