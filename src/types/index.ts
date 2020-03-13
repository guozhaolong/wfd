export interface NodeModel {
  id?: string;
  name?: string;
  clazz?: 'start' | 'end' | 'gateway' | 'exclusiveGateway' | 'parallelGateway' | 'inclusiveGateway'
    | 'timerStart' | 'messageStart' | 'signalStart' | 'userTask' | 'scriptTask' | 'mailTask'
    | 'javaTask' | 'receiveTask' | 'timerCatch' | 'messageCatch' | 'signalCatch' | 'subProcess';
  label?: string;
  x?: number;
  y?: number;
  active?: boolean;
  hideIcon?: boolean;
}
export interface JavaModel {
  javaClass?: string;
}
export interface MailModel {
  to?: string;
  subject?: string;
  content?: string;
}
export interface UserModel {
  assignType?: 'person' | 'persongroup' | 'custom';
  assignValue?: string;
  dueDate?: string;
  isSequential?: boolean;
}
export interface MessageModel {
  message?: string;
}
export interface ReceiveModel {
  waitState?: string;
  stateValue?: string;
}
export interface ScriptModel {
  script?: string;
}
export interface SignalModel {
  signal?: string;
}
export interface TimerModel {
  cycle?: string;
  duration?: string;
}

export interface EdgeModel {
  id?: string;
  name?: string;
  source?: string;
  target?: string;
  sourceAnchor?: number;
  targetAnchor?: number;
  clazz?: 'flow';
  label?: string;
}

export interface FlowModel {
  conditionExpression?: string;
  seq?: string;
  reverse?: boolean;
}
