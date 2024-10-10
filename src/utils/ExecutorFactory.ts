import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";

export default function createExecutor(
  codeLanguage: string,
): CodeExecutorStrategy {
  if (codeLanguage.toUpperCase() === "PYTHON") {
    return new PythonExecutor();
  } else if (codeLanguage.toUpperCase() === "JAVA") {
    return new JavaExecutor();
  } else {
    throw new Error(`Unsupported code language: ${codeLanguage}`);
  }
}
