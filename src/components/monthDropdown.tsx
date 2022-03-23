import { createElement } from "react";
import { MonthTypeEnum } from "../../typings/DropdownDatePickerProps";

export type monthDropdownProps = {
    month: number;
    monthLabel: string;
    monthType: MonthTypeEnum;
    setMonth: (newMonth: number) => void;
    disabled: boolean;
};

interface Month {
    num: string;
    abbr: string;
    full: string;
}

const months: Month[] = [
    {
        num: "1",
        abbr: "Jan",
        full: "Janruary"
    },
    {
        num: "2",
        abbr: "Feb",
        full: "February"
    },
    {
        num: "3",
        abbr: "Mar",
        full: "March"
    },
    {
        num: "4",
        abbr: "Apr",
        full: "April"
    },
    {
        num: "5",
        abbr: "May",
        full: "May"
    },
    {
        num: "6",
        abbr: "Jun",
        full: "June"
    },
    {
        num: "7",
        abbr: "Jul",
        full: "July"
    },
    {
        num: "8",
        abbr: "Aug",
        full: "August"
    },
    {
        num: "9",
        abbr: "Sep",
        full: "September"
    },
    {
        num: "10",
        abbr: "Oct",
        full: "October"
    },
    {
        num: "11",
        abbr: "Nov",
        full: "November"
    },
    {
        num: "12",
        abbr: "Dec",
        full: "December"
    }
];

const MonthDropdown = (props: monthDropdownProps): JSX.Element => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        try {
            props.setMonth(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    const renderOptions = (): JSX.Element[] => {
        const options: JSX.Element[] = [];
        if (props.disabled && props.month !== -1){
            options.push(
                <option value={props.month} aria-selected="true">
                    {months[props.month][props.monthType]}
                </option>
            );   
        } else{
            for (let i = 0; i < 12; i++) {
                options.push(
                    <option value={i} aria-selected={props.month === i} selected={props.month === i}>
                        {months[i][props.monthType]}
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
