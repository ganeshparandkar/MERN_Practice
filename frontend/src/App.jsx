import { Routes,Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
function App() {

  return (
    <div className="p-10 m-10">
    <Routes>
      <Route path="/" element={<DashBoard/>}> </Route>
      <Route path="/login" element={<LoginPage/>}> </Route>
      <Route path="/register" element={<SignUpPage/>}> </Route>
    </Routes>
    </div>
  );
}

export default App;
