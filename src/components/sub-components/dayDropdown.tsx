import React, { createElement, ReactElement, useMemo, useCallback } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";
import MxFormatter from "../../utils/MxFormatter";

export interface dayDropdownProps extends ICommonDropdownProps {
    day: number;
    month: number;
    year: number;
    includeSuffix: boolean;
    setDay: (newDay: number) => void;
}

const DayDropdown = (props: dayDropdownProps): ReactElement => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setDay(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const numberSuffix = useCallback((n: number): string => {
        const j = n % 10;
        const k = n % 100;
        if (j === 1 && k !== 11) {
            return n + "st";
        }
        if (j === 2 && k !== 12) {
            return n + "nd";
        }
        if (j === 3 && k !== 13) {
            return n + "rd";
        }
        return n + "th";
    }, []);

    const options = useMemo(() => {
        const options = [];
        const yearTemplate = props.year !== -1 ? props.year : 2024; // default to a leap year
        const monthTemplate = props.month !== -1 ? props.month : 2;
        if (props.readonly && props.day !== -1) {
            const dayTemplate = new Date(yearTemplate, monthTemplate, props.day);
            options.push(
                <option key={props.day} value={props.day} aria-selected selected>
                    {props.includeSuffix ? numberSuffix(props.day) : MxFormatter(dayTemplate, props.dropdownFormat)}
                </option>
            );
        } else {
            const dayTemplate = new Date(yearTemplate, monthTemplate, 1);
            let i = 1;
            while (i <= 31) {
                dayTemplate.setDate(i);
                if (dayTemplate.getMonth() !== monthTemplate) {
                    break;
                }
                options.push(
                    <option key={i} value={i} aria-selected={props.day === i}>
                        {props.includeSuffix ? numberSuffix(i) : MxFormatter(dayTemplate, props.dropdownFormat)}
                    </option>
                );
                i++;
            }
        }
        return options;
    }, [props.dropdownFormat, props.includeSuffix, props.month, props.day, props.year, numberSuffix, props.readonly]);

    return (
        <div className="day-dropdown">
            <select
                id={props.id + "-day"}
                tabIndex={props.tabIndex}
                className="form-control"
                disabled={props.readonly}
                value={props.day === -1 ? props.ariaLabel : props.day}
                onChange={handleSelect}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.day === -1}>
                    {props.ariaLabel}
                </option>
                {options}
            </select>
        </div>
    );
};

export default DayDropdown;
