<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router'

    import projects from "../services/projectServices"
    const individualProject = ref([])
    const route = useRoute();
    watch(() => route.params.projectName, fetchData, {immediate: true})

    async function fetchData(id){

        try{
            const response = await projects.getIndividualProjects(id);
            const projectData = await response.json();
            individualProject.value = projectData.project;
            console.log(individualProject.value)
        }

        catch(error){
            console.log("Error with inserting images onto the webpage")
        }
    }



</script>


<template>
    <div class="left-container">
        <div class="content">
            <img class="image-top" :src="`/src/assets/Projects/${individualProject.project_image}`" alt='project image'/>
            <h1 class="projectName-heading">{{ individualProject.project_name }}</h1>
            <p> {{ individualProject.project_description }} </p>
        </div>
    </div>
</template>

<style>
    .left-container{
        width: 65vw;
        display: flex;
        flex-direction: column;
        
    }
    .content{
        padding-top: 20px;
        padding-left: 30px;
    }
    .image-top{
        width: 100%;
        height:550px;
        padding-bottom: 35px
    }

    .projectName-heading{
        font-family: Inter;
    }
    

</style>