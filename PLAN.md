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
- Theme toggle button (visible in top-left corner) for switching between light and dark themes
- Large "Start" button (min 44x44px, high contrast text)
- Button uses `aria-label` for clarity

### Active Slideshow State
- **Slide Container**: `<div role="region" aria-live="polite">`
- **Slide Content**: Large centered text (minimum 32px, scalable via em/rem)
- **Slide Number Indicator**: Displayed in top right corner showing "X of Y" format with `aria-live="polite"`
- **Theme Toggle Button**: Button (in top-left corner) to switch between light and dark themes with appropriate ARIA attributes
- **Controls Panel**: 
  - Timer slider `<input type="range" min="1" max="15" step="0.5" aria-label="Slide duration in seconds">`
  - Increment/decrement buttons with `aria-label` (e.g., "Decrease duration by half second")
  - Play/Pause button with `aria-label` and state change announcements
  - Forward/Back buttons with appropriate labels
  - Speech toggle button with `aria-pressed` state (enabled by default)

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
- Speech state announced when toggled
- Speech synthesis reads slide content aloud when enabled (default)

### Visual Accessibility
- Large text (minimum 32px for slides, 16px for controls)
- High contrast colors (WCAG AA compliant) in both light and dark themes
- No flashing/jerking content
- Sufficient tap targets (44x44px minimum)
- Light and dark theme options for visual comfort

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
- `isSpeechEnabled`: boolean for speech synthesis toggle (default true)
- `isDarkTheme`: boolean for theme state (default false)
- `timerId`: reference to setInterval

### Functions Needed
- `startSlideshow()`: hides start button, shows first slide, starts timer
- `showSlide(index)`: updates slide content, announces change, updates slide number display, speaks content if enabled
- `startTimer()` / `stopTimer()`: manages interval
- `nextSlide()` / `prevSlide()`: navigation
- `updateTimerDisplay()`: updates slider and displayed value
- `updateSlideNumber()`: updates slide number indicator in top right
- `speakSlide(content)`: uses browser's Speech Synthesis API to read slide content aloud if enabled
- `toggleSpeech()`: enables/disables speech synthesis
- `toggleTheme()`: switches between light and dark color schemes
- `announceToScreenReader(message)`: uses live region for announcements

### Event Handlers
- Timer slider: `input` event for real-time updates
- Increment/decrement buttons: click event, modify timer duration
- Play/Pause: toggle timer, update button text/state
- Forward/Back: navigate and reset timer
- Speech toggle: enable/disable speech synthesis and announce
- Keyboard shortcuts: Arrow keys for timer, Space for play/pause

## Styling Approach
- CSS custom properties for easy theming with light and dark themes
- Light theme: White background, black text, blue accents, orange focus
- Dark theme: Dark gray background (#1a1a1a), white text, light blue accents, yellow focus
- Both themes maintain WCAG AA contrast ratios
- Flexbox/Grid for centering
- Responsive design (works on mobile and desktop)
- Print-friendly styles (optional)

## Testing Checklist
- Keyboard navigation works (Tab, Enter, Space, Arrow keys)
- Screen reader announces all changes
- All buttons have focus indicators
- Timer adjustments work correctly
- Speech toggle enables/disables synthesis properly
- Speech synthesis reads slide content when enabled
- Speech synthesis is silent when disabled
- Slides cycle correctly when playing
- Start button disappears appropriately