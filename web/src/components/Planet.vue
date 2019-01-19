<template>
    <a-sphere position="0 -7 -7" :radius="planetRadius" color="#EF2D5E">
        <b-flower
                v-for="(msg, idx) in popMsgs" :key="idx"
                :planetRadius="planetRadius" :type="msg.flower" :stage="randomStage(idx)"></b-flower>
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
                    }
                ]

            }
        },
        components: {
            'b-flower': FlowerHolder
        },
        mounted() {
        },
        computed: {
            popMsgs(){
                let MAX_FLOWERS = 100;
                let msgs = [];

                for(var i = 0; i < MAX_FLOWERS; i++){
                    msgs.push(this.msgs[i % this.msgs.length]);
                }

                return msgs;
            }
        },
        methods: {
            randomStage(idx) {
                return idx % 3
            },
        }

    }
</script>
