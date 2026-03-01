import { RouterProvider, createBrowserRouter } from 'react-router';
import NotFoundPage from '../404/404';
import { Paths } from './paths.tsx';
import QaitLandingPage from '../homePage/homePage';
import QaitRegisterPage from '../register/register.tsx';
import QaitQuizPage from '../Qustion/qustion.tsx';
import QaitDashboardPage from '../Dashboard/dashboard.tsx';
import { LoginPage } from '../login/login';
import { ProtectedRoute } from './ProtectedRoute.tsx';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <QaitLandingPage />,
    },
    {
      path: Paths.login,
      element: <LoginPage/>,
    },
    {
      path: Paths.register,
      element: <QaitRegisterPage/>,
    },
    {
      path: Paths.dashboard,
      element: (
        <ProtectedRoute>
          <QaitDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFoundPage/>,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
