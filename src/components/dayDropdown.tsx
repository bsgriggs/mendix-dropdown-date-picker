import React, { createElement, ReactElement } from "react";
import { DayTypeEnum } from "../../typings/DropdownDatePickerProps";

export type dayDropdownProps = {
    day: number;
    month: number;
    year: number;
    dayLabel: string;
    dayType: DayTypeEnum;
    setDay: (newDay: number) => void;
    disabled: boolean;
};

// https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year
const isLeapYear = (year: number): boolean => {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const numberSuffix = (n: number): string => {
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
};

export const maxDaysInMonth = (month: number, year: number): number => {
    if (month === -1) {
        return 0;
    } else if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    } else {
        return isLeapYear(year) ? 29 : 28;
    }
};

const DayDropdown = (props: dayDropdownProps): ReactElement => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        try {
            props.setDay(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const renderOptions = (): ReactElement[] => {
        const options: ReactElement[] = [];
        if (props.disabled && props.day !== -1) {
            options.push(
                <option value={props.day} aria-selected="true">
                    {props.dayType === "num" && props.day}
                    {props.dayType === "withSuffix" && numberSuffix(props.day)}
                </option>
            );
        } else {
            for (let i = 1; i <= maxDaysInMonth(props.month, props.year); i++) {
                options.push(
                    <option value={i} aria-selected={props.day === i}>
                        {props.dayType === "num" && i}
                        {props.dayType === "withSuffix" && numberSuffix(i)}
                    </option>
                );
            }
        }

        return options;
    };

    return (
        <div className="day-dropdown">
            <select
                className="form-control"
                disabled={props.month === -1 || props.disabled}
                value={props.day === -1 ? props.dayLabel : props.day}
                onChange={handleSelect}
                aria-haspopup="listbox"
            >
                <option value={-1} aria-selected={props.day === -1}>
                    {props.dayLabel}
                </option>
                {renderOptions().map(option => {
                    return option;
                })}
            </select>
        </div>
    );
};

export default DayDropdown;
