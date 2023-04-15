import { Route, Routes } from "react-router-dom";
import MenuTop from "./components/Menus/MenuTop";
import Home from "./pages/home";
function App() {
  return (
    <MenuTop>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MenuTop>
  );
}

export default App;
