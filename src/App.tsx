import RenderCanvas from "../lib/Render";
import useErrorBoundary from "use-error-boundary";
import "./App.css";

function App() {
  const { didCatch, error } = useErrorBoundary();
  return didCatch ? <div>{error.message}</div> : <RenderCanvas />;
}

export default App;