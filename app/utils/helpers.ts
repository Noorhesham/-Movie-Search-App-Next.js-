export function shuffle<T>(array: T[]): T[] {
  if (!array || array.length <= 0) return [];
  let currentIndex = array.length,
    randomIndex;

  // Create a copy of the array to avoid mutating the original
  const shuffledArray = [...array];

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}
