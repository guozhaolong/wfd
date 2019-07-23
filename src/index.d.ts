import * as React from 'react';
export interface IDesignerProps {
    data: Object;
    height: Number;
    mode: String;
    lang: String;
    isView: Boolean;
    users: Array<Object>;
    groups: Array<Object>;
}

export default class Designer extends React.Component<IDesignerProps, any> {}