import OpenKoreanText from "./OpenKoreanText";

const okt = new OpenKoreanText();

okt.normalize("한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어").then((x) => {
  console.log(x);

  okt.tokenize(x).then((y) => {
    console.log(y);
  });
});
