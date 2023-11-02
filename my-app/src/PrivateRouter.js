import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const token = window.localStorage.getItem('userInfo');
  return token ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRouter;