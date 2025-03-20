import { ReactElement, createElement } from "react";
import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";
import { DropDatePicker } from "./components/DropDatePicker";

export function preview(props: DropdownDatePickerPreviewProps): ReactElement {
    return (
        <DropDatePicker
            id={""}
            tabIndex={0}
            date={new Date()}
            setDate={newDate => console.info(newDate)}
            readonly={false}
            dateFormat={props.dateFormat}
            minYear={0}
            maxYear={0}
            sortYearsAsc={false}
            yearLabel={props.yearLabel}
            monthLabel={props.monthLabel}
            dayLabel={props.dayLabel}
            hourLabel={props.hourLabel}
            minuteLabel={props.minuteLabel}
            secondLabel={props.secondLabel}
            amPmLabel={props.amPmLabel}
            includeSuffix={props.includeDateSuffix}
            showClearBtn={props.showClearBtn}
            showClearBtnWhileEmpty={props.showClearBtn}
            defaultYear={0}
            defaultMonth={0}
            defaultDay={0}
            defaultHour={0}
            defaultMinute={0}
            defaultSecond={0}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DropdownDatePicker.css");
}
