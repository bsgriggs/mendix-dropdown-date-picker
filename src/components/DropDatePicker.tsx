import { Fragment, ReactElement, createElement, useEffect, useMemo, useState } from "react";
import YearDropdown from "./sub-components/yearDropdown";
import MonthDropdown from "./sub-components/monthDropdown";
import DayDropdown from "./sub-components/dayDropdown";
import HourDropdown from "./sub-components/hourDropdown";
import MinuteDropdown from "./sub-components/minuteDropdown";
import SecondDropdown from "./sub-components/secondDropdown";
import AmPmDropdown from "./sub-components/amPmDropdown";
import { WebIcon } from "mendix";
import MxIcon from "./sub-components/mxIcon";

export interface DropDatePickerProps {
    // system
    id: string;
    tabIndex: number;

    // general
    date: Date | undefined;
    setDate: (newDate: Date | undefined) => void;
    readonly: boolean;
    dateFormat: string;

    // clear btn
    showClearBtn: boolean;
    showClearBtnWhileEmpty: boolean;
    clearBtnTooltip?: string;
    clearBtnIcon?: WebIcon;

    // customization
    includeSuffix: boolean;
    minYear: number;
    maxYear: number;
    sortYearsAsc: boolean;

    // defaults
    defaultYear: number;
    defaultMonth: number;
    defaultDay: number;
    defaultHour: number;
    defaultMinute: number;
    defaultSecond: number;

    // labels
    ariaLabel: string | undefined;
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    hourLabel: string;
    minuteLabel: string;
    secondLabel: string;
    amPmLabel: string;

    // events
    onEnter?: () => void;
    onLeave?: () => void;
    onChange?: () => void;
}

type DropdownState = {
    month: number;
    day: number;
    year: number;
    hour: number;
    minute: number;
    second: number;
    AmPm: "AM" | "PM";
};

const emptyDropdownState: DropdownState = {
    year: -1,
    month: -1,
    day: -1,
    hour: -1,
    minute: -1,
    second: -1,
    AmPm: "AM"
};

