import { Component, createElement } from "react";
import DayDropdown, { maxDaysInMonth } from "./components/dayDropdown";
import MonthDropdown from "./components/monthDropdown";
import YearDropdown from "./components/yearDropdown";
import { DropdownDatePickerContainerProps } from "../typings/DropdownDatePickerProps";
import { ValueStatus } from "mendix";

import "./ui/DropdownDatePicker.css";

type DropdownDatePickerContainerState = {
    month: number;
    day: number;
    year: number;
};

export default class DropdownDatePicker extends Component<
    DropdownDatePickerContainerProps,
    DropdownDatePickerContainerState
> {
    state: DropdownDatePickerContainerState = {
        month: this.props.useMonth ? (this.props.date.value !== undefined ? this.props.date.value.getMonth() : -1) : 1,
        day: this.props.useDay ? (this.props.date.value !== undefined ? this.props.date.value.getDate() : -1) : 1,
        year: this.props.useYear
            ? this.props.date.value !== undefined
                ? this.props.date.value.getFullYear()
                : -1
            : new Date().getFullYear()
    };

    sortDropdowns() {
        const dropdowns = [];
        if (
            this.props.minYear.status === ValueStatus.Available &&
            this.props.maxYear.status === ValueStatus.Available &&
            this.props.monthSort.status === ValueStatus.Available &&
            this.props.daySort.status === ValueStatus.Available &&
            this.props.yearSort.status === ValueStatus.Available
        ) {
            if (this.props.useMonth) {
                dropdowns.push({
                    sort: parseFloat(this.props.monthSort.value.toFixed(0)),
                    jsx: (
                        <MonthDropdown
                            month={this.state.month}
                            monthType={this.props.monthType}
                            monthLabel={this.props.monthLabel}
                            setMonth={(newMonth: number) => this.handleChange({ ...this.state, month: newMonth })}
                            disabled={this.props.date.readOnly}
                        />
                    )
                });
            }
            if (this.props.useDay) {
                dropdowns.push({
                    sort: parseFloat(this.props.daySort.value.toFixed(0)),
                    jsx: (
                        <DayDropdown
                            dayLabel={this.props.dayLabel}
                            setDay={(newDay: number) => this.handleChange({ ...this.state, day: newDay })}
                            month={this.state.month}
                            day={this.state.day}
                            year={this.state.year}
                            disabled={this.props.date.readOnly}
                        />
                    )
                });
            }
            if (this.props.useYear) {
                dropdowns.push({
                    sort: parseFloat(this.props.yearSort.value.toFixed(0)),
                    jsx: (
                        <YearDropdown
                            year={this.state.year}
                            minYear={parseFloat(this.props.minYear.value.toFixed(0))}
                            maxYear={parseFloat(this.props.maxYear.value.toFixed(0))}
                            yearLabel={this.props.yearLabel}
                            setYear={(newYear: number) => this.handleChange({ ...this.state, year: newYear })}
                            disabled={this.props.date.readOnly}
                        />
                    )
                });
            }
        }
        return dropdowns;
    }

    render() {
        console.log("Props", this.props);
        if (
            this.props.minYear.status === ValueStatus.Available &&
            this.props.maxYear.status === ValueStatus.Available &&
            this.props.date.status === ValueStatus.Available
        ) {
            return (
                <div id={this.props.name} className={"widget-dropdowndatepicker " + this.props.class}>
                    {this.sortDropdowns()
                        .sort((a, b) => a.sort - b.sort)
                        .map(dropdown => {
                            return dropdown.jsx;
                        })}
                </div>
            );
        } else {
            return (
                <div id={this.props.name} className={this.props.class ? "widget-dropdowndatepicker " + this.props.class : "widget-dropdowndatepicker"}>
                    <span style={{ display: "none" }}>loading</span>
                </div>
            );
        }
    }

    handleChange(newState: DropdownDatePickerContainerState) {
        this.setState(newState);
        if (
            newState.month !== -1 &&
            newState.day !== -1 &&
            newState.year !== -1 &&
            maxDaysInMonth(newState.month) >= newState.day
        ) {
            //update mendix object
            const newDate = new Date();
            //clear Time
            newDate.setMilliseconds(0);
            newDate.setSeconds(0);
            newDate.setMinutes(0);
            newDate.setHours(0);

            console.log("newState", newState);
            newDate.setDate(newState.day);
            newDate.setMonth(newState.month);
            newDate.setFullYear(newState.year);

            console.log("newDate", newDate);
            this.props.date.setValue(newDate);
        } else {
            this.props.date.setValue(undefined);
        }
    }
}
