import styles from "./index.less";
import { Checkbox, Input } from "antd";
import React, {useContext} from "react";
import LangContext from "../../util/context";

const DefaultDetail = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  return (
    <>
      <div className={styles.panelRow}>
        <div>{i18n['label']}：</div>
        <Input style={{width: '100%', fontSize: 12}}
               value={model.label}
               onChange={(e) => onChange('label', e.target.value)}
               disabled={readOnly}
        />
      </div>
      <div className={styles.panelRow}>
        <Checkbox onChange={(e) => onChange('hideIcon', e.target.checked)}
                  disabled={readOnly}
                  checked={!!model.hideIcon}>{i18n['hideIcon']}</Checkbox>
      </div>
    </>
  )
};

export default DefaultDetail;
