import { Outlet } from 'react-router-dom';
import Banner from './Banner';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Banner />
    <Outlet />
  </div>
);

export default Layout;
