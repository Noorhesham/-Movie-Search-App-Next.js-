import { Modal } from "@/app/components/defaults/Modal";
import { MovieDetailsContent } from "@/app/components/MovieDetailsContent";
import { fetchMovieDetailsById } from "@/app/services/api";

interface MovieModalPageProps {
  params: {
    id: string;
  };
}

export default async function MovieModal({ params }: MovieModalPageProps) {
  const awaitedParams = await params;
  const { data: details, error } = await fetchMovieDetailsById(awaitedParams.id);

  return (
    <Modal>
      <MovieDetailsContent details={details || null} error={error || null} />
    </Modal>
  );
}
