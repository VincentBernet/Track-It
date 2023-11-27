import Error from './Error';
import { Loader } from '..';


const ErrorOrLoader = ({ error }: { error: boolean }) => {
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