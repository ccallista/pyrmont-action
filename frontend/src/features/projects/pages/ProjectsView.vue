<template>
  <div class="projects-page">
    <ProjectsShowcase />
    <FilterBar />

    <ProjectsCardGrid
        heading="Open Projects"
        :projects="openProjects"
    />

    <ProjectsCardGrid
        heading="Planned Projects"
        :projects="plannedProjects"
    />

    <ProjectsCardGrid
        heading="Closed Projects"
        :projects="closedProjects"
    />

  </div>
</template>

<script setup>
import ProjectsShowcase from '@/features/projects/components/ProjectsShowcase.vue'
import FilterBar from '@/features/projects/components/ProjectsFilterBar.vue'
import ProjectsCardGrid from '@/features/projects/components/ProjectsCardGrid.vue'

</script>


<script>
  import { ref } from 'vue';
  import projects from "../services/projectServices"
  const openProjects = ref([]);
  const closedProjects = ref([]);
  const plannedProjects = ref([]);
  try{
    const response = await projects.viewProjects();
    const projectData = await response.json();
    openProjects.value = projectData.openProjects;
    closedProjects.value = projectData.closedProjects;
    plannedProjects.value = projectData.plannedProjects;
    
  }
  catch(error){
    console.log("Error with inserting images onto the webpage")
  }
 

</script>