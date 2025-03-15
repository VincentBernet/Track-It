import reactDom from "react-dom/client";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: This is a root file, so it's okay to use non-null assertion
reactDom.createRoot(document.getElementById("root")!).render(<App />);
