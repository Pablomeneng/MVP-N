import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
