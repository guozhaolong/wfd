import styles from "./index.less";
import { Input, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";

const ScriptTaskDetail = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['scriptTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['scriptTask.script']}：</div>
          <Input.TextArea style={{width: '100%', fontSize: 12}}
                          rows={4}
                          value={model.script}
                          onChange={(e) => {
                            onChange('script', e.target.value)
                          }}
                          disabled={readOnly}
          />
        </div>
      </div>
    </div>
  )
};

export default ScriptTaskDetail;
