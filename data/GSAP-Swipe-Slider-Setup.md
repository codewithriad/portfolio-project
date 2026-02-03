# GSAP Swipe Slider Scroll Effect - Google Antigravity Setup

## Quick Copy-Paste Implementation

---

## 📌 PART 1: ADD SCRIPTS (Copy to your Antigravity Head/Global Scripts)

```html
<script src="https://assets.codepen.io/16327/gsap-latest-beta.min.js"></script>
<script src="https://assets.codepen.io/16327/Observer.min.js"></script>
<script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js"></script>
```

---

## 📌 PART 2: ADD HTML STRUCTURE

Copy this entire block and paste into your Antigravity page:

```html
<header class="gsap-header">
  <div class="header-left">Animated Sections</div>
  <div class="header-right"><a href="#">Scroll Down</a></div>
</header>

<section class="gsap-section section-1">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Scroll Down</h2>
      </div>
    </div>
  </div>
</section>

<section class="gsap-section section-2">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Section Two</h2>
      </div>
    </div>
  </div>
</section>

<section class="gsap-section section-3">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Section Three</h2>
      </div>
    </div>
  </div>
</section>

<section class="gsap-section section-4">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Section Four</h2>
      </div>
    </div>
  </div>
</section>

<section class="gsap-section section-5">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Keep Scrolling</h2>
      </div>
    </div>
  </div>
</section>
```

---

## 📌 PART 3: ADD CSS STYLING

Copy all CSS and paste into your Antigravity Global Styles or Custom CSS:

```css
/* ===== RESET & BASE ===== */
* {
  box-sizing: border-box;
  user-select: none;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

body {
  font-family: 'Arial', sans-serif;
  color: #fff;
}

/* ===== HEADER ===== */
.gsap-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.gsap-header a {
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s;
}

.gsap-header a:hover {
  opacity: 0.7;
}

/* ===== SECTIONS ===== */
.gsap-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  visibility: hidden;
  z-index: 1;
}

.gsap-section.active {
  visibility: visible;
  z-index: 10;
}

/* Outer & Inner Wrappers */
.gsap-section .outer,
.gsap-section .inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Background Container */
.gsap-section .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Dark Overlay */
.gsap-section .bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.2)
  );
  z-index: 2;
}

/* Heading */
.section-heading {
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  max-width: 90%;
  position: relative;
  z-index: 3;
  margin: 0;
  letter-spacing: -2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.section-heading * {
  will-change: transform;
  display: inline-block;
}

.clip-text {
  overflow: hidden;
  display: inline-block;
}

/* ===== SECTION BACKGROUNDS ===== */
.section-1 .bg {
  background-image: url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=1200&fit=crop');
  background-position: center;
}

.section-2 .bg {
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1200&fit=crop');
  background-position: center;
}

.section-3 .bg {
  background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=1200&fit=crop');
  background-position: center;
}

.section-4 .bg {
  background-image: url('https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&h=1200&fit=crop');
  background-position: center;
}

.section-5 .bg {
  background-image: url('https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=1200&fit=crop');
  background-position: center;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .gsap-header {
    height: 60px;
    font-size: 12px;
  }

  .section-heading {
    font-size: clamp(1.5rem, 6vw, 3rem);
  }
}
```

---

## 📌 PART 4: ADD JAVASCRIPT (Main Animation Code)

Copy this entire JavaScript block and paste into your Antigravity custom JS/Global Scripts section:

```javascript
// Register GSAP plugins
gsap.registerPlugin(Observer);

// Get all DOM elements
let sections = document.querySelectorAll('.gsap-section');
let images = document.querySelectorAll('.gsap-section .bg');
let headings = gsap.utils.toArray('.section-heading');
let outerWrappers = gsap.utils.toArray('.gsap-section .outer');
let innerWrappers = gsap.utils.toArray('.gsap-section .inner');

// Split text for staggered animation
let splitHeadings = headings.map(heading => 
  new SplitText(heading, { 
    type: 'chars,words,lines', 
    linesClass: 'clip-text' 
  })
);

// State variables
let currentIndex = -1;
let wrap = gsap.utils.wrap(0, sections.length);
let animating = false;

// Initialize wrapper positions
gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

// Main animation function
function gotoSection(index, direction) {
  index = wrap(index);
  
  if (animating) return;
  animating = true;

  let fromTop = direction === -1;
  let dFactor = fromTop ? -1 : 1;

  let tl = gsap.timeline({
    defaults: { duration: 1.25, ease: 'power1.inOut' },
    onComplete: () => {
      animating = false;
    }
  });

  // Hide previous section
  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }, 0)
      .set(sections[currentIndex], { autoAlpha: 0 }, 0.3);
  }

  // Show new section
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 10 });

  // Animate wrappers (main entrance animation)
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
    { yPercent: 0 },
    0
  );

  // Animate background image
  tl.fromTo(
    images[index],
    { yPercent: 15 * dFactor },
    { yPercent: 0 },
    0
  );

  // Animate heading characters (staggered)
  tl.fromTo(
    splitHeadings[index].chars,
    {
      autoAlpha: 0,
      yPercent: 150 * dFactor
    },
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: 'power2',
      stagger: {
        each: 0.02,
        from: 'random'
      }
    },
    0.2
  );

  currentIndex = index;
}

// Create scroll observer
Observer.create({
  type: 'wheel,touch,pointer',
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, -1),
  onUp: () => !animating && gotoSection(currentIndex + 1, 1),
  tolerance: 10,
  preventDefault: true
});

// Initialize at first section
gotoSection(0, 1);
```

