<template>
  <div class="projects-page">
    <ProjectsShowcase />
    <FilterBar />

    <ProjectsCardGrid
        heading="Open Projects"
        :projects=project
    />

  </div>
</template>

<script setup>
    import ProjectsShowcase from '@/features/projects/components/ProjectsShowcase.vue'
    import FilterBar from '@/features/projects/components/ProjectsFilterBar.vue'
    import ProjectsCardGrid from '@/features/projects/components/ProjectsCardGrid.vue'
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router'
    import projects from "../services/projectServices"
    const route = useRoute();
    const project = ref([]);
    let response;

    watch(() => route.params.projectType, fetchData, {immediate: true})

    async function fetchData(id){
        try{
            if(id === "open"){
              console.log("it as here")
              response = await projects.viewOpenProjects();
            }

            if(id === "closed"){
              response = await projects.viewClosedProjects();
            }
          
            const projectData = await response.json();
            project.value = projectData.projects;
        }

        catch(error){
            console.log("Error with inserting images onto the webpage")
        }
    }


  

 

</script>