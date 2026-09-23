import { Route, Routes } from "react-router-dom"
import { Board } from "./pages/Board"
import { LessonE } from "./pages/LessonE"
import { LessonPi } from "./pages/LessonPi"
import { LessonPiIntro } from "./pages/LessonPiIntro"
import { NotFound } from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/lesson/e-zinseszins" element={<LessonE />} />
      <Route path="/lesson/was-ist-pi" element={<LessonPiIntro />} />
      <Route path="/lesson/pi-vielecke" element={<LessonPi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
