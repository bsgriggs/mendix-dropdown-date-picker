import { createElement, ReactElement, ChangeEvent, useMemo } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";
import MxFormatter from "../../utils/MxFormatter";

export interface MinuteDropdownProps extends ICommonDropdownProps {
    minute: number;
    setMinute: (newHour: number) => void;
}

const MinuteDropdown = (props: MinuteDropdownProps): ReactElement => {
    const options = useMemo(() => {
        const options = [];
        if (props.readonly && props.minute !== -1) {
            const minuteTemplate = new Date(1970, 0, 1, 0, props.minute);
            options.push(
                <option key={props.minute} value={props.minute} aria-selected selected>
                    {MxFormatter(minuteTemplate, props.dropdownFormat)}
                </option>
            );
        } else {
            const minuteTemplate = new Date(1970);

            for (let i = 0; i < 60; i++) {
                minuteTemplate.setMinutes(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.minute === i} selected={props.minute === i}>
                        {MxFormatter(minuteTemplate, props.dropdownFormat)}
                    </option>
                );
            }
        }
        return options;
    }, [props.dropdownFormat, props.minute, props.readonly]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setMinute(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="minute-dropdown">
            <select
                id={props.id + "-minute"}
                tabIndex={props.tabIndex}
                className="form-control"
                value={props.minute === -1 ? props.defaultOption : props.minute}
                onChange={handleSelect}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.minute === -1} selected={props.minute === -1}>
                    {props.defaultOption}
                </option>
                {options}
            </select>
        </div>
    );
};

export default MinuteDropdown;
