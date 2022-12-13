import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Error404 } from "../components/pages/Error404"
import { Top } from "../components/pages/Top"

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Top />} />
            <Route path={"*"} element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}
