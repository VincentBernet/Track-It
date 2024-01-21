import Error from './Error';
import { Loader } from '..';


const ErrorOrLoader = ({ error, minHeight = '50vh' }: { error: string | null, minHeight?: string }) => {
    if (error) {
        return (
            <Error message={error} />
        );
    }
    return (
        <Loader minHeight={minHeight} />
    );
};

export default ErrorOrLoader;