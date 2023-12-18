import './SearchFilter.css';

type SearchFilterProps = {
    onChange: (inputValue: string) => void;
};

const SearchFilter = ({ onChange }: SearchFilterProps) => {
    return (
        <div className='search'>
            <input
                placeholder=""
                onChange={(e) => onChange(e.target.value)}
                title="Search by"
            />
            <div>
                <svg>
                    <path
                        strokeWidth='2'
                        d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562"
                        transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchFilter;