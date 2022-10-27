import React, { createElement, ReactElement } from "react";

export type yearDropdownProps = {
    year: number;
    yearLabel: string;
    minYear: number;
    maxYear: number;
    sortYearsAsc: boolean;
    setYear: (newYear: number) => void;
    disabled: boolean;
};

const YearDropdown = (props: yearDropdownProps): ReactElement => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        try {
            props.setYear(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const renderOptions = (): ReactElement[] => {
        const options: ReactElement[] = [];
        if (props.disabled && props.year !== -1) {
            options.push(
                <option value={props.year} aria-selected="true">
                    {props.year}
                </option>
            );
        } else {
            for (
                let i: number = props.sortYearsAsc ? props.minYear : props.maxYear;
                props.sortYearsAsc ? i <= props.maxYear : i >= props.minYear;
                props.sortYearsAsc ? i++ : i--
            ) {
                options.push(
                    <option value={i} aria-selected={props.year === i} selected={props.year === i}>
                        {i}
                    </option>
                );
            }
        }
        return options;
    };

    return (
        <div className="year-dropdown">
            <select
                className="form-control"
                value={props.year === 0 ? props.yearLabel : props.year}
                onChange={handleSelect}
                aria-haspopup="listbox"
                disabled={props.disabled}
            >
                <option value={-1} aria-selected={props.year === -1} selected={props.year === -1}>
                    {props.yearLabel}
                </option>
                {renderOptions().map(option => {
                    return option;
                })}
            </select>
        </div>
    );
};

export default YearDropdown;
