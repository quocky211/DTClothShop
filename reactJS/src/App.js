import "./App.css";
import { Outlet } from "react-router-dom";
// import Contact from './Components/Contact'
///
function App() {
  return (
    <div className="App">
	    <Outlet/>
    </div>
  );
}
export default App;
