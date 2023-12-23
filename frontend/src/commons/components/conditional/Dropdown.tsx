import { useRef, useEffect } from "react";
import { StyledDropdown } from "../../styles";

type DropdownProps = {
    isOpen: boolean;
    handleClosing: () => void;
    dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
    children: React.ReactNode;
    isPropertiesDropdown?: boolean;
}

const Dropdown = ({ children, isOpen, handleClosing, dropdownButtonRef, isPropertiesDropdown }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if ((dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
                (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target))
            ) {
                handleClosing();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownButtonRef, handleClosing]);

    if (!isOpen) return null;

    return (
        <StyledDropdown ref={dropdownRef} $isProperties={isPropertiesDropdown}>
            {children}
        </StyledDropdown>
    );
}

export default Dropdown;