import styles from "./index.less";
import {Checkbox, Input,} from "antd";
import React, {useContext} from "react";
import DefaultDetail from './DefaultDetail';
import LangContext from "../../util/context";
import { IFlowModel } from '../../types';

export interface FlowProps {
  model: IFlowModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
const FlowDetail: React.FC<FlowProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['sequenceFlow'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['sequenceFlow.expression']}：</div>
          <Input.TextArea style={{width: '100%', fontSize: 12}}
                          rows={4}
                          value={model.conditionExpression}
                          onChange={(e) => {
                            onChange('conditionExpression', e.target.value)
                          }}
                          disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['sequenceFlow.seq']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.seq}
                 onChange={(e) => {
                   onChange('seq', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <Checkbox onChange={(e) => onChange('reverse', e.target.checked)}
                    disabled={readOnly}
                    checked={!!model.reverse}>{i18n['sequenceFlow.reverse']}</Checkbox>
        </div>
      </div>
    </div>
  )
};

export default FlowDetail;
