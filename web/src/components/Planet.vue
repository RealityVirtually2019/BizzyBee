<template>
    <a-sphere position="0 -7 -7" :radius="planetRadius" color="#EF2D5E">
        <b-flower :planetRadius="planetRadius" :offsetX="offsetX" :offsetY="offsetY"></b-flower>
        <b-flower
                v-for="(msg, idx) in msgs" :key="idx"
                :planetRadius="planetRadius" :offsetX="offsetX" :offsetY="offsetY" :stage="randomStage(idx)"></b-flower>
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
                msgs: [
                    {
                        name: 'Kai',
                        msg: 'Get well soon!',
                        flower: 0
                    },
                    {
                        name: 'Mo',
                        msg: 'Hope you feel better!',
                        flower: 1
                    },
                    {
                        name: 'Victoria',
                        msg: 'Get well soon!',
                        flower: 2
                    },
                    {
                        name: 'Lydia',
                        msg: 'See you soon!',
                        flower: 2
                    },
                    {
                        name: 'Jason',
                        msg: 'Hope your insurance is paid up!',
                        flower: 1
                    },
                ]

            }
        },
        components: {
            'b-flower': FlowerHolder
        },
        mounted() {
            var rotation = 360;
            this.offsetX = Math.random() * rotation;
            this.offsetY = Math.random() * rotation;
            console.log('this.offsetX:', this.offsetX);
        },
        methods: {
            randomStage(idx){
                return idx % 3
            },
        }

    }
</script>
