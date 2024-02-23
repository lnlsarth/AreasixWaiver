import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forms from "./Forms";
import Admin from "./Admin";
import NotFound from "./NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Forms/>}/>
        <Route path="admin" element={ <Admin/>}/>
        <Route path="*" element= { <NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
