import axios from "axios";
import Myform from "./pages/Myform";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINT } from "./constants/endpoint";

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.withCredentials = true;

function App() {
  return <>
    <ToastContainer />
    <Myform />
  </>
}

export default App;
