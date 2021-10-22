import { lazy, Suspense, useState } from 'react';
import useBreakpoint from './hooks/useBreakoint';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

const Login = lazy(() => import('./components/modules/auth/Login'));


const TestComp = () => {
  return (
    <h1>HELLO APP</h1>
  )
}

const Loading = () => {
  return (
    <h1>Loading ...</h1>
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
        <Suspense fallback={(<Loading />)}>
          <Layout sideBarOpen={sideBarOpen} isLargeScreen={isLargeScreen}
            openSidebar={openSidebar} closeSidebar={closeSidebar} >
            <Switch>
              <ProtectedRoute exact path='/' component={TestComp}/>
              <Route exact path="/login" component={Login} />
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