---

## 🎨 CUSTOMIZATION

### Change Animation Speed
Find this line in the JavaScript:
```javascript
defaults: { duration: 1.25, ease: 'power1.inOut' },
```
- Change `1.25` to your speed: `0.8` (fast), `1.5` (medium), `2` (slow)

### Change Easing Effect
Replace `'power1.inOut'` with:
- `'power2.inOut'` - More dramatic
- `'sine.inOut'` - Smoother
- `'cubic.inOut'` - Natural
- `'back.inOut'` - Slight bounce back

### Adjust Character Animation Speed
Find this line:
```javascript
stagger: {
  each: 0.02,
  from: 'random'
}
```
- `each: 0.02` → Change to `0.05` (slower) or `0.01` (faster)
- `from: 'random'` → Try `'start'`, `'end'`, `'center'` for different effects

### Change Background Images
In CSS, replace the URLs:
```css
.section-1 .bg {
  background-image: url('YOUR_IMAGE_URL');
}
```

### Adjust Scroll Sensitivity
In JavaScript:
```javascript
wheelSpeed: -1,      // Change to -0.5 (less sensitive) or -2 (more sensitive)
tolerance: 10,       // Change to 20 (less responsive) or 5 (more responsive)
```

---

## ✅ TESTING CHECKLIST

- [ ] Scripts loaded (check browser console for errors)
- [ ] Sections animate on scroll (wheel, trackpad, touch)
- [ ] Header stays visible at top
- [ ] Headings animate with staggered characters
- [ ] Background images load properly
- [ ] Mobile responsive (test on phone)
- [ ] No performance issues (smooth 60fps)

---

## 🆘 TROUBLESHOOTING

**Problem: Sections not animating**
- Check all 3 scripts are loaded in correct order
- Open browser console (F12) and look for errors
- Verify classes: `.gsap-section`, `.section-heading`, `.outer`, `.inner`, `.bg`

**Problem: Scrolling is jerky**
- Increase animation duration (try 1.5 or 2)
- Reduce wheelSpeed to -0.7 or -0.5
- Optimize background images (should be < 100KB)

**Problem: Characters not animating**
- Verify SplitText library is loaded
- Check `.section-heading` class is on all h2 elements
- Make sure `will-change: transform;` is in CSS

**Problem: Mobile not responding**
- Test on real device, not browser emulation
- Check `preventDefault: true` is in Observer
- Verify touch events work

**Problem: Header disappearing**
- Check header z-index: 999 (should be highest)
- Verify `position: fixed` on header
- Section z-index should be lower than header

---

## 📱 BROWSER SUPPORT

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| iOS     | ✅ Full |
| Android | ✅ Full |

---

## ⚡ PERFORMANCE TIPS

1. **Optimize Images**: Use max 200KB per image
2. **Use WebP**: Convert images to WebP for smaller size
3. **Lazy Load**: Consider lazy loading background images
4. **GPU**: GSAP uses GPU acceleration automatically
5. **Mobile**: Test on actual devices

---

## 📊 ADD MORE SECTIONS

To add a 6th section, just copy this and paste in your HTML:

```html
<section class="gsap-section section-6">
  <div class="outer">
    <div class="inner">
      <div class="bg">
        <h2 class="section-heading">Section Six</h2>
      </div>
    </div>
  </div>
</section>
```

Then add to CSS:
```css
.section-6 .bg {
  background-image: url('YOUR_IMAGE_URL');
}
```

**JavaScript will auto-detect it!** No changes needed.

---

## 🎯 ANIMATION BREAKDOWN

1. **Sections slide in** from top/bottom based on scroll direction
2. **Background image** parallax effect with slight zoom
3. **Heading text** characters appear with staggered timing
4. **Smooth transitions** between sections (1.25s default)
5. **Infinite loop** - scroll down after last section goes to first

---

## 🔗 USEFUL LINKS

- GSAP Docs: https://gsap.com/docs/
- Observer Plugin: https://gsap.com/docs/v3/Plugins/Observer/
- SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
- Easing Visualizer: https://gsap.com/gsap-core/gsap.html#easing

---

## 💡 PRO TIPS

1. **Add sound effects** - Trigger audio on section change
2. **Add scroll indicator** - Show which section you're on
3. **Add navigation dots** - Click to jump to section
4. **Change overlay colors** - Modify `rgba(0, 0, 0, 0.5)` in CSS
5. **Add text content** - Place additional text in `.bg` div
6. **Custom fonts** - Add Google Fonts in head and apply to body

---

## 🚀 READY TO GO!

Copy the 4 sections in order:
1. ✅ Scripts (Part 1)
2. ✅ HTML (Part 2)
3. ✅ CSS (Part 3)
4. ✅ JavaScript (Part 4)

Then customize colors, images, and timing to match your brand.

**Happy animating!** 🎨
