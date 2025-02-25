<template>
    <div class="container">
        <div>
            <h1>This is {{ testType }} test!</h1>
            <div v-if="hasCharacters">
                <h2 v-show="!isTestFinished">Level {{ level }}</h2>
                <h3 v-show="!isTestFinished">Step {{ steps }}</h3>
                <p  v-show="!isTestFinished">*Answer 3 steps correctly each level to move to the next level</p>
            </div>
        </div>
        <div v-if="hasCharacters">
            <div>
                <ul v-show="!isTestFinished">
                    <CharacterCard v-for="key, index in randomKeys" :key="key" :character="key" :value="characters[key]" :is-result-displayed="isResultDisplayed" :checkResult="results[index]"/>
                </ul>
                <ul v-show="!isTestFinished">
                    <InputTextCard v-for="key, index in randomKeys" :key="key" v-model="userAnswers[key]" :checkResult="results[index]"/>
                </ul>
                <p v-show="isTestFinished">Your test is complete!</p>
            </div>

            <div>
                
                <button class="the-button" :disabled="isButtonDisabled" @click="isTestFinished ? backToTheHomePage() : submitAnswer()">
                    {{ isTestFinished ? "Go back to the main menu" : "Submit Answer" }}
                </button>
            </div>

        </div>
        <div v-else>
            <p>Sorry this test is not avaiable now!</p>
        </div>
        <div>
            <p v-show="!isTestFinished">
                    Go back to the <router-link to="/">main menu</router-link>
            </p>
        </div>

    </div>
</template>

<script>
import CharacterCard from './CharacterCard.vue';
import InputTextCard from './InputTextCard.vue';
export default {
    name: 'TestScreen',
    components: {
        CharacterCard,
        InputTextCard
    },
    props: {
        testType: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            steps: 1,
            level: 1,
            isCorrect: true,
            characters: this.$store.getters.getTestByType(this.testType).characters,
            keys: Object.keys(this.$store.getters.getTestByType(this.testType).characters),
            correctAnswerToDisplay: [],
            randomKeys: [],
            levelKeyCount: [3, 5, 7, 9, 15, 20],
            isTestFinished: false,
            userAnswers: {},
            results: [],
            isResultDisplayed: false,
            isButtonDisabled: false
        };
    },
    computed: {
    hasCharacters() {
        return this.characters && Object.keys(this.characters).length > 0;
        }
    },

    methods: {
        submitAnswer() {
            let levelCount = this.level;
            let stepCount = this.steps;
            this.isButtonDisabled = true;

            this.results = this.randomKeys.map(key => {
                const correctAnswer = this.characters[key];
                const userAnswer = this.userAnswers[key]?.trim();
                return correctAnswer === userAnswer;
            });
            this.correctAnswerToDisplay = this.randomKeys.map(key => this.characters[key]);

            if (!this.results.includes(false)) {
                stepCount++;
            }
            if (stepCount === 4) {
                if (this.level < this.levelKeyCount.length) {
                    levelCount++;
                }else if(this.level === this.levelKeyCount.length){
                    this.isTestFinished = true;
                }
                stepCount = 1;
            }
            this.isResultDisplayed = true;
            setTimeout(() => {
                this.isResultDisplayed = false;
                this.level = levelCount;
                this.steps = stepCount;
                this.getRandomKeys();
                this.userAnswers = {};
                this.isButtonDisabled = false;
                this.results = [];
            }, 3000);

        },
        getRandomKeys() {
            const shuffled = [...this.keys].sort(() => 0.5 - Math.random());
            const count = this.levelKeyCount[this.level - 1] || 15;
            this.randomKeys = shuffled.slice(0, count);
        },
        backToTheHomePage() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.getRandomKeys();
    }
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.correct-answer {
    display: flex;
    justify-content: center;
    margin: 5px;
}

ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

li {
    margin: 0.2rem;
}

.the-button {
    background: linear-gradient(to right, #4CAF50, #45A049);
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.the-button:hover {
    background: linear-gradient(to right, #45A049, #3e8e41);
    transform: scale(1.05);
}

.the-button:active {
    transform: scale(0.98);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.the-button:disabled {
    background: gray;
    cursor: not-allowed;
    opacity: 0.6;
}

</style>
