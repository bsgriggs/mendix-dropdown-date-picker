import { FunctionComponent, createElement, ReactElement } from "react";

export interface AlertProps {
    id?: string;
    alertStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
    className?: string;
}

const Alert: FunctionComponent<AlertProps> = ({ alertStyle, className, children, id }):ReactElement =>{
    Alert.displayName = "Alert";
    Alert.defaultProps = { alertStyle: "danger" };
    return (
            <div id={id} className={`alert alert-${alertStyle} mx-validation-message ${className}`}>
                {children}
            </div>
    )
}



export default Alert;