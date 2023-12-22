import { WarningSvg } from "../icons";

const Error = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", textAlign: "center", margin: "50px" }}>
            <WarningSvg />
            <div>
                <p>Fetching data from spotify failed</p>
                <button onClick={() => location.reload()}>TRY AGAIN</button>
            </div>
        </div>
    );
}

export default Error;