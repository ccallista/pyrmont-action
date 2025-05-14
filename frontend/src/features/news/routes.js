// src/features/news/routes.js
export const newsRoutes = [
    {
        path: '/news',
        component: () => import('./NewsLayout.vue'),
        children: [
            {
                path: '',
                name: 'news',
                component: () => import('./pages/NewsView.vue'),
            },
        ],
    },
    {
        path: '/news/:id',
        name: 'IndividualNews',
        component: () => import('./pages/NewsIndividualView.vue'),
    },
]