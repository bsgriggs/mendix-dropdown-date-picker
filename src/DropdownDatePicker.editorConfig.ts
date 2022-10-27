import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";
import { hidePropertiesIn } from "./utils/PageEditorUtils";

export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(_values: DropdownDatePickerPreviewProps, defaultProperties: Properties): Properties {
    if (_values.useDay === true) {
        hidePropertiesIn(defaultProperties, _values, ["defaultDay"]);
    } else {
        hidePropertiesIn(defaultProperties, _values, ["daySort", "dayLabel", "dayType"]);
    }
    if (_values.useMonth === true) {
        hidePropertiesIn(defaultProperties, _values, ["defaultMonth"]);
    } else {
        hidePropertiesIn(defaultProperties, _values, ["monthSort", "monthLabel", "monthType"]);
    }
    if (_values.useYear === true) {
        hidePropertiesIn(defaultProperties, _values, ["defaultYear"]);
    } else {
        hidePropertiesIn(defaultProperties, _values, ["minYear", "maxYear", "sortYearsAsc", "yearSort", "yearLabel"]);
    }
    return defaultProperties;
}

export function check(_values: DropdownDatePickerPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (_values.useDay === false && _values.useMonth === false && _values.useYear === false) {
        errors.push(
            {
                property: `useDay`,
                message: `At least 1 dropdown must be used.`,
                url: "https://github.com/bsgriggs/mendix-dropdown-date-picker"
            },
            {
                property: `useMonth`,
                message: `At least 1 dropdown must be used.`,
                url: "https://github.com/bsgriggs/mendix-dropdown-date-picker"
            },
            {
                property: `useYear`,
                message: `At least 1 dropdown must be used.`,
                url: "https://github.com/bsgriggs/mendix-dropdown-date-picker"
            }
        );
    }

    return errors;
}
