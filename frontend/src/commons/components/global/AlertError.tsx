import { logoutThenLogin } from "../../spotify/auth";
import { WarningSvg } from "../icons";

const AlertError = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        textAlign: "center",
        margin: "50px",
      }}
    >
      <WarningSvg />
      <div>
        <p>Fetching data from spotify failed : {message}</p>
        <button type="button" onClick={logoutThenLogin}>
          TRY AGAIN
        </button>
      </div>
    </div>
  );
};

export default AlertError;
