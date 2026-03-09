import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import type { RootState, AppDispatch } from '@/store';
import { clearUser } from '@/store/slices/userSlice';

const Banner = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { logout } = useAuth0();

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('pendingRegistration');
    dispatch(clearUser());
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="w-full bg-primary py-4 px-8 flex items-center relative">
      {user && (
        <button onClick={handleLogout} className="text-white text-sm md:text-base font-normal tracking-normal absolute left-8 hover:text-white/80">
          Log out
        </button>
      )}
      <h1 className="text-4xl font-bold text-white text-center md:text-right w-full tracking-wider font-heading">
        Budgeteer
      </h1>
    </div>
  );
};

export default Banner;
