import styles from "./index.less";
import { Input, } from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";
import { IJavaModel } from '../../types';

export interface JavaProps {
  model: IJavaModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}
const JavaTaskDetail: React.FC<JavaProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['javaTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['javaTask.javaClass']}：</div>
          <Input style={{width: '100%', fontSize: 12}}
                 value={model.javaClass}
                 onChange={(e) => {
                   onChange('javaClass', e.target.value)
                 }}
                 disabled={readOnly}
          />
        </div>
      </div>
    </div>
  )
};

export default JavaTaskDetail;
