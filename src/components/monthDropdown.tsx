import { createElement } from "react";
import { MonthTypeEnum } from "../../typings/DropdownDatePickerProps";
import Select from 'react-select';

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

const months: Array<Month> = [
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

const MonthDropdown = (props: monthDropdownProps) => {
    const handleSelect = (option: Month) => {
        try {
            props.setMonth(parseInt(option.num) - 1);
        } catch (e) {
            console.error(e);
        }
    };

    const defaultMonth = { num: "-1", abbr: props.monthLabel, full: props.monthLabel};    
    const displayMonths = [defaultMonth, ...months];

    return (
        <div className="month-dropdown">
            <Select<Month>
                className="form-control"
                value={props.month === -1 ? defaultMonth : months[props.month]}
                getOptionLabel={(month: Month) => month[props.monthType]}
                getOptionValue={(month: Month) => month.num}
                options={displayMonths}
                onChange={handleSelect}
                aria-haspopup="listbox"
                isDisabled={props.disabled}
            />
        </div>
    );
};

export default MonthDropdown;
