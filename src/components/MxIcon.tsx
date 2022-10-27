import { createElement, ReactElement } from "react";
import { WebIcon } from "mendix";
import { Icon } from "mendix/components/web/Icon";

interface IconProps {
    title: string;
    defaultClassname: string;
    mxIconOverride?: WebIcon;
}

const MxIcon = (props: IconProps): ReactElement =>
    props.mxIconOverride !== undefined ? (
        <div title={props.title}>
            <Icon icon={props.mxIconOverride} altText={props.title} />
        </div>
    ) : (
        <span className={`glyphicon glyphicon-${props.defaultClassname}`} aria-hidden="true" title={props.title} />
    );

export default MxIcon;
