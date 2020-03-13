import styles from "./index.less";
import React, {useContext} from "react";
import DefaultDetail, { DefaultProps } from './DefaultDetail';
import LangContext from "../../util/context";

const GatewayDetail: React.FC<DefaultProps> = ({model,onChange,readOnly = false,}) => {
  const { i18n } = useContext(LangContext);
  const title = model.clazz === 'exclusiveGateway' || model.clazz === 'gateway' ? i18n['exclusiveGateway']
    : model.clazz === 'parallelGateway' ? i18n['parallelGateway'] : i18n['inclusiveGateway'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly}/>
      </div>
    </div>
  )
};

export default GatewayDetail;
