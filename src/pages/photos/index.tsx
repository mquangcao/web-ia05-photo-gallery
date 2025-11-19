import { PhotoList } from "./photo-list";

/**
 * Photo List Page - Main page showing grid of photos with infinite scroll
 * NO logic here, only composition
 */
export default function PhotoListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-600 mt-1">
            Browse beautiful photos from Lorem Picsum
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <PhotoList />
      </main>
    </div>
  );
}
