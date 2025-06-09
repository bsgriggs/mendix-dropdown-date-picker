import { createElement, ReactElement, ChangeEvent, useMemo } from "react";
import ICommonDropdownProps from "../../../typings/commonDropdownProps";
import MxFormatter from "../../utils/MxFormatter";

export interface SecondDropdownProps extends ICommonDropdownProps {
    second: number;
    setSecond: (newHour: number) => void;
}

const SecondDropdown = (props: SecondDropdownProps): ReactElement => {
    const options = useMemo(() => {
        const options = [];
        if (props.readonly && props.second !== -1) {
            const secondTemplate = new Date(1970, 0, 1, 0, 0, props.second);
            options.push(
                <option key={props.second} value={props.second} aria-selected selected>
                    {MxFormatter(secondTemplate, props.dropdownFormat)}
                </option>
            );
        } else {
            const secondTemplate = new Date(1970, 0, 1);

            for (let i = 0; i < 60; i++) {
                secondTemplate.setSeconds(i);
                options.push(
                    <option key={i} value={i} aria-selected={props.second === i} selected={props.second === i}>
                        {MxFormatter(secondTemplate, props.dropdownFormat)}
                    </option>
                );
            }
        }
        return options;
    }, [props.dropdownFormat, props.second, props.readonly]);

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        if (props.onChange) {
            props.onChange();
        }
        try {
            props.setSecond(parseInt(event.target.value, 10));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="second-dropdown">
            <select
                id={props.id + "-second"}
                tabIndex={props.tabIndex}
                className="form-control"
                value={props.second === -1 ? props.defaultOption : props.second}
                onChange={handleSelect}
                disabled={props.readonly}
                aria-label={props.ariaLabel}
                onFocus={props.onEnter}
                onBlur={props.onLeave}
            >
                <option value={-1} aria-selected={props.second === -1} selected={props.second === -1}>
                    {props.defaultOption}
                </option>
                {options}
            </select>
        </div>
    );
};

export default SecondDropdown;
