import { createElement, ReactElement, useMemo } from "react";
import { DropdownDatePickerContainerProps } from "../typings/DropdownDatePickerProps";
import { DropDatePicker } from "./components/DropDatePicker";
import Alert from "./components/sub-components/alert";

import "./ui/DropdownDatePicker.css";
import MxFormatter from "./utils/MxFormatter";

const DropdownDatePicker = (props: DropdownDatePickerContainerProps): ReactElement => {
    /* eslint-disable */
    // @ts-ignore
    const { languageTag = "en-US", patterns, firstDayOfWeek } = window.mx.session.getConfig().locale;
    /* eslint-enable */

    const dateFormat: string = useMemo(
        () =>
            props.dateFormat === "DATE"
                ? patterns.date
                : props.dateFormat === "DATETIME"
                ? patterns.datetime
                : props.dateFormat === "TIME"
                ? patterns.time
                : props.dateFormat === "YEAR"
                ? "yyyy"
                : props.dateFormat === "MONTH"
                ? "MMMM yyyy"
                : props.customDateFormat.value,
        [props.dateFormat, props.customDateFormat, patterns]
    );

    return (
        <div id={props.id} className="widget-dropdowndatepicker">
            {props.date.readOnly === false || props.readOnlyDisplayType === "DROPDOWNS" ? (
                <DropDatePicker
                    // system
                    id={props.id}
                    tabIndex={props.tabIndex || 0}
                    // general
                    date={props.date.value}
                    setDate={newDate => props.date.setValue(newDate)}
                    dateFormat={dateFormat}
                    readonly={props.date.readOnly}
                    // clear btn
                    showClearBtn={props.showClearBtn}
                    showClearBtnWhileEmpty={props.showClearBtnWhenEmpty}
                    clearBtnIcon={props.clearBtnIcon?.value}
                    clearBtnTooltip={props.clearBtnTooltip.value}
                    // customization
                    includeSuffix={props.includeDateSuffix}
                    minYear={Number(props.minYear.value)}
                    maxYear={Number(props.maxYear.value)}
                    sortYearsAsc={props.sortYearsAsc.value as boolean}
                    // defaults
                    defaultYear={Number(props.defaultYear.value)}
                    defaultMonth={Number(props.defaultMonth.value)}
                    defaultDay={Number(props.defaultDay.value)}
                    defaultHour={Number(props.defaultHour.value)}
                    defaultMinute={Number(props.defaultMinute.value)}
                    defaultSecond={Number(props.defaultSecond.value)}
                    // text
                    yearLabel={props.yearLabel.value as string}
                    monthLabel={props.monthLabel.value as string}
                    dayLabel={props.dayLabel.value as string}
                    hourLabel={props.hourLabel.value as string}
                    minuteLabel={props.minuteLabel.value as string}
                    secondLabel={props.secondLabel.value as string}
                    amPmLabel={props.amPmLabel.value as string}
                    // events
                    onChange={() => props.onDropChange?.execute()}
                    onEnter={() => props.onEnter?.execute()}
                    onLeave={() => props.onLeave?.execute()}
                />
            ) : (
                <div className="form-control-static">
                    {props.date.value !== undefined ? MxFormatter(props.date.value, dateFormat) : ""}
                </div>
            )}

            {props.date.validation && <Alert id={props.name + "-error"}>{props.date.validation}</Alert>}
        </div>
    );
};

export default DropdownDatePicker;
