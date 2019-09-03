import styles from "./index.less";
import {TimePicker,} from "antd";
import React, {useContext} from "react";
import DefaultDetail from "./DefaultDetail";
import LangContext from "../../util/context";

const TimerEventDetail = ({model,onChange,readOnly = false,}) => {
  const i18n = useContext(LangContext);
  const title = i18n['timerEvent'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail i18n={i18n} model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div style={{display: 'inline'}}>{i18n['timerEvent.cycle']}：</div>
          <TimePicker defaultValue={model.cycle}
                      placeholder={i18n['timerEvent.cycle.placeholder']}
                      format="HH:mm"
                      disabled={readOnly}
                      onChange={(time) => onChange('cycle', time)}
          />
        </div>
        <div className={styles.panelRow}>
          <div style={{display: 'inline'}}>{i18n['timerEvent.duration']}：</div>
          <TimePicker defaultValue={model.duration}
                      placeholder={i18n['timerEvent.cycle.placeholder']}
                      format="HH:mm"
                      disabled={readOnly}
                      onChange={(time) => onChange('duration', time)}
          />
        </div>
      </div>
    </div>
  )
};

export default TimerEventDetail;
