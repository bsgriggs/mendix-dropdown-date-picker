import { createElement, ReactElement, ChangeEvent, useMemo } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";
import MxFormatter from "../../utils/MxFormatter";

export interface HourDropdownProps extends ICommonDropdownProps {
    hour: number;
    setHour: (newHour: number) => void;
    amPm: "AM" | "PM";
    useAmPm: boolean;
}

const HourDropdown = (props: HourDropdownProps): ReactElement => {
    const options = useMemo(() => {
        const options = [];
        if (props.readonly && props.hour !== -1) {
            const hourTemplate = new Date(1970, 0, 1, props.hour);
            options.push(
                <option key={props.hour} value={props.hour} aria-selected selected>
                    {MxFormatter(hourTemplate, props.dropdownFormat)}
                </option>
            );
        } else {
            const hourTemplate = new Date(1970);

            for (let i = props.amPm === "PM" ? 12 : 0; i < (props.useAmPm && props.amPm === "AM" ? 12 : 24); i++) {
                hourTemplate.setHours(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.hour === i} selected={props.hour === i}>
                        {MxFormatter(hourTemplate, props.dropdownFormat)}
                    </option>
                );
            }
        }
        return options;
    }, [props.dropdownFormat, props.readonly, props.hour, props.amPm, props.useAmPm]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setHour(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="hour-dropdown">
            <select
                id={props.id + "-hour"}
                tabIndex={props.tabIndex}
                className="form-control"
                value={props.hour === -1 ? props.ariaLabel : props.hour}
                onChange={handleSelect}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.hour === -1} selected={props.hour === -1}>
                    {props.ariaLabel}
                </option>
                {options}
            </select>
        </div>
    );
};

export default HourDropdown;
