import Loader from "./Loader";
import AlertError from "./AlertError";

const ErrorOrLoader = ({
  error,
  minHeight = "50vh",
}: {
  error: string | null;
  minHeight?: string;
}) => {
  if (error) {
    return <AlertError message={error} />;
  }
  return <Loader minHeight={minHeight} />;
};

export default ErrorOrLoader;
