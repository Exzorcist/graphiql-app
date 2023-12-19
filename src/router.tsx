import { createRoutesFromElements, Route } from 'react-router-dom';
import GraphqlEditorPage from './pages/GraphqlEditorPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';
import Root from '@/layout/Root';

const routerConfig = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/" element={<GraphqlEditorPage />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default routerConfig;
