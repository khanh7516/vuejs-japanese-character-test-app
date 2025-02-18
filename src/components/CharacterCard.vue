<template>
    <div>
        <div class="card" :class="{'correct': checkResult, 'incorrect': checkResult === false}">
            {{ character }}
        </div>
        <span v-show="isResultDisplayed" :class="{'correct-text': checkResult, 'incorrect-text': checkResult === false}">
            {{ value }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'CharacterCard',
    props: {
        character: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        isResultDisplayed: {
            type: Boolean,
            required: false,
            default: false
        },
        checkResult: {
            type: Boolean,
            required: false,
        }
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
    font-weight: bold;
    box-sizing: border-box; 
}

.correct {
    border: 2px solid green;
    color: green;
}

.incorrect {
    border: 2px solid red;
    color: red;
}

.correct-text {
    color: green;
    font-weight: bold;
}

.incorrect-text {
    color: red;
    font-weight: bold;
}
</style>
