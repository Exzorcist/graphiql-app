import { createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy } from 'react-lazy-no-flicker';
import { selectIsAuth } from '@/redux/slices/userSlice';

import Root from '@/layout/Root';
import GraphqlEditorPage from './pages/GraphqlEditorPage';

interface IRouteRedirectProps {
  element: React.ReactElement;
  path: string;
}

function RouteRedirect({ element, path }: IRouteRedirectProps): React.ReactElement {
  const isLoggedIn = useSelector(selectIsAuth);

  if (path !== '/') {
    return isLoggedIn ? element : <Navigate to={path} />;
  }

  return isLoggedIn ? <Navigate to={path} /> : element;
}

const Welcome = lazy(() => import('./pages/Welcome'));
const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const NotFound = lazy(() => import('./pages/NotFound'));

const routerConfig = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/" element={<RouteRedirect element={<GraphqlEditorPage />} path="/welcome" />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/login" element={<RouteRedirect element={<Login />} path="/" />} />
    <Route path="/registration" element={<RouteRedirect element={<Registration />} path="/" />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default routerConfig;
