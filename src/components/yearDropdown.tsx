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
        const years: number[] = [];
        if (props.disabled && props.year !== -1) {
            years.push(props.year);
        } else {
            for (let i: number = props.minYear; i <= props.maxYear; i++) {
                years.push(i);
            }
        }

        if (!props.disabled && props.year !== -1 && (props.year > props.maxYear || props.year < props.minYear)) {
            years.push(props.year);
        }
        return years
            .sort((a, b) => (props.sortYearsAsc ? a - b : b - a))
            .map(year => (
                <option key={year} value={year} aria-selected={props.year === year} selected={props.year === year}>
                    {year}
                </option>
            ));
    };

    return (
        <div className="year-dropdown">
            <select
                className="form-control"
                value={props.year === 0 ? props.yearLabel : props.year}
                onChange={handleSelect}
                aria-haspopup="listbox"
                disabled={props.disabled}
                aria-label={props.yearLabel}
            >
                <option value={-1} aria-selected={props.year === -1} selected={props.year === -1}>
                    {props.yearLabel}
                </option>
                {renderOptions()}
            </select>
        </div>
    );
};

export default YearDropdown;
