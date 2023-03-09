import { createElement, ReactElement, ChangeEvent, useState, useEffect } from "react";
import { MonthTypeEnum } from "../../typings/DropdownDatePickerProps";

export type monthDropdownProps = {
    month: number;
    monthLabel: string;
    monthType: MonthTypeEnum;
    setMonth: (newMonth: number) => void;
    disabled: boolean;
};

const MonthDropdown = (props: monthDropdownProps): ReactElement => {
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        const monthFormat = props.monthType === "full" ? "MMMM" : props.monthType === "abbr" ? "MMM" : "M";
        const monthList: string[] = [];
        for (let i = 0; i < 12; i++) {
            /* eslint-disable */
            // @ts-ignore
            monthList.push(mx.parser.formatValue(new Date().setMonth(i), "datetime", { datePattern: monthFormat }));
            /* eslint-enable */
        }
        setMonths(monthList);
    }, [props.monthType]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        try {
            props.setMonth(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const renderOptions = (): ReactElement[] => {
        const options: ReactElement[] = [];
        if (props.disabled && props.month !== -1) {
            options.push(
                <option value={props.month} aria-selected="true">
                    {months[props.month + 1]}
                </option>
            );
        } else {
            for (let i = 0; i < 12; i++) {
                options.push(
                    <option value={i} aria-selected={props.month === i} selected={props.month === i}>
                        {months[i]}
                    </option>
                );
            }
        }
        return options;
    };

    return (
        <div className="month-dropdown">
            <select
                className="form-control"
                value={props.month === -1 ? props.monthLabel : props.month}
                onChange={handleSelect}
                aria-haspopup="listbox"
                disabled={props.disabled}
            >
                <option value={-1} aria-selected={props.month === -1} selected={props.month === -1}>
                    {props.monthLabel}
                </option>
                {renderOptions().map(option => {
                    return option;
                })}
            </select>
        </div>
    );
};

export default MonthDropdown;
