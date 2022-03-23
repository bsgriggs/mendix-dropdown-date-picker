import { createElement, useState, useEffect } from "react";
import DayDropdown, { maxDaysInMonth } from "./components/dayDropdown";
import MonthDropdown from "./components/monthDropdown";
import YearDropdown from "./components/yearDropdown";
import { DropdownDatePickerContainerProps } from "../typings/DropdownDatePickerProps";
import { ValueStatus } from "mendix";

import "./ui/DropdownDatePicker.css";

type DropdownDatePickerContainerState = {
    month: number;
    day: number;
    year: number;
};

type dropdown = {
    sort: number;
    jsx: JSX.Element;
};

const DropdownDatePicker = (props: DropdownDatePickerContainerProps): JSX.Element => {
    // set state default values, -1 shows the select's label
    const [dropdownState, setDropdownState] = useState<DropdownDatePickerContainerState>({
        month: -1,
        day: -1,
        year: -1
    });
    // sort the order of the dropdowns based on the sort widget settings
    const sortDropdowns = (): dropdown[] => {
        const dropdowns: dropdown[] = [];
        if (
            props.minYear.status === ValueStatus.Available &&
            props.maxYear.status === ValueStatus.Available &&
            props.monthSort.status === ValueStatus.Available &&
            props.daySort.status === ValueStatus.Available &&
            props.yearSort.status === ValueStatus.Available
        ) {
            if (props.useMonth) {
                dropdowns.push({
                    sort: parseFloat(props.monthSort.value.toFixed(0)),
                    jsx: (
                        <MonthDropdown
                            month={dropdownState.month}
                            monthType={props.monthType}
                            monthLabel={props.monthLabel}
                            setMonth={(newMonth: number) => handleChange({ ...dropdownState, month: newMonth })}
                            disabled={props.date.readOnly}
                        />
                    )
                });
            }
            if (props.useDay) {
                dropdowns.push({
                    sort: parseFloat(props.daySort.value.toFixed(0)),
                    jsx: (
                        <DayDropdown
                            dayLabel={props.dayLabel}
                            setDay={(newDay: number) => handleChange({ ...dropdownState, day: newDay })}
                            month={dropdownState.month}
                            day={dropdownState.day}
                            year={dropdownState.year}
                            disabled={props.date.readOnly}
                        />
                    )
                });
            }
            if (props.useYear) {
                dropdowns.push({
                    sort: parseFloat(props.yearSort.value.toFixed(0)),
                    jsx: (
                        <YearDropdown
                            year={dropdownState.year}
                            minYear={parseFloat(props.minYear.value.toFixed(0))}
                            maxYear={parseFloat(props.maxYear.value.toFixed(0))}
                            yearLabel={props.yearLabel}
                            setYear={(newYear: number) => handleChange({ ...dropdownState, year: newYear })}
                            disabled={props.date.readOnly}
                        />
                    )
                });
            }
        }
        return dropdowns;
    };

    const handleChange = (newState: DropdownDatePickerContainerState): void => {
        // update the state with the value from the child component
        setDropdownState(newState);
        // attempt to create and update mendix with the new date
        if (
            newState.month !== -1 &&
            newState.day !== -1 &&
            newState.year !== -1 &&
            maxDaysInMonth(newState.month) >= newState.day
        ) {
            const newDate = new Date();
            // clear Time
            newDate.setMilliseconds(0);
            newDate.setSeconds(0);
            newDate.setMinutes(0);
            newDate.setHours(0);

            newDate.setDate(newState.day);
            newDate.setMonth(newState.month);
            newDate.setFullYear(newState.year);

            props.date.setValue(newDate);
        } else {
            // if not all of the dropdowns have been select, set the mendix value as empty
            props.date.setValue(undefined);
        }
    };

    useEffect(() => {
        // pass the props up to the state if the date changes inside mendix
        setDropdownState({
            month: props.useMonth
                ? props.date.value !== undefined
                    ? props.date.value.getMonth()
                    : -1
                : props.defaultMonth.value
                ? parseFloat(props.defaultMonth.value.toFixed(0))
                : 0,
            day: props.useDay
                ? props.date.value !== undefined
                    ? props.date.value.getDate()
                    : -1
                : props.defaultDay.value
                ? parseFloat(props.defaultDay.value.toFixed(0))
                : 1,
            year: props.useYear
                ? props.date.value !== undefined
                    ? props.date.value.getFullYear()
                    : -1
                : props.defaultYear.value
                ? new Date().getFullYear() + parseFloat(props.defaultYear.value.toFixed(0))
                : new Date().getFullYear()
        });
    }, [props.date]);
    // Only render after the attributes are ready
    if (
        props.minYear.status === ValueStatus.Available &&
        props.maxYear.status === ValueStatus.Available &&
        props.date.status === ValueStatus.Available
    ) {
        console.log("state", dropdownState);
        return (
            <div
                id={props.name}
                className={props.class ? "widget-dropdowndatepicker " + props.class : "widget-dropdowndatepicker"}
            >
                {sortDropdowns()
                    .sort((a, b) => a.sort - b.sort)
                    .map(dropdown => {
                        return dropdown.jsx;
                    })}
            </div>
        );
    } else {
        return (
            <div
                id={props.name}
                className={props.class ? "widget-dropdowndatepicker " + props.class : "widget-dropdowndatepicker"}
            >
                <span style={{ display: "none" }}>loading</span>
            </div>
        );
    }
};

export default DropdownDatePicker;
