import { createElement, ReactElement, ChangeEvent, useMemo } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";
import MxFormatter from "../../utils/MxFormatter";

export interface monthDropdownProps extends ICommonDropdownProps {
    month: number;
    setMonth: (newMonth: number) => void;
}

const MonthDropdown = (props: monthDropdownProps): ReactElement => {
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setMonth(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const options = useMemo(() => {
        const options = [];
        if (props.readonly && props.month !== -1) {
            const monthTemplate = new Date(1970, props.month, 1);
            options.push(
                <option key={props.month} value={props.month} aria-selected selected>
                    {MxFormatter(monthTemplate, props.dropdownFormat)}
                </option>
            );
        } else {
            const monthTemplate = new Date(1970, 0, 1);
            let i = 0;
            while (i < 12) {
                monthTemplate.setMonth(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.month === i}>
                        {MxFormatter(monthTemplate, props.dropdownFormat)}
                    </option>
                );
                i++;
            }
        }
        return options;
    }, [props.dropdownFormat, props.month, props.readonly]);

    return (
        <div className="month-dropdown">
            <select
                id={`${props.id}-month`}
                tabIndex={props.tabIndex}
                className="form-control"
                value={props.month === -1 ? props.defaultOption : props.month}
                onChange={handleSelect}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.month === -1} selected={props.month === -1}>
                    {props.defaultOption}
                </option>
                {options}
            </select>
        </div>
    );
};

export default MonthDropdown;
