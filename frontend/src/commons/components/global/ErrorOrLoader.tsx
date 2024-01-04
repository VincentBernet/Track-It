import Error from './Error';
import { Loader } from '..';


const ErrorOrLoader = ({ error, minHeight = '50vh' }: { error: boolean | null, minHeight?: string }) => {
    if (error) {
        return (
            <Error />
        );
    }
    return (
        <Loader minHeight={minHeight} />
    );
};

export default ErrorOrLoader;