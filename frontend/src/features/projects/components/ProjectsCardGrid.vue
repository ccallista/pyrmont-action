<template>
  <section class="projects-grid-section">
    <!-- Section Heading -->
    <h2 class="projects-grid-heading">{{ heading }}</h2>

    <!-- Projects Grid -->
    <div class="projects-grid">
      <article
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
      >
        <!-- Card Image -->
        <div class="project-card__image-container">
          <img
              class="project-card__image"
              :src="`/src/assets/News/${project.project_image}`"
              :alt="project.title"
          />
          <!-- Optional overlay that appears on hover
          <div class="project-card__image-overlay"></div>
          -->
        </div>

        <!-- Card Content -->
        <div class="project-card__info">
          <h3 class="project-card__title">{{ project.project_name }}</h3>
          <p class="project-card__body">{{ project.project_description }}</p>
          <!-- <p class="project-card__body">{{ project.extraText }}</p> -->

          <!-- Learn More Link -->

          <a :href="`/projects/${project.project_name}`" class="project-card__link">
            LEARN MORE
            <span class="arrow">→</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    default: 'Projects'
  },
  projects: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/* -----------------------------------------------------------
   1. SECTION WRAPPER
   ----------------------------------------------------------- */
.projects-grid-section {
  width: 100%;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to right, #f0f4f8, #fcfcfc);
  /* Subtle pattern, remove if you prefer solid color/gradient:
     background-image: url('data:image/svg+xml,...');
     background-repeat: repeat;
  */
  margin: 0 auto;
  max-width: 1400px; /* keeps content centered on wide screens */
}

/* -----------------------------------------------------------
   2. SECTION HEADING
   ----------------------------------------------------------- */
.projects-grid-heading {
  text-align: left;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(to right, #0077b6, #00b4d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

/* -----------------------------------------------------------
   3. GRID LAYOUT
   ----------------------------------------------------------- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
}

/* -----------------------------------------------------------
   4. CARD STYLING
   ----------------------------------------------------------- */
.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* -----------------------------------------------------------
   5. IMAGE CONTAINER & IMAGE
   ----------------------------------------------------------- */
.project-card__image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f2f2f2; /* fallback if image doesn’t load */
}

/* Card Image */
.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Optional overlay if you want to dim the image on hover
.project-card__image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.project-card:hover .project-card__image-overlay {
  opacity: 1;
}
*/

/* -----------------------------------------------------------
   6. CARD CONTENT / TEXT
   ----------------------------------------------------------- */
.project-card__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 1.2rem;
}

.project-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
}

.project-card__body {
  margin: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
}

/* -----------------------------------------------------------
   7. CALL-TO-ACTION LINK
   ----------------------------------------------------------- */
.project-card__link {
  margin-top: auto; /* pushes link to the bottom */
  align-self: flex-start;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  color: #0077b6;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.project-card__link:hover {
  color: #005c87; /* slightly darker color on hover */
  border-color: #005c87;
}

.arrow {
  margin-left: 4px;
}
</style>
