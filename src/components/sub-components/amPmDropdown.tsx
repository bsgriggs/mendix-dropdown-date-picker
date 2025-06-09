import { createElement, ReactElement, useMemo } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";

export interface AmPmDropdownProps extends ICommonDropdownProps {
    amPm: "AM" | "PM";
    setAmPm: (newAmPm: "AM" | "PM") => void;
}

const AmPmDropdown = (props: AmPmDropdownProps): ReactElement => {
    const options = useMemo(
        () => [
            <option key="AM" value={"AM"} aria-selected={props.amPm === "AM"} selected={props.amPm === "AM"}>
                AM
            </option>,
            <option key="PM" value={"PM"} aria-selected={props.amPm === "PM"} selected={props.amPm === "PM"}>
                PM
            </option>
        ],
        [props.amPm]
    );

    return (
        <div className="am-pm-dropdown">
            <select
                id={`${props.id}-am-pm`}
                tabIndex={props.tabIndex}
                className="form-control"
                value={props.amPm}
                onChange={event => {
                    if (props.onChange) {
                        props.onChange();
                    }
                    props.setAmPm(event.target.value as "AM" | "PM");
                }}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                {options}
            </select>
        </div>
    );
};

export default AmPmDropdown;
