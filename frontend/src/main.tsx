import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import CarPage from "./CarPage/Car.tsx"
import Layout from "./Layout.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter imported at top level. */}
    <BrowserRouter>
      <Routes>
        {/* A pathless route renders Layout for everything nested inside it —
            one header, one theme toggle, and the URL still drives which page
            fills the <Outlet />. */}
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/car/:carId" element={<CarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
