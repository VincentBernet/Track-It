type SearchElementProps = {
    searchFilter: string;
    text: string;
}

const SearchedElement = ({ searchFilter, text }: SearchElementProps) => {
    const searchFilterIndex = text.toLowerCase().indexOf(searchFilter.toLowerCase());
    if (searchFilterIndex === -1 || searchFilter === '') {
        return (
            <>
                {text}
            </>
        );
    }

    return (
        <>
            <span>
                {text.slice(0, searchFilterIndex)}
            </span>
            <span className='searched'>
                {text.slice(searchFilterIndex, searchFilterIndex + searchFilter.length)}
            </span>
            <span>
                {text.slice(searchFilterIndex + searchFilter.length)}
            </span>
        </>
    );
}

export default SearchedElement;