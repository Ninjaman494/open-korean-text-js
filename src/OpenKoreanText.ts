import util from "util";
import java from "java";
import mvn from "node-java-maven";

const className = "org.openkoreantext.processor.OpenKoreanTextProcessorJava";

export default class OpenKoreanText {
  javaPromise: Promise<undefined>;

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
      });
  }

  normalize = async (text: string) => {
    await this.javaPromise;
    const result = java.callStaticMethodSync(className, "normalize", text);
    return result;
  };

  tokenize = async (text: string) => {
    await this.javaPromise;
    const result = java.callStaticMethodSync(className, "tokenize", text);
    return result;
  };
}
