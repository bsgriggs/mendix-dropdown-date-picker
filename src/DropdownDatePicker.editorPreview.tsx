import { Component, ReactNode, createElement } from "react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";

declare function require(name: string): string;

export class preview extends Component<DropdownDatePickerPreviewProps> {
    render(): ReactNode {
        // return <HelloWorldSample sampleText={this.props.sampleText} />;
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/DropdownDatePicker.css");
}
