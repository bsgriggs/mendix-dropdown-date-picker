import { createElement, useState, useEffect, ReactElement } from "react";
import DayDropdown, { maxDaysInMonth } from "./components/dayDropdown";
import MonthDropdown from "./components/monthDropdown";
import YearDropdown from "./components/yearDropdown";
import { DropdownDatePickerContainerProps } from "../typings/DropdownDatePickerProps";
import { ValueStatus } from "mendix";
import Alert from "./components/alert";
import MxIcon from "./components/MxIcon";

import "./ui/DropdownDatePicker.css";

type DropdownDatePickerContainerState = {
    month: number;
    day: number;
    year: number;
};

type dropdown = {
    sort: number;
    element: ReactElement;
};

const emptyDropdownState = {
    month: -1,
    day: -1,
    year: -1
};

const DropdownDatePicker = ({
    date,
    dayLabel,
    daySort,
    dayType,
    defaultDay,
    defaultMonth,
    defaultYear,
    maxYear,
    minYear,
    monthLabel,
    monthSort,
    monthType,
    sortYearsAsc,
    useDay,
    useMonth,
    useYear,
    yearLabel,
    yearSort,
    name,
    showClearBtn,
    clearBtnTooltip,
    clearBtnIcon
}: DropdownDatePickerContainerProps): ReactElement => {
    // set state default values, -1 shows the selects label
    const [dropdownState, setDropdownState] = useState<DropdownDatePickerContainerState>(emptyDropdownState);
    // sort the order of the dropdowns based on the sort widget settings
    const sortDropdowns = (): dropdown[] => {
        const dropdowns: dropdown[] = [];
        if (
            minYear.status === ValueStatus.Available &&
            maxYear.status === ValueStatus.Available &&
            monthSort.status === ValueStatus.Available &&
            daySort.status === ValueStatus.Available &&
            yearSort.status === ValueStatus.Available
        ) {
            if (useMonth) {
                dropdowns.push({
                    sort: parseFloat(monthSort.value.toFixed(0)),
                    element: (
                        <MonthDropdown
                            month={dropdownState.month}
                            monthType={monthType}
                            monthLabel={monthLabel.value as string}
                            setMonth={(newMonth: number) => handleChange({ ...dropdownState, month: newMonth })}
                            disabled={date.readOnly}
                        />
                    )
                });
            }
            if (useDay) {
                dropdowns.push({
                    sort: parseFloat(daySort.value.toFixed(0)),
                    element: (
                        <DayDropdown
                            dayLabel={dayLabel.value as string}
                            setDay={(newDay: number) => handleChange({ ...dropdownState, day: newDay })}
                            dayType={dayType}
                            month={dropdownState.month}
                            day={dropdownState.day}
                            year={dropdownState.year}
                            disabled={date.readOnly}
                        />
                    )
                });
            }
            if (useYear) {
                dropdowns.push({
                    sort: parseFloat(yearSort.value.toFixed(0)),
                    element: (
                        <YearDropdown
                            year={dropdownState.year}
                            minYear={parseFloat(minYear.value.toFixed(0))}
                            maxYear={parseFloat(maxYear.value.toFixed(0))}
                            sortYearsAsc={sortYearsAsc}
                            yearLabel={yearLabel.value as string}
                            setYear={(newYear: number) => handleChange({ ...dropdownState, year: newYear })}
                            disabled={date.readOnly}
                        />
                    )
                });
            }
            if (showClearBtn && date.value !== undefined) {
                dropdowns.push({
                    sort: 10,
                    element: (
                        <button className="btn mx-button btn-sm btn-default" onClick={handleClear}>
                        <MxIcon
                            defaultClassname="remove"
                            title={clearBtnTooltip.value as string}
                            mxIconOverride={clearBtnIcon?.value}
                        />
                    </button>
                    )
                });
            }
        }
        return dropdowns;
    };

    const handleChange = (newState: DropdownDatePickerContainerState): void => {
        console.info("handle change",{newState, dropdownState});
        // update the state with the value from the child component
        setDropdownState(newState);
        // attempt to create and update mendix with the new date
        if (
            newState.month !== -1 &&
            newState.day !== -1 &&
            newState.year !== -1 &&
            maxDaysInMonth(newState.month, newState.year) >= newState.day
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
            //send new date to Mendix
            date.setValue(newDate);
        } else {
            // if not all of the dropdowns have been select, set the mendix value as empty
            date.setValue(undefined);
        }
    };

    const handleClear = () => {
        setDropdownState(emptyDropdownState);
        date.setValue(undefined);
    }

    useEffect(() => {
        // pass the props up to the state if the date changes inside mendix
        if (date.value !== undefined) {
            setDropdownState({
                month: date.value.getMonth(),
                day: date.value.getDate(),
                year: date.value.getFullYear()
            });
        } else {
            // Values used if the month, day, or year are disabled
            const defaultMonthState = defaultMonth.value ? parseFloat(defaultMonth.value.toFixed(0)) : 0;
            const defaultDayState = defaultDay.value ? parseFloat(defaultDay.value.toFixed(0)) : 1;
            const defaultYearState = defaultYear.value
                ? new Date().getFullYear() + parseFloat(defaultYear.value.toFixed(0))
                : new Date().getFullYear();
            setDropdownState({
                month: useMonth ? dropdownState.month : defaultMonthState,
                day: useDay ? dropdownState.day : defaultDayState,
                year: useYear ? dropdownState.year : defaultYearState
            });
        }
    }, [
        date,
        defaultDay.value,
        defaultMonth.value,
        defaultYear.value,
        dropdownState.day,
        dropdownState.month,
        dropdownState.year,
        useDay,
        useMonth,
        useYear
    ]);

    // Only render after the attributes are ready
    if (
        minYear.status === ValueStatus.Available &&
        maxYear.status === ValueStatus.Available &&
        date.status === ValueStatus.Available
    ) {
        return (
            <div id={name} className="widget-dropdowndatepicker">
                <div className="dropdowns">
                    {sortDropdowns()
                        .sort((a, b) => a.sort - b.sort)
                        .map(dropdown => {
                            return dropdown.element;
                        })}
                </div>
                {date.validation && <Alert id={name + "-error"}>{date.validation}</Alert>}
            </div>
        );
    } else {
        return (
            <div id={name} className="widget-dropdowndatepicker">
                <span style={{ display: "none" }}>loading</span>
            </div>
        );
    }
};

export default DropdownDatePicker;
