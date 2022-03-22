import React, { createElement, ReactElement } from "react";
// import Select from 'react-select';

export type yearDropdownProps = {
    year: number;
    yearLabel: string;
    minYear: number;
    maxYear: number;
    setYear: (newYear: number) => void;
    disabled: boolean;
};

const YearDropdown = (props: yearDropdownProps) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            props.setYear(parseInt(event.target.value));
        } catch (e) {
            console.error(e);
        }
    };

    const renderOptions = () => {
        const options: Array<ReactElement> = [];
        for (let i: number = props.maxYear; i >= props.minYear; i--) {
            options.push(
                <option value={i} aria-selected={props.year === i} selected={props.year === i}>
                    {i}
                </option>
            );
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
