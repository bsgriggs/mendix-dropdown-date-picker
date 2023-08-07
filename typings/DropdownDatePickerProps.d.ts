/**
 * This file was generated from DropdownDatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { Big } from "big.js";

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
    dateOrder?: DynamicValue<string>;
    showClearBtn: boolean;
    clearBtnIcon?: DynamicValue<WebIcon>;
    clearBtnTooltip: DynamicValue<string>;
    useMonth: boolean;
    defaultMonth: DynamicValue<Big>;
    monthLabel: DynamicValue<string>;
    monthType: MonthTypeEnum;
    useDay: boolean;
    defaultDay: DynamicValue<Big>;
    dayLabel: DynamicValue<string>;
    dayType: DayTypeEnum;
    useYear: boolean;
    defaultYear: DynamicValue<Big>;
    yearLabel: DynamicValue<string>;
    minYear: DynamicValue<Big>;
    maxYear: DynamicValue<Big>;
    sortYearsAsc: boolean;
}

export interface DropdownDatePickerPreviewProps {
    class: string;
    style: string;
    date: string;
    onDateChange: {} | null;
    dateOrder: string;
    showClearBtn: boolean;
    clearBtnIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    clearBtnTooltip: string;
    useMonth: boolean;
    defaultMonth: string;
    monthLabel: string;
    monthType: MonthTypeEnum;
    useDay: boolean;
    defaultDay: string;
    dayLabel: string;
    dayType: DayTypeEnum;
    useYear: boolean;
    defaultYear: string;
    yearLabel: string;
    minYear: string;
    maxYear: string;
    sortYearsAsc: boolean;
}
