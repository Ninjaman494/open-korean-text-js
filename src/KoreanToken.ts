export type KoreanToken = {
  length: number;
  offset: number;
  pos: KoreanPOS;
  stem?: string;
  text: string;
  unknown: boolean;
};

export type KoreanPOS =
  | "Adjective"
  | "Adverb"
  | "Alpha"
  | "CashTag"
  | "Conjunction"
  | "Determiner"
  | "Email"
  | "Eomi"
  | "Exclamation"
  | "Foreign"
  | "Hashtag"
  | "Josa"
  | "Korean"
  | "KoreanParticle"
  | "Noun"
  | "NounPrefix"
  | "Number"
  | "Others"
  | "PreEomi"
  | "ProperNoun"
  | "Punctuation"
  | "ScreenName"
  | "Space"
  | "Suffix"
  | "URL"
  | "Unknown"
  | "Verb"
  | "VerbPrefix";

export const createToken = (token: any): KoreanToken => {
  const stem = token.getStemSync();
  return {
    length: token.getLengthSync(),
    offset: token.getOffsetSync(),
    pos: token.getPosSync().nameSync(),
    stem: stem !== "" ? stem : undefined,
    text: token.getTextSync(),
    unknown: token.isUnknownSync(),
  };
};
