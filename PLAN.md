# Accessible Slideshow Implementation Plan

## Overview
Create a single-page HTML slideshow application with strong accessibility features for visually impaired users.

## Structure
- `index.html` - Main HTML file with all markup
- `styles.css` - Styles for accessible, high-contrast design
- `script.js` - JavaScript for slideshow logic

## HTML Structure

### Initial State
- Main container with ARIA landmark
- Large "Start" button (min 44x44px, high contrast text)
- Button uses `aria-label` for clarity

### Active Slideshow State
- **Slide Container**: `<div role="region" aria-live="polite">`
- **Slide Content**: Large centered text (minimum 32px, scalable via em/rem)
- **Slide Number Indicator**: Displayed in top right corner showing "X of Y" format with `aria-live="polite"`
- **Controls Panel**: 
  - Timer slider `<input type="range" min="1" max="15" step="0.5" aria-label="Slide duration in seconds">`
  - Increment/decrement buttons with `aria-label` (e.g., "Decrease duration by half second")
  - Play/Pause button with `aria-label` and state change announcements
  - Forward/Back buttons with appropriate labels
  - Loop toggle button with `aria-pressed` state

## Accessibility Features

### Keyboard Navigation
- All interactive elements focusable via Tab
- Hotkeys visible in button labels or aria-describedby
- Screen reader announces: "Press Left Arrow to decrease, Right Arrow to increase"
- Focus visible (high contrast outline)
- Skip links if needed

### Screen Reader Support
- Live regions announce slide changes
- Button states clearly communicated (aria-pressed, aria-expanded, etc.)
- Timer changes announced
- Loop state announced when toggled

### Visual Accessibility
- Large text (minimum 32px for slides, 16px for controls)
- High contrast colors (WCAG AA compliant)
- No flashing/jerking content
- Sufficient tap targets (44x44px minimum)

## Data Structure
```javascript
const slides = [
  { content: "Welcome to the presentation" },
  { content: "This is slide two" },
  // Easy to add more slides
];
```

## Implementation Logic

### State Management
- `currentSlideIndex`: tracks current slide
- `isPlaying`: boolean for play/pause state
- `timerDuration`: number in seconds (default 5)
- `isLooping`: boolean for loop toggle
- `timerId`: reference to setInterval

### Functions Needed
- `startSlideshow()`: hides start button, shows first slide, starts timer
- `showSlide(index)`: updates slide content, announces change, updates slide number display
- `startTimer()` / `stopTimer()`: manages interval
- `nextSlide()` / `prevSlide()`: navigation
- `updateTimerDisplay()`: updates slider and displayed value
- `updateSlideNumber()`: updates slide number indicator in top right
- `announceToScreenReader(message)`: uses live region for announcements

### Event Handlers
- Timer slider: `input` event for real-time updates
- Increment/decrement buttons: click event, modify timer duration
- Play/Pause: toggle timer, update button text/state
- Forward/Back: navigate and reset timer
- Loop toggle: update state and announce
- Keyboard shortcuts: Arrow keys for timer, Space for play/pause

## Styling Approach
- CSS custom properties for easy theming
- Flexbox/Grid for centering
- Responsive design (works on mobile and desktop)
- Print-friendly styles (optional)

## Testing Checklist
- Keyboard navigation works (Tab, Enter, Space, Arrow keys)
- Screen reader announces all changes
- All buttons have focus indicators
- Timer adjustments work correctly
- Loop toggle functions properly
- Slides cycle correctly when playing
- Start button disappears appropriately