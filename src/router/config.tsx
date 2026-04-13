import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/home/page';
import AboutPage from '@/pages/about/page';
import NewsPage from '@/pages/news/page';
import ActivitiesPage from '@/pages/activities/page';
import AdhesionPage from '@/pages/adhesion/page';
import NotFound from '@/pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/news', element: <NewsPage /> },
  { path: '/activities', element: <ActivitiesPage /> },
  { path: '/adhesion', element: <AdhesionPage /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
