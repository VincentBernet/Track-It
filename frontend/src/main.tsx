import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./commons/styles/global/GlobalStyle.ts";

// biome-ignore lint/style/noNonNullAssertion: This is a root file, so it's okay to use non-null assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		<GlobalStyle />
		<App />
	</>,
);
