import { LOGIN_URI } from "../../../commons/spotify/auth";
import { StyledLoginButton, StyledLoginContainer } from "./StyledLogin";

const Login = () => (
	<StyledLoginContainer>
		<StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>
	</StyledLoginContainer>
);

export default Login;
