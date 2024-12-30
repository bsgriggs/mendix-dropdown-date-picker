import React, { createElement, ReactElement, useMemo } from "react";
import MxFormatter from "../../utils/MxFormatter";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";

export interface yearDropdownProps extends ICommonDropdownProps {
    year: number;
    setYear: (newYear: number) => void;
    minYear: number;
    maxYear: number;
    sortYearsAsc: boolean;
}

const YearDropdown = (props: yearDropdownProps): ReactElement => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setYear(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const options = useMemo(() => {
        const options = [];
        if (props.readonly && props.year !== -1) {
            const yearTemplate = new Date(props.year, 0, 1);
            options.push(
                <option key={props.year} value={props.year} aria-selected selected>
                    {MxFormatter(yearTemplate, props.dropdownFormat)}
                </option>
            );
        } else if (props.sortYearsAsc) {
            const yearTemplate = new Date(props.minYear, 0, 1);
            let i = props.minYear;
            while (i <= props.maxYear) {
                yearTemplate.setFullYear(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.year === i}>
                        {MxFormatter(yearTemplate, props.dropdownFormat)}
                    </option>
                );
                i++;
            }
        } else {
            const yearTemplate = new Date(props.maxYear, 0, 1);
            let i = props.maxYear;
            while (i >= props.minYear) {
                yearTemplate.setFullYear(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.year === i}>
                        {MxFormatter(yearTemplate, props.dropdownFormat)}
                    </option>
                );
                i--;
            }
        }

        return options;
    }, [props.dropdownFormat, props.year, props.sortYearsAsc, props.minYear, props.maxYear, props.readonly]);

    return (
        <div className="year-dropdown">
            <select
                id={props.id + "-year"}
                tabIndex={props.tabIndex}
                className="year-dropdown form-control"
                value={props.year === 0 ? props.ariaLabel : props.year}
                onChange={handleSelect}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.year === -1} selected={props.year === -1}>
                    {props.ariaLabel}
                </option>
                {options}
            </select>
        </div>
    );
};

export default YearDropdown;
