export function getShapeName(clazz) {
  switch (clazz) {
    case 'start': return 'start-node';
    case 'end': return 'end-node';
    case 'gateway': return 'gateway-node';
    case 'timerStart': return 'timer-start-node';
    case 'messageStart': return 'message-start-node';
    case 'signalStart': return 'signal-start-node';
    case 'userTask': return 'user-task-node';
    case 'scriptTask': return 'script-task-node';
    case 'mailTask': return 'mail-task-node';
    case 'javaTask': return 'java-task-node';
    case 'receiveTask': return 'receive-task-node';
    case 'timerCatch': return 'timer-catch-node';
    case 'messageCatch': return 'message-catch-node';
    case 'signalCatch': return 'signal-catch-node';
    case 'meetingTask': return 'meeting-task-node';
    case 'dataModel': return 'data-model-node';
    case 'filterModel': return 'filter-model-node';
    case 'regressionModel': return 'regression-model-node';
    case 'clusterModel': return 'cluster-model-node';
    case 'treeModel': return 'tree-model-node';
    case 'porDenModel': return 'por-den-model-node';
    case 'rtPorModel': return 'rt-por-model-node';
    case 'decisionModel': return 'decision-model-node';
    case 'archModel': return 'arch-model-node';
    default: return 'task-node';
  }
}
