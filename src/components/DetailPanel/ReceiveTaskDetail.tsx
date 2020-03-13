import styles from "./index.less";
import { Input, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";
import { IReceiveModel } from '../../types';

export interface ReceiveProps {
  model: IReceiveModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
const ReceiveTaskDetail: React.FC<ReceiveProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['receiveTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['receiveTask.waitState']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.waitState}
                 onChange={(e) => {
                   onChange('waitState', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['receiveTask.stateValue']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.stateValue}
                 onChange={(e) => {
                   onChange('stateValue', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
      </div>
    </div>
  )
};

export default ReceiveTaskDetail;
