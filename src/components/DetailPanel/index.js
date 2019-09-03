import React, {forwardRef} from "react";
import UserTaskDetail from "./UserTaskDetail";
import ScriptTaskDetail from "./ScriptTaskDetail";
import JavaTaskDetail from "./JavaTaskDetail";
import ReceiveTaskDetail from "./ReceiveTaskDetail";
import MailTaskDetail from "./MailTaskDetail";
import TimerEventDetail from "./TimerEventDetail";
import SignalEventDetail from "./SignalEventDetail";
import MessageEventDetail from "./MessageEventDetail";
import GatewayDetail from "./GatewayDetail";
import FlowDetail from "./FlowDetail";
import 'antd/lib/input/style';
import 'antd/lib/select/style';
import 'antd/lib/switch/style';
import styles from "./index.less";

const DetailPanel = forwardRef(({height,model,users,groups,messageDefs,signalDefs,onChange,readOnly = false,},ref)=>{
  return (
    <div ref={ref} className={styles.detailPanel} style={{height}}>
      { model.clazz === 'userTask' && <UserTaskDetail model={model} onChange={onChange} readOnly={readOnly} users={users} groups={groups}/>}
      { model.clazz === 'scriptTask' && <ScriptTaskDetail model={model} onChange={onChange} readOnly={readOnly} /> }
      { model.clazz === 'javaTask' && <JavaTaskDetail model={model} onChange={onChange} readOnly={readOnly} /> }
      { model.clazz === 'receiveTask' && <ReceiveTaskDetail model={model} onChange={onChange} readOnly={readOnly} /> }
      { model.clazz === 'mailTask' && <MailTaskDetail model={model} onChange={onChange} readOnly={readOnly} /> }
      { (model.clazz === 'timerStart' || model.clazz === 'timerCatch') && <TimerEventDetail model={model} onChange={onChange} readOnly={readOnly}/>}
      { (model.clazz === 'signalStart' || model.clazz === 'signalCatch') && <SignalEventDetail model={model} onChange={onChange} readOnly={readOnly}/>}
      { (model.clazz === 'messageStart' || model.clazz === 'messageCatch') && <MessageEventDetail model={model} onChange={onChange} readOnly={readOnly}/>}
      { model.clazz === 'gateway' && <GatewayDetail model={model} onChange={onChange} readOnly={readOnly} /> }
      { model.clazz === 'flow' && <FlowDetail model={model} onChange={onChange} readOnly={readOnly} /> }
    </div>
  )
});

export default DetailPanel;
