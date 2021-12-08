import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Doc, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="doc/:docId" element={<Doc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
