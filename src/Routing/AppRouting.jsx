import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from '../Layouts/MainLayouts';
import AuthLayout from '../Layouts/AuthLayout';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/notfound/Notfound';
import Profile from '../Pages/Profile/Profile';
import Login from '../Pages/Auth/login/Login';
import Register from '../Pages/Auth/Register/Register';
import PostDetails from '../Pages/postDetails/PostDetails';
import AuthProtected from '../Components/guard/authProtected/AuthProtected';
import MainProtectedRoute from '../Components/guard/mainProtectedRoute/MainProtectedRoute';


export const routes = createBrowserRouter([
    {
        path: "", element:<MainProtectedRoute> <MainLayouts /></MainProtectedRoute> ,children: [
            { index: true, element: <Home/> },
            { path: 'profile', element: < Profile /> },
              { path: 'PostDetails/:postId', element: <PostDetails/> },
            { index: '*', element: <NotFound /> },

        ]
    },
    {
        path: 'auth', element:<AuthProtected><AuthLayout /></AuthProtected>, children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Register /> }
        ]
    },



])










export default function AppRouting() {
    return (
        <div>

        </div>
    )
}