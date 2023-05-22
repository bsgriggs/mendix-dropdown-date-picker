import { createElement, useState, useEffect, ReactElement } from "react";
import DayDropdown from "./components/dayDropdown";
import MonthDropdown from "./components/monthDropdown";
import YearDropdown from "./components/yearDropdown";
import { DropdownDatePickerContainerProps } from "../typings/DropdownDatePickerProps";
import { ValueStatus, DynamicValue } from "mendix";
import Alert from "./components/alert";
import MxIcon from "./components/MxIcon";
import { Big } from "big.js";

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

const FormatDefaults = (
    defaultMonth: DynamicValue<Big>,
    defaultDay: DynamicValue<Big>,
    defaultYear: DynamicValue<Big>
): DropdownDatePickerContainerState => {
    const defaultMonthState = defaultMonth.value ? parseFloat(defaultMonth.value.toFixed(0)) : 0;
    const defaultDayState = defaultDay.value ? parseFloat(defaultDay.value.toFixed(0)) : 1;
    const defaultYearState = defaultYear.value
        ? new Date().getFullYear() + parseFloat(defaultYear.value.toFixed(0))
        : new Date().getFullYear();
    return { day: defaultDayState, month: defaultMonthState, year: defaultYearState };
};

const DropdownDatePicker = ({
    date,
    dayLabel,
    // daySort,
    dayType,
    defaultDay,
    defaultMonth,
    defaultYear,
    maxYear,
    minYear,
    monthLabel,
    // monthSort,
    monthType,
    sortYearsAsc,
    useDay,
    useMonth,
    useYear,
    yearLabel,
    // yearSort,
    name,
    showClearBtn,
    clearBtnTooltip,
    clearBtnIcon,
    tabIndex,
    dateOrder
}: DropdownDatePickerContainerProps): ReactElement => {
    // set state default values, -1 shows the selects label
    const [dropdownState, setDropdownState] = useState<DropdownDatePickerContainerState>(emptyDropdownState);
    const defaults = FormatDefaults(defaultMonth, defaultDay, defaultYear);
    // sort the order of the dropdowns based on the sort widget settings
    const sortDropdowns = (): dropdown[] => {
        const newDropdowns: dropdown[] = [];
        let localizedPlaceholder = "";
        if (dateOrder && dateOrder.value?.trim() !== "") {
            localizedPlaceholder = dateOrder.value as string;
        } else {
            /* eslint-disable */
            // @ts-ignore
            localizedPlaceholder = date.formatter.getFormatPlaceholder();
            /* eslint-enable */
        }

        if (minYear.status === ValueStatus.Available && maxYear.status === ValueStatus.Available) {
            if (useMonth) {
                newDropdowns.push({
                    sort: localizedPlaceholder.indexOf("m"),
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
                newDropdowns.push({
                    sort: localizedPlaceholder.indexOf("d"),
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
                newDropdowns.push({
                    sort: localizedPlaceholder.indexOf("y"),
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
                newDropdowns.push({
                    sort: 15,
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
        return newDropdowns;
    };

    const handleChange = (newState: DropdownDatePickerContainerState): void => {
        // update the state with the value from the child component
        setDropdownState(newState);
        // attempt to create and update mendix with the new date
        const month = useMonth ? newState.month : defaults.month;
        const day = useDay ? newState.day : defaults.day;
        const year = useYear ? newState.year : defaults.year;
        // console.info("newStates", {month,day,year})
        if (month !== -1 && day !== -1 && year !== -1) {
            // send new date to Mendix
            date.setValue(new Date(year, month, day));
        } else {
            // if not all of the dropdowns have been select, set the mendix value as empty
            date.setValue(undefined);
        }
    };

    const handleClear = (): void => {
        setDropdownState(emptyDropdownState);
        date.setValue(undefined);
    };

    useEffect(() => {
        // pass the props up to the state if the date changes inside mendix
        if (date.value !== undefined) {
            setDropdownState({
                month: date.value.getMonth(),
                day: date.value.getDate(),
                year: date.value.getFullYear()
            });
        } else {
            setDropdownState(emptyDropdownState);
            // // Values used if the month, day, or year are disabled
            // setDropdownState({
            //     month: useMonth ? dropdownState.month : defaults.month,
            //     day: useDay ? dropdownState.day : defaults.day,
            //     year: useYear ? dropdownState.year : defaults.year
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    // Only render after the attributes are ready
    if (
        minYear.status === ValueStatus.Available &&
        maxYear.status === ValueStatus.Available &&
        date.status === ValueStatus.Available
    ) {
        return (
            <div id={name} className="widget-dropdowndatepicker" tabIndex={tabIndex}>
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
