import { englishWords } from "../../assets/words/english";

export function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}


