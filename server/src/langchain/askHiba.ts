import { loadHibaData } from "../data/hibaData";
import { hibaChain } from "./chain";

export async function askHiba(question: string) {
  const hibaInfo = await loadHibaData();

  const answer = await hibaChain.invoke({
    context: hibaInfo,
    question,
  });

  return answer;
}