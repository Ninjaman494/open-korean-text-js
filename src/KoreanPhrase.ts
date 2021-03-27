import { KoreanPOS } from "./KoreanToken";
import { TokenSet } from "./OpenKoreanText";

export type KoreanPhrase = {
  length: number;
  offset: number;
  pos: KoreanPOS;
  text: string;
  tokens: TokenSet;
};

export const createPhrase = (phrase: any): KoreanPhrase => {
  return {
    length: phrase.lengthSync(),
    offset: phrase.offsetSync(),
    pos: phrase.posSync().toStringSync(),
    text: phrase.textSync(),
    tokens: phrase.tokensSync(),
  };
};
