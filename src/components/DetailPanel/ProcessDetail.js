import styles from "./index.less";
import {Input, Button} from "antd";
import React, {useContext, useState} from "react";
import LangContext from "../../util/context";
import DataTableModal from "./DataTableModal";

const ProcessDetail = ({model,onChange,readOnly = false,}) => {
  const { i18n,lang } = useContext(LangContext);
  const [dataObjsModalVisible,setDataObjsModalVisible] = useState(false);
  const [signalDefsModalVisible,setSignalDefsModalVisible] = useState(false);
  const [messageDefsModalVisible,setMessageDefsModalVisible] = useState(false);
  const dataObjCols = [
    { title: i18n['process.dataObjs.id'], dataIndex: 'id', editable:false },
    { title: i18n['process.dataObjs.name'], dataIndex: 'name', editable:true },
    { title: i18n['process.dataObjs.type'], dataIndex: 'type', editable:true },
    { title: i18n['process.dataObjs.defaultValue'], dataIndex: 'defaultValue', editable:true },
  ];
  return (
    <>
      <div data-clazz={model.clazz}>
        <div className={styles.panelTitle}>{i18n['process']}</div>
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
            <div>
              {i18n['process.dataObjs']}：
              <Button disabled={readOnly} onClick={()=> setDataObjsModalVisible(true)}>{i18n['tooltip.edit']}</Button>
            </div>
          </div>
          <div className={styles.panelRow}>
            <div>
              {i18n['process.signalDefs']}：
              <Button disabled={readOnly} onClick={()=> setSignalDefsModalVisible(true)}>{i18n['tooltip.edit']}</Button>
            </div>
          </div>
          <div className={styles.panelRow}>
            <div>
              {i18n['process.messageDefs']}：
              <Button disabled={readOnly} onClick={()=> setMessageDefsModalVisible(true)}>{i18n['tooltip.edit']}</Button>
            </div>
          </div>
        </div>
      </div>
      <DataTableModal title={i18n['process.dataObjs']}
                      lang={lang}
                      newRowKeyPrefix="dataObj"
                      cols={dataObjCols}
                      data={model.dataObjs}
                      visible={dataObjsModalVisible}
                      onOk={(d)=> {
                        setDataObjsModalVisible(false);
                        onChange('dataObjs',d);
                      }}
                      onCancel={() => setDataObjsModalVisible(false)} />
      <DataTableModal title={i18n['process.signalDefs']}
                      lang={lang}
                      newRowKeyPrefix="signal"
                      cols={dataObjCols}
                      data={model.signalDefs}
                      visible={signalDefsModalVisible}
                      onOk={(d)=> {
                        setSignalDefsModalVisible(false);
                        onChange('signalDefs',d);
                      }}
                      onCancel={() => setSignalDefsModalVisible(false)} />
      <DataTableModal title={i18n['process.messageDefs']}
                      lang={lang}
                      newRowKeyPrefix="message"
                      cols={dataObjCols}
                      data={model.messageDefs}
                      visible={messageDefsModalVisible}
                      onOk={(d)=> {
                        setMessageDefsModalVisible(false);
                        onChange('messageDefs',d);
                      }}
                      onCancel={() => setMessageDefsModalVisible(false)} />
    </>
  )
};

export default ProcessDetail;
