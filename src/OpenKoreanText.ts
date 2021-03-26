import util from "util";
import java from "java";
import mvn from "node-java-maven";
import { createToken, KoreanToken } from "./KoreanToken";

const className = "org.openkoreantext.processor.OpenKoreanTextProcessorJava";

export default class OpenKoreanText {
  javaPromise: Promise<any>;

  constructor() {
    const mvnPromise = util.promisify(mvn);

    this.javaPromise = mvnPromise()
      .catch((err) =>
        console.error("could not resolve maven dependencies", err)
      )
      .then((mvnResults) => {
        mvnResults.classpath.forEach(function (c) {
          console.log("adding " + c + " to classpath");
          java.classpath.push(c);
        });

        return java.import(className);
      });
  }

  normalize = async (text: string) => {
    const javaClass = await this.javaPromise;
    const normalized = javaClass.normalizeSync(text);
    return normalized;
  };

  tokenize = async (text: string): Promise<KoreanToken[]> => {
    const javaClass = await this.javaPromise;

    const tokenSet = javaClass.tokenizeSync(text);
    const tokensList = javaClass.tokensToJavaKoreanTokenListSync(tokenSet);

    const tokens = [];
    for (let i = 0; i < tokensList.sizeSync(); i++) {
      tokens.push(createToken(tokensList.getSync(i)));
    }

    return tokens;
  };
}
