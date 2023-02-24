import { NavLink, Outlet } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-zinc-900 text-white ">
      <div className="w-full bg-black/70 py-4 flex items-center justify-center">
        <div className="max-w-[1280px] w-full px-4 flex justify-between">
          <div></div>
          <div className="flex gap-4">
            <NavLink
              className="p-2 rounded-md border border-white px-4 transition-all duration-50 hover:bg-white/20 "
              to="/register"
            >
              Create Account
            </NavLink>
            <NavLink className="p-2 rounded-md bg-blue-600 px-4" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
