/**
 * This file was generated from DropdownDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type MonthTypeEnum = "num" | "abbr" | "full";

export interface DropdownDatePickerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    date: EditableValue<Date>;
    onDateChange?: ActionValue;
    useMonth: boolean;
    monthSort: DynamicValue<BigJs.Big>;
    monthLabel: string;
    monthType: MonthTypeEnum;
    useDay: boolean;
    daySort: DynamicValue<BigJs.Big>;
    dayLabel: string;
    useYear: boolean;
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
    monthSort: string;
    monthLabel: string;
    monthType: MonthTypeEnum;
    useDay: boolean;
    daySort: string;
    dayLabel: string;
    useYear: boolean;
    yearSort: string;
    yearLabel: string;
    minYear: string;
    maxYear: string;
}
