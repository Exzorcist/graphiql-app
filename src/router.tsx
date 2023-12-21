import { createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@/redux/reducers/UserSlice';

import Root from '@/layout/Root';
import GraphqlEditorPage from './pages/GraphqlEditorPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';

interface IRouteRedirectProps {
  element: React.ReactNode;
  path: string;
}

function RouteRedirect({ element, path }: IRouteRedirectProps): React.ReactElement {
  const isLoggedIn = useSelector(selectIsAuth);

  if (path !== '/') {
    return isLoggedIn ? (element as React.ReactElement) : <Navigate to={path} />;
  }

  return isLoggedIn ? <Navigate to={path} /> : (element as React.ReactElement);
}

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
