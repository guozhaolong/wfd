import styles from "./index.less";
import {Input,} from "antd";
import React, {useContext} from "react";
import DefaultDetail from './DefaultDetail';
import LangContext from "../../util/context";
import { ITimerModel } from '../../types';

export interface TimerProps {
  model: ITimerModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
const TimerEventDetail: React.FC<TimerProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['timerEvent'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['timerEvent.cycle']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.cycle}
                 onChange={(e) => {
                   onChange('cycle', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['timerEvent.duration']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.duration}
                 onChange={(e) => {
                   onChange('duration', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
      </div>
    </div>
  )
};

export default TimerEventDetail;
