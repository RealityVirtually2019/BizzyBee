<template>
    <a-sphere position="0 -7 -7" :radius="planetRadius" color="#EF2D5E">
        <b-flower :planetRadius="planetRadius" :offsetX="offsetX" :offsetY="offsetY"></b-flower>
    </a-sphere>
</template>

<script>
    import FlowerHolder from '@/components/FlowerHolder'

    // @ is an alias to /src
    export default {
        name: 'Planet',
        data() {
            return {
                planetRadius: 7,
                offsetX: 0,
                offsetY: 0,
                welcomeText: 'Welcome to the home of the Bee',
            }
        },
        components: {
            'b-flower': FlowerHolder
        },
        mounted() {
            var rotation = Math.PI * 2;
            this.offsetX = Math.random() * rotation - rotation * 0.5;
            this.offsetY = Math.random() * rotation - rotation * 0.5;
        },

    }
</script>
