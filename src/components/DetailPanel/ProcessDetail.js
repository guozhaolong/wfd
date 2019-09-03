import styles from "./index.less";
import {Input, Select,} from "antd";
import React, {useContext} from "react";
import LangContext from "../../util/context";

const ProcessDetail = ({model,onChange,readOnly = false,}) => {
  const i18n = useContext(LangContext);
  const title = i18n['process'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <div className={styles.panelRow}>
          <div>{i18n['process.id']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.id}
                 onChange={(e) => onChange('id', e.target.value)}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['process.name']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.name}
                 onChange={(e) => onChange('name', e.target.value)}
                 disabled={readOnly}
          />
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['process.dataObjs']}：</div>
          <Select
            mode="tags"
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['process.dataObjs']}
            defaultValue={model.dataObjs}
            onChange={(e) => onChange('dataObjs', e)}
            disabled={readOnly}
            open={false}
          >
          </Select>
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['process.signalDefs']}：</div>
          <Select
            mode="tags"
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['process.signalDefs']}
            defaultValue={model.signalDefs}
            onChange={(e) => onChange('signalDefs', e)}
            disabled={readOnly}
            open={false}
          >
          </Select>
        </div>
        <div className={styles.panelRow}>
          <div>{i18n['process.messageDefs']}：</div>
          <Select
            mode="tags"
            style={{width: '100%', fontSize: 12}}
            placeholder={i18n['process.messageDefs']}
            defaultValue={model.messageDefs}
            onChange={(e) => onChange('messageDefs', e)}
            disabled={readOnly}
            open={false}
          >
          </Select>
        </div>
      </div>
    </div>
  )
};

export default ProcessDetail;
