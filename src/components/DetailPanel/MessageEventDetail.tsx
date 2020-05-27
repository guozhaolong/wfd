import styles from "./index.less";
import { Select, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";
import { IMessageModel, ISelectData } from '../../types';

export interface MessageProps {
  model: IMessageModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
  messageDefs: ISelectData[];
}
const MessageEventDetail: React.FC<MessageProps> = ({model,onChange,readOnly = false,messageDefs = []}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['signalEvent'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['messageEvent.message']}：</div>
          <Select
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['messageEvent.message']}
            defaultValue={model.message}
            onChange={(e) => onChange('message', e)}
            disabled={readOnly}
          >
            {messageDefs && messageDefs.map(messageDef => (<Select.Option value={messageDef.id}>{messageDef.name}</Select.Option>))}
          </Select>
        </div>
      </div>
    </div>
  )
};

export default MessageEventDetail;
