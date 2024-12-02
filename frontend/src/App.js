import axios from "axios";
import Myform from "./pages/Myform";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true

function App() {
  return (
    <>
     <Myform />
    </>
  );
}

export default App;
