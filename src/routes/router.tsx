import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhotoListPage from "@/pages/photos";
import PhotoDetailPage from "@/pages/photos/detail";
import { paths } from "./paths";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.photos.root} element={<PhotoListPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
