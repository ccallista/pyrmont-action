<script>
    import projectImg1 from '@/assets/Projects/image_1.png'

    const openProjects = 
        {
            image: '@/assets/Projects/image_1.png',
            title: 'Open Project Title 1',
            description: 'Lorem ipsum dolor sit amet...',
            extraText: 'Additional text...'
        }
    
</script>


<template>
    <div class="left-container">

        <img src=@/assets/Projects/image_1.png alt='project image'/>
        <h1>Project 1</h1>
        <p> description </p>
        <p> extra text </p>
        
    </div>
</template>

<style>
    .left-container{
        width: 75vw;
        display: flex;
    }

</style>