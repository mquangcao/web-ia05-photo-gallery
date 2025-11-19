import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { Photo } from "@/api/entities/photo";
import { paths } from "@/routes/paths";

interface PhotoCardProps {
  photo: Photo;
}

/**
 * Photo Card Component - Displays a single photo with author info
 */
export function PhotoCard({ photo }: PhotoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(paths.photos.detail(photo.id));
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group p-0"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-200">
        <img
          src={`${photo.download_url}?w=400&h=400`}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs text-gray-500">Photo #{photo.id}</p>
        <p className="text-sm font-medium text-gray-900 truncate">
          By {photo.author}
        </p>
      </div>
    </Card>
  );
}
