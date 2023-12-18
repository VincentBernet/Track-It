import Error from './Error';
import { Loader } from '..';


const ErrorOrLoader = ({ error }: { error: boolean | null }) => {
    if (error) {
        return (
            <Error />
        );
    }
    return (
        <Loader />
    );
};

export default ErrorOrLoader;