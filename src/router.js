import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from './components/MainMenu.vue';
import NotFound from './components/NotFound.vue';
import TestScreen from './components/TestScreen.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: MainMenu },
      { path: '/tests/:testType', 
        component:  TestScreen, 
        props: true,
        beforeEnter: (to, from, next) => {
        const validTestTypes = ['hiragana', 'katakana', 'kanji'];
        if (validTestTypes.includes(to.params.testType)) {
          next();
        } else {
          next({ path: '/' })
        }
      } },
      { path: '/:notFound(.*)',name: 'NotFound', component: NotFound },
    ]
  });
  
export default router;