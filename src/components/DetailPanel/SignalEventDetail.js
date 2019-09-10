import styles from "./index.less";
import { Select, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";

const SignalEventDetail = ({model,onChange,readOnly = false,signalDefs = []}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['signalEvent'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['signalEvent.signal']}：</div>
          <Select
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['signalEvent.signal']}
            defaultValue={model.signal}
            onChange={(e) => onChange('signal', e)}
            disabled={readOnly}
          >
            {signalDefs && signalDefs.map(signalDef => (<Select.Option key={signalDef.id}>{signalDef.name}</Select.Option>))}
          </Select>
        </div>
      </div>
    </div>
  )
};

export default SignalEventDetail;
