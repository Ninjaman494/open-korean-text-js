import OpenKoreanText from "./OpenKoreanText";

const okt = new OpenKoreanText();

const main = async () => {
  const normalized = await okt.normalize(
    "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"
  );
  console.log("Normalized:", normalized);

  const tokenSet = await okt.tokenize(normalized);
  console.log("Tokens:", await okt.createTokenList(tokenSet));

  const phrases = await okt.extractPhrases(tokenSet);
  console.log("Phrases:", phrases);
};

main()
  .catch((err) => {
    throw err;
  })
  .then(() => process.exit(0));
