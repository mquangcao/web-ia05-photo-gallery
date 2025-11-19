import { useParams, useNavigate } from "react-router-dom";
import { useGetPhoto } from "@/hooks/api/photo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, User } from "lucide-react";
import { paths } from "@/routes/paths";

/**
 * Photo Detail Component - Contains all logic for displaying photo details
 */
export function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: photo,
    isLoading,
    error,
  } = useGetPhoto(
    { id: id || "" },
    {
      enabled: !!id,
      queryKey: ["photo", id],
    }
  );

  const handleBack = () => {
    navigate(paths.photos.root);
  };

  const handleDownload = () => {
    if (photo) {
      window.open(photo.download_url, "_blank");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Skeleton className="w-full aspect-video rounded-2xl" />
              </div>
              <div className="space-y-4">
                <Card className="p-6">
                  <Skeleton className="h-32 w-full" />
                </Card>
                <Card className="p-6">
                  <Skeleton className="h-24 w-full" />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !photo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error loading photo</p>
            <p className="text-gray-600 mt-2">
              {error?.message || "Photo not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>

        {/* Photo Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
                <img
                  src={`${photo.download_url}?w=1200`}
                  alt={`Photo by ${photo.author}`}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4">
              {/* Photo ID Card */}
              <Card className="p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <h1 className="text-2xl font-bold">Photo #{photo.id}</h1>
                </div>
                <div className="p-6 space-y-4">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Photographer
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {photo.author}
                      </p>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-50 rounded-full">
                      <svg
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Resolution
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {photo.width} × {photo.height}
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Resolution
                  </Button>
                </div>
              </Card>

              {/* Description Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About this photo
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A stunning photograph captured by {photo.author}. This
                  high-quality image showcases beautiful composition and
                  artistic vision, perfect for creative projects and
                  presentations.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
