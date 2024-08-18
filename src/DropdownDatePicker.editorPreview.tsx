import { ReactElement, createElement } from "react";
import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";
import { WebIcon } from "mendix";
import MxIcon from "./components/MxIcon";

type dropdown = {
    sort: number;
    element: ReactElement;
};

export function preview(props: DropdownDatePickerPreviewProps): ReactElement {
    // sort the order of the dropdowns based on the sort widget settings
    const sortDropdowns = (): dropdown[] => {
        const dropdowns: dropdown[] = [];

        if (props.useMonth) {
            dropdowns.push({
                sort: 1,
                element: (
                    <div className="month-dropdown">
                        <select className="form-control" value={props.monthLabel}>
                            <option value={props.monthLabel}>{props.monthLabel}</option>
                        </select>
                    </div>
                )
            });
        }
        if (props.useDay) {
            dropdowns.push({
                sort: 2,
                element: (
                    <div className="day-dropdown">
                        <select className="form-control" value={props.dayLabel}>
                            <option value={props.dayLabel}>{props.dayLabel}</option>
                        </select>
                    </div>
                )
            });
        }
        if (props.useYear) {
            dropdowns.push({
                sort: 3,
                element: (
                    <div className="year-dropdown">
                        <select className="form-control" value={props.yearLabel}>
                            <option value={props.yearLabel}>{props.yearLabel}</option>
                        </select>
                    </div>
                )
            });
        }
        if (props.showClearBtn) {
            dropdowns.push({
                sort: 10,
                element: (
                    <button className="btn btn-sm mx-button btn-default">
                        <MxIcon
                            defaultClassname="remove"
                            title={props.clearBtnTooltip}
                            mxIconOverride={props.clearBtnIcon?.type ? (props.clearBtnIcon as WebIcon) : undefined}
                        />
                    </button>
                )
            });
        }
        return dropdowns;
    };

    return (
        <div className="widget-dropdowndatepicker">
            <div className="dropdowns">
                {sortDropdowns()
                    .sort((a, b) => a.sort - b.sort)
                    .map(dropdown => {
                        return dropdown.element;
                    })}
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/DropdownDatePicker.css");
}
