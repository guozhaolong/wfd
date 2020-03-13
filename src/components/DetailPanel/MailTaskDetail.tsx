import styles from "./index.less";
import { Input, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";
import { IMailModel } from '../../types';

export interface MailProps {
  model: IMailModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
const MailTaskDetail: React.FC<MailProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['mailTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['mailTask.to']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.to}
                 onChange={(e) => {
                   onChange('to', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['mailTask.subject']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.subject}
                 onChange={(e) => {
                   onChange('subject', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['mailTask.content']}：</div>
          <Input.TextArea style={{width: '100%', fontSize: 12}}
                          rows={4}
                          value={model.content}
                          onChange={(e) => {
                            onChange('content', e.target.value)
                          }}
                          disabled={readOnly}
          />
        </div>
      </div>
    </div>
  )
};

export default MailTaskDetail;
