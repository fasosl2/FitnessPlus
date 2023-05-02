import { HomePage } from "./pages/Home/HomePage";
import { MinhasPastas } from "./pages/MinhasPastas/MinhasPastasPage";
import { HeaderPartial } from "./partials/HeaderPartial/Headerpartial";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./storage/AppContext";
import { Modals } from "./partials/Modals/Modals";

const initialState = {
  activeClientId: null,
  activePinId: null,
  activeGroup: "",
  data: null,
  mode: null,
  type: null,
  folders: [],
  groups: [],
  pins: [],
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
          <Modals />
        </AppContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
