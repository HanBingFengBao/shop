import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import About from '../views/AboutPage.vue'
import Favorites from '../views/Favorites/FavoritesPage.vue';
import PersonalCenter from '../views/PersonalCenter/PersonalCenter.vue';
import Talk from '../views/Talk/TalkPage.vue';
import EditPage from '../views/EditPage';       


// 定义路由
const routes = [
  
    {
        path: '/', /*主页 *********/
        name: 'HomePage',
        component: HomePage,
    }, 
    {
        path: '/center',  /**个人中心 */
        name: 'PersonalCenter',
        component: PersonalCenter,
    },
    {
        path: '/favorites', /*收藏页 */
        name: 'Favorites',
        component: Favorites,
      },
   
    {
        path: '/about', 
        name: 'About',
        component: About,
    },
    {
        path: '/talk', /*沟通对话页 */
        name: 'Talk',
        component: Talk,
    },
    {
        path: '/edit', /*上传商品页******** */
        name: 'EditPage',
        component: EditPage,
    },

  
];

// 创建路由实例
const router = createRouter({
     history: createWebHistory(),
  routes,
});

export default router;