export function DropDatePicker(props: DropDatePickerProps): ReactElement {
    const [dropdownState, setDropdownState] = useState<DropdownState>(emptyDropdownState);
    const [clearByWidget, setClearByWidget] = useState<boolean>(false);
    const useDay: boolean = useMemo(() => props.dateFormat.includes("d"), [props.dateFormat]);
    const useMonth: boolean = useMemo(() => props.dateFormat.includes("M"), [props.dateFormat]);
    const useYear: boolean = useMemo(() => props.dateFormat.toLowerCase().includes("y"), [props.dateFormat]);
    const useHour: boolean = useMemo(() => props.dateFormat.toLowerCase().includes("h"), [props.dateFormat]);
    const useMinute: boolean = useMemo(() => props.dateFormat.includes("m"), [props.dateFormat]);
    const useSecond: boolean = useMemo(() => props.dateFormat.includes("s"), [props.dateFormat]);
    const useAmPm: boolean = useMemo(() => props.dateFormat.includes("h"), [props.dateFormat]);
    const [label, setLabel] = useState<string>("");

    // include the provided SystemLabel in the aria-Label for each dropdown
    useEffect(() => {
        // poll the label, the system label is NOT included in props so the widget cannot detect changes
        const interval = window.setInterval(() => {
            const labelElement = document.getElementById(`${props.id}-label`);
            setLabel(
                (labelElement ? `${labelElement.innerHTML} ` : "") + (props.ariaLabel ? `${props.ariaLabel} ` : "")
            );
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [props.id, props.ariaLabel]);

    // values used when a useYear, useMonth etc is false
    const defaultDropdownState: DropdownState = useMemo(() => {
        const newDefaultState: DropdownState = {
            year: props.defaultYear,
            month: props.defaultMonth,
            day: props.defaultDay,
            hour: props.defaultHour,
            minute: props.defaultMinute,
            second: props.defaultSecond,
            AmPm: props.defaultHour > 11 ? "PM" : "AM"
        };
        // update the state incase a date can be created
        const newDropdownState = {
            year: useYear ? dropdownState.year : newDefaultState.year,
            month: useMonth ? dropdownState.month : newDefaultState.month,
            day: useDay ? dropdownState.day : newDefaultState.day,
            hour: useHour ? dropdownState.hour : newDefaultState.hour,
            minute: useMinute ? dropdownState.minute : newDefaultState.minute,
            second: useSecond ? dropdownState.second : newDefaultState.second,
            AmPm: useAmPm ? dropdownState.AmPm : newDefaultState.AmPm
        };
        setDropdownState(newDropdownState);
        // do NOT call handleChange(), would cause infinite self reference
        return newDefaultState;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.defaultYear,
        useYear,
        props.defaultMonth,
        useMonth,
        props.defaultDay,
        useDay,
        props.defaultHour,
        useHour,
        props.defaultMinute,
        useMinute,
        props.defaultSecond,
        useSecond
    ]);

    useEffect(() => {
        // only reset the dropdown state if the date was cleared outside the widget
        if (clearByWidget === false) {
            // pass the props up to the state if the date changes inside Mendix
            if (props.date !== undefined) {
                const newAmPm = props.date.getHours() > 11 ? "PM" : "AM";
                setDropdownState({
                    month: props.date.getMonth(),
                    day: props.date.getDate(),
                    year: props.date.getFullYear(),
                    hour: props.date.getHours(),
                    minute: props.date.getMinutes(),
                    second: props.date.getSeconds(),
                    AmPm: newAmPm
                });
            } else {
                setDropdownState(emptyDropdownState);
            }
        }
        setClearByWidget(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.date]);

    const handleChange = (newState: DropdownState): void => {
        // update the state with the param
        setDropdownState(newState);
        // create the params for a JavaScript date
        const year = useYear ? newState.year : defaultDropdownState.year;
        const month = useMonth ? newState.month : defaultDropdownState.month;
        const day = useDay ? newState.day : defaultDropdownState.day;
        const hour = useHour ? newState.hour : defaultDropdownState.hour;
        const minute = useMinute ? newState.minute : defaultDropdownState.minute;
        const second = useSecond ? newState.second : defaultDropdownState.second;

        if (month !== -1 && day !== -1 && year !== -1 && hour !== -1 && minute !== -1 && second !== -1) {
            // send new date to Mendix
            props.setDate(new Date(year, month, day, hour, minute, second));
        } else {
            // not all the dropdowns have value/using default, set the Mendix value as empty
            props.setDate(undefined);
        }
        setClearByWidget(true);
    };

    return (
        <div className="dropdowns">
            {props.dateFormat.split(/\W/).map(dateFormatSegment => {
                const char = dateFormatSegment.charAt(0);
                return char.toLowerCase() === "y" ? (
                    <YearDropdown
                        {...props}
                        ariaLabel={`${label}${props.yearLabel}`}
                        defaultOption={props.yearLabel}
                        minYear={props.minYear}
                        maxYear={props.maxYear}
                        sortYearsAsc={props.sortYearsAsc}
                        year={dropdownState.year}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.toLowerCase().indexOf("y"),
                            props.dateFormat.toLowerCase().lastIndexOf("y") + 1
                        )}
                        setYear={(newYear: number) => handleChange({ ...dropdownState, year: newYear })}
                    />
                ) : char === "M" ? (
                    <MonthDropdown
                        {...props}
                        ariaLabel={`${label}${props.monthLabel}`}
                        defaultOption={props.monthLabel}
                        month={dropdownState.month}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.indexOf("M"),
                            props.dateFormat.lastIndexOf("M") + 1
                        )}
                        setMonth={(newMonth: number) => handleChange({ ...dropdownState, month: newMonth })}
                    />
                ) : char === "d" ? (
                    <DayDropdown
                        {...props}
                        ariaLabel={`${label}${props.dayLabel}`}
                        defaultOption={props.dayLabel}
                        includeSuffix={props.includeSuffix}
                        setDay={(newDay: number) => handleChange({ ...dropdownState, day: newDay })}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.indexOf("d"),
                            props.dateFormat.lastIndexOf("d") + 1
                        )}
                        month={dropdownState.month}
                        day={dropdownState.day}
                        year={dropdownState.year}
                    />
                ) : char.toLowerCase() === "h" ? (
                    <HourDropdown
                        {...props}
                        ariaLabel={`${label}${props.hourLabel}`}
                        defaultOption={props.hourLabel}
                        hour={dropdownState.hour}
                        setHour={(newHour: number) => handleChange({ ...dropdownState, hour: newHour })}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.toLowerCase().indexOf("h"),
                            props.dateFormat.toLowerCase().lastIndexOf("h") + 1
                        )}
                        useAmPm={useAmPm}
                        amPm={dropdownState.AmPm}
                    />
                ) : char === "m" ? (
                    <MinuteDropdown
                        {...props}
                        ariaLabel={`${label}${props.minuteLabel}`}
                        defaultOption={props.minuteLabel}
                        minute={dropdownState.minute}
                        setMinute={(newMinute: number) => handleChange({ ...dropdownState, minute: newMinute })}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.indexOf("m"),
                            props.dateFormat.lastIndexOf("m") + 1
                        )}
                    />
                ) : char === "s" ? (
                    <SecondDropdown
                        {...props}
                        ariaLabel={`${label}${props.secondLabel}`}
                        defaultOption={props.secondLabel}
                        second={dropdownState.second}
                        setSecond={(newSecond: number) => handleChange({ ...dropdownState, second: newSecond })}
                        dropdownFormat={props.dateFormat.substring(
                            props.dateFormat.indexOf("s"),
                            props.dateFormat.lastIndexOf("s") + 1
                        )}
                    />
                ) : char === "a" ? (
                    <AmPmDropdown
                        {...props}
                        ariaLabel={`${label}${props.amPmLabel}`}
                        defaultOption={props.amPmLabel}
                        amPm={dropdownState.AmPm}
                        setAmPm={(newAmPm: "AM" | "PM") => {
                            let newHour = dropdownState.hour;
                            if (newHour !== -1) {
                                if (newAmPm === "AM") {
                                    newHour -= 12;
                                }
                                if (newAmPm === "PM") {
                                    newHour += 12;
                                }
                            }
                            handleChange({ ...dropdownState, AmPm: newAmPm, hour: newHour });
                        }}
                        dropdownFormat="a"
                    />
                ) : (
                    <Fragment />
                );
            })}
            {props.showClearBtn &&
                props.readonly === false &&
                (props.showClearBtnWhileEmpty || props.date !== undefined) && (
                    <button
                        title={props.clearBtnTooltip || "Clear Date"}
                        aria-label={props.clearBtnTooltip || "Clear Date"}
                        aria-describedby={`${props.id}-label`}
                        className="btn mx-button btn-sm btn-default"
                        onClick={() => handleChange(emptyDropdownState)}
                    >
                        <MxIcon
                            defaultClassname="remove"
                            mxIconOverride={props.clearBtnIcon}
                            title={props.clearBtnTooltip || "Clear Date"}
                        />
                    </button>
                )}
        </div>
    );
}
