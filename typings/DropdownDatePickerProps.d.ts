/**
 * This file was generated from DropdownDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type MonthTypeEnum = "num" | "abbr" | "full";

export type DayTypeEnum = "num" | "withSuffix";

export interface DropdownDatePickerContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    date: EditableValue<Date>;
    useMonth: boolean;
    defaultMonth: DynamicValue<Big>;
    monthSort: DynamicValue<Big>;
    monthLabel: DynamicValue<string>;
    monthType: MonthTypeEnum;
    useDay: boolean;
    defaultDay: DynamicValue<Big>;
    daySort: DynamicValue<Big>;
    dayLabel: DynamicValue<string>;
    dayType: DayTypeEnum;
    useYear: boolean;
    defaultYear: DynamicValue<Big>;
    yearSort: DynamicValue<Big>;
    yearLabel: DynamicValue<string>;
    minYear: DynamicValue<Big>;
    maxYear: DynamicValue<Big>;
    sortYearsAsc: boolean;
}

export interface DropdownDatePickerPreviewProps {
    readOnly: boolean;
    date: string;
    onDateChange: {} | null;
    useMonth: boolean;
    defaultMonth: string;
    monthSort: string;
    monthLabel: string;
    monthType: MonthTypeEnum;
    useDay: boolean;
    defaultDay: string;
    daySort: string;
    dayLabel: string;
    dayType: DayTypeEnum;
    useYear: boolean;
    defaultYear: string;
    yearSort: string;
    yearLabel: string;
    minYear: string;
    maxYear: string;
    sortYearsAsc: boolean;
}
