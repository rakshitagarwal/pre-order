import axios from "axios";
import Myform from "./pages/Myform";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return <>
    <ToastContainer />
    <Myform />
  </>
}

export default App;
