import{BrowserRouter as Router,Routes,Route} from "react-router-dom";//In react-router-dom v6, "Switch" is replaced by routes "Routes".
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/home";
import UpdateTask from "./pages/updateTask";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/notes" element={<UpdateTask/>}/>
          <Route path="/update/:id" element={<UpdateTask/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
