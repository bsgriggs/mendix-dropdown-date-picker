/**
 * This file was generated from DropdownDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type MonthTypeEnum = "num" | "abbr" | "full";

export type DayTypeEnum = "num" | "withSuffix";

export interface DropdownDatePickerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    date: EditableValue<Date>;
    onDateChange?: ActionValue;
    useMonth: boolean;
    defaultMonth: DynamicValue<BigJs.Big>;
    monthSort: DynamicValue<BigJs.Big>;
    monthLabel: string;
    monthType: MonthTypeEnum;
    useDay: boolean;
    defaultDay: DynamicValue<BigJs.Big>;
    daySort: DynamicValue<BigJs.Big>;
    dayLabel: string;
    dayType: DayTypeEnum;
    useYear: boolean;
    defaultYear: DynamicValue<BigJs.Big>;
    yearSort: DynamicValue<BigJs.Big>;
    yearLabel: string;
    minYear: DynamicValue<BigJs.Big>;
    maxYear: DynamicValue<BigJs.Big>;
}

export interface DropdownDatePickerPreviewProps {
    class: string;
    style: string;
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
}
