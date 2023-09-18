import Home from "../pages/Home/home";
import LoginPage from "../pages/login/login"
import NotFound from "../pages/NotFound/notfound"
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";

const publicRoute =[
    {path: '/', component: Home},
    {path: '/login', component: LoginPage, layout: null},
    {path: '/account', component: Profile},
    {path: '/register', component: Register, layout: null},
    {path: '*', component: NotFound},
    
]

const privateRoute = [];

export {publicRoute, privateRoute}