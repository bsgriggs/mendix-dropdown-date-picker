import { FunctionComponent, createElement } from "react";
import classNames from "classnames";

export interface AlertProps {
    id?: string;
    alertStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
    className?: string;
}

const Alert: FunctionComponent<AlertProps> = ({ alertStyle, className, children, id }):JSX.Element =>{
    Alert.displayName = "Alert";
    Alert.defaultProps = { alertStyle: "danger" };
    return (
            <div id={id} className={classNames(`alert alert-${alertStyle} mx-validation-message`, className)}>
                {children}
            </div>
    )
}



export default Alert;