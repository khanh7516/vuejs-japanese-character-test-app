<template>
    <input class="card" 
           type="text" 
           v-model="userInput" 
           @input="updateValue"
           :class="{'correct': checkResult, 'incorrect': checkResult === false}">
</template>

<script>
export default {
    name: 'InputTextCard',
    props: {
        modelValue: String,
        checkResult: Boolean
    },
    computed: {
        userInput: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
}
</script>

<style>
.card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin: 5px;
    font-size: 12px;
    box-sizing: border-box; 
    text-align: center;
}

.correct {
    border: 2px solid green;
    color: green;
    font-weight: bold;
}

.incorrect {
    border: 2px solid red;
    color: red;
    font-weight: bold;
}
</style>
