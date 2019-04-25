import * as React from 'react';
export interface IDesignerProps {
    onSave?: (d: Object) => void;
    data: Object;
}

export default class Designer extends React.Component<IDesignerProps, any> {}