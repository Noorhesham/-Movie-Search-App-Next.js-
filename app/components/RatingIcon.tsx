import { Star } from "lucide-react";

export const RatingIcon = ({ source }: { source: string }) => {
  if (source.includes("Rotten Tomatoes")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm2.525 5.025a.75.75 0 00-1.06-1.06l-2.558 2.558-1.24-1.24a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.088-3.088z"
          clipRule="evenodd"
        />
        <path d="M12.75 16.5a.75.75 0 00-1.5 0v-3.375a.75.75 0 00-1.5 0V16.5a.75.75 0 001.5 0v-1.742a3.749 3.749 0 01-2.25-3.408.75.75 0 00-1.5 0 5.25 5.25 0 0010.5 0 .75.75 0 00-1.5 0 3.749 3.749 0 01-2.25 3.408V16.5z" />
      </svg>
    );
  }
  if (source.includes("Metacritic")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-yellow-400"
      >
        <path
          fillRule="evenodd"
          d="M12.963 2.286a.75.75 0 00-1.071 1.052A7.499 7.499 0 0118 10.5c0 2.282-1.022 4.33-2.624 5.652A.75.75 0 0016.5 17.25a8.999 8.999 0 00-12-8.982.75.75 0 00-1.071-1.052A10.5 10.5 0 0121 10.5c0 5.798-4.702 10.5-10.5 10.5S0 16.298 0 10.5C0 5.706 3.822 1.76 8.59 1.093a.75.75 0 00.41-1.485 12.002 12.002 0 013.963 2.678z"
          clipRule="evenodd"
        />
        <path d="M10.873 12.92a.75.75 0 00-1.054 1.063 4.5 4.5 0 01-5.84-6.21.75.75 0 00.94-1.172 6 6 0 007.804 8.246.75.75 0 00-.85-1.187z" />
      </svg>
    );
  }
  return <Star className="w-6 h-6 text-yellow-400" />;
};

export default RatingIcon;
