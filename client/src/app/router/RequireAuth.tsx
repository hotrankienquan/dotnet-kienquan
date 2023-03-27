import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from 'react-toastify';
interface Props {
    roles?: string[];
}
export default function RequireAuth(props:Props) {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
    if (!user) {
        return <Navigate to='/login' state={{from: location}} />
    }
    if (props.roles && !props.roles.some(role => user.roles?.includes(role))) {
        toast.error("not authorised to access this area");
        return <Navigate to='/post'/>
    }
    return <Outlet />
}