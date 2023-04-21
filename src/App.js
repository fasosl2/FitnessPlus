import { HomePage } from "./pages/Home/HomePage";
import { MinhasPastas } from "./pages/MinhasPastas/MinhasPastasPage";
import { HeaderPartial } from "./partials/HeaderPartial/Headerpartial";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./storage/AppContext";

const initialState = {
  activePinId: null,
  mode: null,
  folders: [],
  type: null,
  pins: []
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppContext initialState={initialState}>
          <HeaderPartial />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/minhas-pastas" element={<MinhasPastas />} />
          </Routes>
        </AppContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
