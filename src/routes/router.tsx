import { RouterProvider, createBrowserRouter } from 'react-router';
import NotFoundPage from '../404/404';
import QaitLoginPage from '../login/login';
import { Paths } from './paths.tsx';
import QaitLandingPage from '../homePage/homePage';
import QaitRegisterPage from '../register/register.tsx';
import QaitQuizPage from '../Qustion/qustion.tsx';


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
      path: Paths.register,
      element: <QaitRegisterPage />,
    },
    {
      path: '*',
      element: <NotFoundPage/>,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
