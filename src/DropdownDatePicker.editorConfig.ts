import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";
import { Problem, Properties, hidePropertyIn, hidePropertiesIn } from "@mendix/pluggable-widgets-tools";
import { PreviewProps } from "../typings/PreviewProps";

export function getProperties(_values: DropdownDatePickerPreviewProps, defaultProperties: Properties): Properties {
    if (!_values.showClearBtn) {
        hidePropertiesIn(defaultProperties, _values, ["clearBtnIcon", "clearBtnTooltip", "showClearBtnWhenEmpty"]);
    }

    if (_values.dateFormat !== "CUSTOM") {
        hidePropertyIn(defaultProperties, _values, "customDateFormat");
    }

    return defaultProperties;
}

export function check(_values: DropdownDatePickerPreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
export const getDisplayName = (_values: DropdownDatePickerPreviewProps): string =>
    "[" + (_values.date.length > 0 ? _values.date : "No attribute selected") + "]";

export const getPreview = (_values: DropdownDatePickerPreviewProps, isDarkMode: boolean): PreviewProps => {
    const mainContent: PreviewProps = {
        type: "RowLayout",
        columnSize: "grow",
        backgroundColor: _values.readOnly ? (isDarkMode ? "#505050" : "#D3D3D3") : isDarkMode ? "#252525" : "#FFFFFF",
        borders: true,
        borderWidth: 1,
        borderRadius: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                grow: 0,
                children: [
                    {
                        type: "Image",
                        width: 20,
                        height: 20,
                        data: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALFSURBVHgB7Zo/b9NAGMafs0LSIkBh4k9byTCgCKnAVMTWqAsqSzIzwAeggn4DujFWgp12gJGAhAJDJXfOhKiECgzN0KpiaiSkoprmjnubpsTUsU18kXy9+0mvZPvOUZ4nvvNzjoEOrixP1o4soUnVDr93alzNhPfWDhSY8BaA0Lg8pIAdfojOtGSdx4CcBAMIhgHJhR0UIrueMDaw1lAcGI41AIZjvAGhk2C5XIYpGH8btHMADMdOgmEHPS/V+mKoqJ6gQydBDaOw2rVAGmoru9j60e7bPnYxh+rM6NH+i1c/EcXUjQKmJvMYFsoNeLPyC421vb7ttycLAQOev442YE7WMA2wdwEYjjUAhmMNgOHYKAzFzN0/K4PQ6b7t584EQ9uz+egn2qWryr9iABuF4zo01nw0Pu9F9nkkf/UuJy4Kk/i4uNprgI3CmmENgOFYA2A41gAYTmwOmLkzgrELyeOojcJDRnUUNn4I2D9H0XnLyljIgE/Qm3dIiQvD3xTtmlADIDQpEu5BkXiLyah97XKIlCrbLvz2NBzRXH8/sQpFZN4At7JRLPiFlwKi0nO4mYOofqmPx97B6Py8P/IY4A9pXybJJhd8+Xt9fOlgHxnn2r3NJQj2IKSpJU0oR5nQEX9qVcq8+W8bE2z+64fLi5k2gC577vONiC59TYgS3z3X3/WvZHotwNu/b8V0Ke6DeddnNwP9Eog/ODc/mp/OtAGOYEliesCEhOKPyP4cMLtFQ8BN0LXlOLzKOVtMKt7hTraHAEGzPZIt2IqcO15S8XKALax/vNTUIgfQ5U2XudwsQgl84Vt94iltaROE1JnwVzyhjQFEehOC4gmtDCAGN+G4eEI7A4j/NyFcPKGlAURyE/qLJ7Q1gIg3IVo8ofVjcVoD0FpAbjaPt8aLJ7S+ArqU7m67bbb/xHEoBLEmY3w56TODPx/W3nFo9hvAAAAAAElFTkSuQmCC"
                    }
                ]
            },
            {
                type: "RowLayout",
                padding: 4,
                columnSize: "grow",
                grow: 1,
                children: [
                    {
                        type: "Text",
                        fontColor: isDarkMode ? "#579BF9" : "#146FF4",
                        content: getDisplayName(_values)
                    }
                ]
            }
        ]
    };

    return {
        type: "Container",
        children: [mainContent]
    };
};

export function getCustomCaption(_values: DropdownDatePickerPreviewProps): string {
    return "Dropdown date picker: " + getDisplayName(_values);
}
