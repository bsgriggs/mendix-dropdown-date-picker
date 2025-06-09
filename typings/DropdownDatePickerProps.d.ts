/**
 * This file was generated from DropdownDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { Big } from "big.js";

export type DateFormatEnum = "DATE" | "MONTH" | "YEAR" | "TIME" | "DATETIME" | "CUSTOM";

export type ReadOnlyDisplayTypeEnum = "DROPDOWNS" | "TEXT";

export interface DropdownDatePickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    date: EditableValue<Date>;
    dateFormat: DateFormatEnum;
    customDateFormat: DynamicValue<string>;
    showClearBtn: boolean;
    showClearBtnWhenEmpty: boolean;
    clearBtnIcon?: DynamicValue<WebIcon>;
    clearBtnTooltip: DynamicValue<string>;
    minYear: DynamicValue<Big>;
    maxYear: DynamicValue<Big>;
    sortYearsAsc: DynamicValue<boolean>;
    includeDateSuffix: boolean;
    readOnlyDisplayType: ReadOnlyDisplayTypeEnum;
    defaultYear: DynamicValue<Big>;
    defaultMonth: DynamicValue<Big>;
    defaultDay: DynamicValue<Big>;
    defaultHour: DynamicValue<Big>;
    defaultMinute: DynamicValue<Big>;
    defaultSecond: DynamicValue<Big>;
    ariaLabel?: DynamicValue<string>;
    yearLabel: DynamicValue<string>;
    monthLabel: DynamicValue<string>;
    dayLabel: DynamicValue<string>;
    hourLabel: DynamicValue<string>;
    minuteLabel: DynamicValue<string>;
    secondLabel: DynamicValue<string>;
    amPmLabel: DynamicValue<string>;
    onDropChange?: ActionValue;
    onEnter?: ActionValue;
    onLeave?: ActionValue;
}

export interface DropdownDatePickerPreviewProps {
    readOnly: boolean;
    date: string;
    dateFormat: DateFormatEnum;
    customDateFormat: string;
    showClearBtn: boolean;
    showClearBtnWhenEmpty: boolean;
    clearBtnIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    clearBtnTooltip: string;
    minYear: string;
    maxYear: string;
    sortYearsAsc: string;
    includeDateSuffix: boolean;
    readOnlyDisplayType: ReadOnlyDisplayTypeEnum;
    defaultYear: string;
    defaultMonth: string;
    defaultDay: string;
    defaultHour: string;
    defaultMinute: string;
    defaultSecond: string;
    ariaLabel: string;
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    hourLabel: string;
    minuteLabel: string;
    secondLabel: string;
    amPmLabel: string;
    onDateChange: {} | null;
    onDropChange: {} | null;
    onEnter: {} | null;
    onLeave: {} | null;
}
