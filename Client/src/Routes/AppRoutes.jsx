import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import Dashboard from "../Layout/AdminLayout/Dashboard";
import Users from "../Layout/AdminLayout/Users";
import UserLayout from "../Layout/UserLayout/UserLayout";
import LanguagesAdd from "../Pages/Admin/Languages/LanguagesAdd";
import LanguageShow from "../Pages/Admin/Languages/LanguageShow";
import SkillsAdd from "../Pages/Admin/Skills/SkillsAdd";
import SkillsShow from "../Pages/Admin/Skills/SkillsShow";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import VerifiedAlready from "../Pages/Auth/VerifiedAlready";
import Verify from "../Pages/Auth/Verify";
import VerifyError from "../Pages/Auth/VerifyError";
import VerifySuccess from "../Pages/Auth/VerifySuccess";
import CreateSkillGig from "../Pages/User/CreateSkillGig/CreateSkillGig";
import Explore from "../Pages/User/Explore/Explore";
import { Home } from "../Pages/User/Home/Home";

import { createBrowserRouter } from "react-router-dom";





const router = createBrowserRouter([

    // User panel Routes 
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            }, 
            {
                path: '/signin',
                element: <Signin />
            },
             {
                path: '/verify/:token',
                element: <Verify   />
            },
              {
                path: '/verify-success',
                element: <VerifySuccess />
            },
              {
                path: '/verify-error',
                element: <VerifyError />
            },
            {
  path: '/verified-already',
  element: <VerifiedAlready />
},

            {
                path: '/',
                element: <Home />
            },
            {
                path: '/explore',
                element: <Explore />
            },
            {
                path: '/createskillgig',
                element: <CreateSkillGig />
            },
        ]
    },
    // Admin Panel Routes 
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            },
            {
                path: '/admin/skillsadd',
                element: <SkillsAdd />
            },
            {
                path: '/admin/skillsshow',
                element: <SkillsShow />
            },
             {
                path: '/admin/languageadd',
                element: <LanguagesAdd />
            },
             {
                path: '/admin/languageshow',
                element: <LanguageShow />
            },
        ]
    },
])
export default router;
