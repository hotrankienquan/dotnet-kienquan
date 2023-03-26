import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function RequireAuth() {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
  console.log({
      "check location require auth compo": location
    })
    if (!user) {
        return <Navigate to='/login' state={{from: location}} />
    }

    return <Outlet />
}