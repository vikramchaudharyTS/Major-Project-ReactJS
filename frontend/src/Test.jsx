
import { Link } from "react-router-dom";

function Test(){
    return (
        <>
            <div className="flex gap-10 justify-center">
                <Link to='/'>LandingPage</Link>
                <Link to='/dashboard' >Dashboard</Link>
                <Link to='/explorer'>Explorer</Link>
                <Link to='/messages'>Messages</Link>
                <Link to='/profile'>ProfilePage</Link>
            </div>
        </>
    )
}
export default Test;