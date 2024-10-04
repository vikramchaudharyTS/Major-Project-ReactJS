import Dashboard from "../Pages/Dashboard";
import Explorer from "../Pages/Explorer";
import LandingPage from "../Pages/LandingPage";
import Messages from "../Pages/Messages";
import ProfilePage from "../Pages/ProfilePage";
import {Routes, Route} from 'react-router-dom'

function Routing(){
    return(
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/messages" element={<Messages />}></Route>
            <Route path="/explorer" element={<Explorer />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
    )
}

export default Routing;