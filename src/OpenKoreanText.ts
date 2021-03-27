import util from "util";
import java from "java";
import mvn from "node-java-maven";
import { createToken, KoreanToken } from "./KoreanToken";
import { createPhrase, KoreanPhrase } from "./KoreanPhrase";

const className = "org.openkoreantext.processor.OpenKoreanTextProcessorJava";

export interface ExtractPhasesOptions {
  filterSpam?: boolean;
  includeHashtag?: boolean;
}

export type TokenSet = Record<any, never>;

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

  normalize = async (text: string): Promise<string> => {
    const javaClass = await this.javaPromise;
    const normalized = javaClass.normalizeSync(text);
    return normalized;
  };

  tokenize = async (text: string): Promise<TokenSet> => {
    const javaClass = await this.javaPromise;
    return javaClass.tokenizeSync(text);
  };

  extractPhrases = async (
    tokenSet: TokenSet,
    options: ExtractPhasesOptions = {
      filterSpam: true,
      includeHashtag: false,
    }
  ): Promise<KoreanPhrase[]> => {
    const javaClass = await this.javaPromise;

    const phrasesList = javaClass.extractPhrasesSync(
      tokenSet,
      options.filterSpam,
      options.includeHashtag
    );

    const phrases = [];
    for (let i = 0; i < phrasesList.sizeSync(); i++) {
      phrases.push(createPhrase(phrasesList.getSync(i)));
    }

    return phrases;
  };

  createTokenList = async (tokenSet: TokenSet): Promise<KoreanToken[]> => {
    const javaClass = await this.javaPromise;

    const tokensList = javaClass.tokensToJavaKoreanTokenListSync(tokenSet);
    const tokens = [];
    for (let i = 0; i < tokensList.sizeSync(); i++) {
      tokens.push(createToken(tokensList.getSync(i)));
    }

    return tokens;
  };
}
