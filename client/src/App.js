import { lazy, Suspense, useState } from 'react';
import useBreakpoint from './hooks/useBreakoint';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './routes/guards/ProtectedRoute';
import Loader from './shared/components/Loader';
import Modal from './shared/components/Modal';
import Confirmation from './shared/components/Confirmation';

const Login = lazy(() => import('./components/modules/auth/Login'));
const Users = lazy(() => import('./components/modules/users-management/users-list/Users'));


const TestComp = () => {
  return (
    <Modal/>
  )
}

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const isLargeScreen = useBreakpoint('lg');

  const closeSidebar = () => {
    setSideBarOpen(false);
  }
  const openSidebar = () => {
    setSideBarOpen(true);
  }

  return (
    <AuthProvider>
      <Router >
        <Suspense fallback={(<Loader />)}>
          <Layout sideBarOpen={sideBarOpen} isLargeScreen={isLargeScreen}
            openSidebar={openSidebar} closeSidebar={closeSidebar} >
            <Switch>
              <ProtectedRoute exact path='/' component={TestComp}/>
              <ProtectedRoute exact path='/users' component={Users}/>
              <Route exact path="/login" component={Login} />
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
