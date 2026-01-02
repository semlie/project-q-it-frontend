import { RouterProvider, createBrowserRouter } from 'react-router';
import NotFoundPage from '../404/404';
import QaitLoginPage from '../login/login';
import { Paths } from './paths.tsx';
import QaitLandingPage from '../homePage/homePage';


const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <QaitLandingPage />,
      children: [
        {
          path: Paths.home,
          element: <QaitLandingPage />,
        },
      ],
    },

    {
      path: Paths.login,
      element: <QaitLoginPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
