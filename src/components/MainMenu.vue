<template>
    <div>
        <h1>Main Menu</h1>
        <ul class="menu">
            <div class="menu-item" v-for="test in tests" :key="test.type">
                <router-link :to="`/tests/${test.type}`">
                    {{ capitalize(test.type) }} Test
                </router-link>
            </div>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getTests']),
        tests() {
            return this.getTests;
        }
    },
    methods: {
        capitalize(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
};
</script>

<style>
.menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
}
.menu-item {
    margin: 1rem;
}
</style>
