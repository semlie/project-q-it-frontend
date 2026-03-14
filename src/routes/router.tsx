import { RouterProvider, createBrowserRouter } from 'react-router';
import NotFoundPage from '../404/404';
import { Paths } from './paths.tsx';
import QaitLandingPage from '../homePage/homePage';
import QaitRegisterPage from '../register/register.tsx';
import QaitDashboardPage from '../Dashboard/dashboard.tsx';
import QaitCourseDetailsPage from '../Courses/courseDetails.tsx';
import QaitCourseChapterPage from '../Courses/chapterView.tsx';
import QaitCreateTest from '../createTest/createTest.tsx';
import QaitStudentStats from '../Stats/studentStats';
import QaitTeacherStats from '../Stats/teacherStats';
import { LoginPage } from '../login/login';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { RoleBasedRoute } from './RoleBasedRoute.tsx';
import TakeTest from '../TakeTest/TakeTest';
import QaitAddCourse from '../AddCourse/AddCourse';

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
      path: Paths.courseDetails,
      element: (
        <ProtectedRoute>
          <QaitCourseDetailsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.courseChapter,
      element: (
        <ProtectedRoute>
          <QaitCourseChapterPage />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.createTest,
      element: (
        <ProtectedRoute>
          <QaitCreateTest />
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.addCourse,
      element: (
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['teacher']}>
            <QaitAddCourse />
          </RoleBasedRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.studentStats,
      element: (
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['student']}>
            <QaitStudentStats />
          </RoleBasedRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.teacherStats,
      element: (
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['teacher']}>
            <QaitTeacherStats />
          </RoleBasedRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: Paths.takeTest,
      element: (
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={['student']}>
            <TakeTest />
          </RoleBasedRoute>
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
