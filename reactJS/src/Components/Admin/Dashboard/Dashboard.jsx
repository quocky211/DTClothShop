import Home from '../Home/Home';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './Dashboard.css';
function Dashboard()
{
    return (
        <div className="">
            <Topbar/>
            <div className="container-admin">
                <Sidebar/>
                <Home/>
            </div>
        </div>
    )
}
export default Dashboard;