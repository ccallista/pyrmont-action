<template>
  <section class="filter-bar">
    <h2 class="filter-heading">Filter</h2>

    <div class="filter-buttons">
      <button class="filter-btn">All categories</button>
      <button class="filter-btn">All dates</button>
      <!-- Add more buttons here if needed -->
    </div>

    <hr class="filter-divider" />
  </section>
</template>

<script setup>
// Add props/emits if you need interactive filtering.
</script>

<style scoped>
/* ---------------------------------------------------
   1. ANIMATIONS
   --------------------------------------------------- */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(6%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes swirlbg {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(2%, 2%) rotate(1.5deg);
  }
}

/* ---------------------------------------------------
   2. FILTER BAR (FULL-WIDTH)
   --------------------------------------------------- */
.filter-bar {
  width: 100%;           /* Full width across the page */
  position: relative;
  padding: 3rem 2rem 1.5rem;
  margin: 0;             /* No default margin */
  box-sizing: border-box;
  overflow: hidden;

  /* Warm golden gradient background */
  background: linear-gradient(135deg, #fff6ea 0%, #fce8c5 100%);

  /* Box shadow for depth, plus a subtle lift on hover */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;

  /* No border-radius -> crisp edges for full-width layout */
  border-radius: 0;
}

/* Slight hover-lift effect */
.filter-bar:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

/* 2.1 Swirl overlay for gentle motion */
.filter-bar::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.5),
      transparent 50%
  );
  pointer-events: none;
  opacity: 0.7;
  animation: swirlbg 12s ease-in-out infinite alternate;
  z-index: 1;
}

/* 2.2 Wave shape at the bottom */
.filter-bar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #fff6ea 0%, #fce8c5 100%);
  mask: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'><path fill='%23000000' d='M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'></path></svg>");
  mask-repeat: no-repeat;
  mask-size: cover;
  pointer-events: none;
  z-index: 2;
}

/* ---------------------------------------------------
   3. HEADING
   --------------------------------------------------- */
.filter-heading {
  margin: 0 0 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  z-index: 3; /* above swirl overlay */

  /* Golden gradient text */
  background: linear-gradient(to right, #EBBD6D 0%, #f3c98d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Soft glow around the text */
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.15), 0 0 8px rgba(203, 144, 73, 0.2);
}

/* ---------------------------------------------------
   4. FILTER BUTTONS
   --------------------------------------------------- */
.filter-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 3; /* above swirl overlay */
}

/* Individual Buttons */
.filter-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #EBBD6D;
  border-radius: 6px;
  background-color: transparent;
  color: #EBBD6D;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
      background-color 0.3s ease,
      color 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.3s ease;
}
.filter-btn:hover {
  background-color: #EBBD6D;
  color: #fff8ef;
  box-shadow: 0 3px 10px rgba(203, 144, 73, 0.15);
  transform: translateY(-1px);
}

/* ---------------------------------------------------
   5. DIVIDER
   --------------------------------------------------- */
.filter-divider {
  margin: 0;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 3; /* above swirl overlay */
}

/* ---------------------------------------------------
   6. RESPONSIVENESS
   --------------------------------------------------- */
@media (max-width: 480px) {
  .filter-bar {
    padding: 2rem 1.5rem;
  }
  .filter-heading {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
  .filter-btn {
    font-size: 0.9rem;
  }
}

</style>
