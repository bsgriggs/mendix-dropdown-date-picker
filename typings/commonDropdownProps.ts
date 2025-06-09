export default interface ICommonDropdownProps {
    id: string;
    tabIndex: number;
    readonly: boolean;
    dropdownFormat: string;
    ariaLabel: string;
    defaultOption: string;
    onLeave?: () => void;
    onEnter?: () => void;
    onChange?: () => void;
}
