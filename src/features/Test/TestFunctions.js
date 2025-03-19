import { englishWords } from "../../assets/words/english";

export function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}
export const formatTime = (timeInMs) => {
  const seconds = Math.floor(timeInMs / 1000);
  const milliseconds = Math.floor((timeInMs % 1000) / 10); // Get only 2 digits
};
export function wordsPerMinute(words, seconds) {
  console.log(words);
  console.log(seconds);
  return Math.round(words / (seconds / 60));
}
