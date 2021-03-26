import java from "java";
import mvn from "node-java-maven";

const className = "org.openkoreantext.processor.OpenKoreanTextProcessorJava";

mvn(function (err, mvnResults) {
  if (err) {
    return console.error("could not resolve maven dependencies", err);
  }
  mvnResults.classpath.forEach(function (c) {
    console.log("adding " + c + " to classpath");
    java.classpath.push(c);
  });

  var result = java.callStaticMethodSync(
    className,
    "normalize",
    "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"
  );

  console.log(result);
});
