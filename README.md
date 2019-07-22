## Workflow Designer

[![NPM Version](http://img.shields.io/npm/v/wfd.svg?style=flat)](https://www.npmjs.org/package/wfd)
[![NPM Downloads](https://img.shields.io/npm/dm/wfd.svg?style=flat)](https://www.npmjs.org/package/wfd)
![](https://img.shields.io/badge/license-MIT-000000.svg)

![image](https://github.com/guozhaolong/wfd/raw/master/example/snapshots/1.jpg)

## Online Demo
https://guozhaolong.github.io/wfd/

## Usage
```
import React, { Component,Fragment } from 'react';
import Designer from 'wfd';

const data = {
    nodes: [{ id: 'startNode', x: 50, y: 200, label: 'Start', clazz: 'start' },
      { id: 'taskNode1', x: 200, y: 200, label: 'Supervisor', assignee: 'admin', isSequential:false, clazz: 'userTask' },
      { id: 'taskNode2', x: 400, y: 200, label: 'Manager', assignee: 'admin', isSequential:false, clazz: 'userTask' },
      { id: 'decisionNode', x: 400, y: 320, label: 'Cost > 1000', clazz: 'gateway' },
      { id: 'taskNode3', x: 400, y: 450, label: 'CEO', clazz: 'userTask' },
      { id: 'endNode', x: 600, y: 320, label: 'End', clazz: 'end' }],
    edges: [{ source: 'startNode', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
      { source: 'taskNode1', target: 'endNode', sourceAnchor:0, targetAnchor:0, clazz: 'flow' },
      { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
      { source: 'taskNode2', target: 'decisionNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' },
      { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, clazz: 'flow' },
      { source: 'decisionNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0, clazz: 'flow' },
      { source: 'decisionNode', target: 'endNode', sourceAnchor:1, targetAnchor:2, clazz: 'flow'},
      { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, clazz: 'flow' },
      { source: 'taskNode3', target: 'taskNode1', sourceAnchor:3, targetAnchor:2, clazz: 'flow'},

class WFDemo extends Component {
    constructor(props) {
        super(props);
        this.wfDef = React.createRef();
    }
    
    handleSave = () => {
        const bpm = this.wfDef.current.graph.save();
    }
      
    render(){
        const candidateUsers = [{id:'1',name:'Tom'},{id:'2',name:'Steven'},{id:'3',name:'Andy'}];
        const candidateGroups = [{id:'1',name:'Manager'},{id:'2',name:'Security'},{id:'3',name:'OA'}];
        return (
            <Fragment>
                <a onClick={this.handleSave}>Save</a>
                <Designer data={data} ref={this.wfDef} height={600} mode={"edit"} lang="zh" users={candidateUsers} groups={candidateGroups}/>
            </Fragment>
        )
    }
}
```
## API
##### Designer
###### 属性
* data: 初始化数据
* height: 画布高度
* mode: view为只读，edit为可编辑
* lang: zh为中文，en为英文
* users: 选择审批人时对应的数据，数组内对象以id为键，name为值
* groups: 选择审批组时对应的数据，数组内对象以id为键，name为值

###### 方法
* save(): 调用graph.save()生成json

##### Node
###### 属性
* id: 唯一标识
* x: x点
* y: y点
* label: 节点标题
* hideIcon: 是否隐藏图标  
* active: 是否显示节点状态（节点边将显示运动动画）
* clazz: 类，对应flowable节点，支持类型如下:
    * start 开始节点
    * timerStart 定时启动节点
    * messageStart 消息启动节点
    * signalStart 信号启动节点
    * gateway 排他网关
    * userTask 用户审批节点
    * scriptTask 脚本节点
    * mailTask 邮件节点
    * javaTask 自定义类节点
    * receiveTask 接收状态节点
    * timerCatch 定时捕获节点
    * messageCatch 消息捕获节点
    * signalCatch 信号捕获节点
    * end 结束节点
    
##### Edge
###### 属性
* source: 源节点ID
* target: 目标节点ID
* sourceAnchor: 源节点锚点，0上、1右、2下、3左
* targetAnchor: 目标节点锚点
* clazz: 类，目前只有flow一种

##### UserTask
###### 属性
* assignType 审批类型，包含人员、人员组、自定义类
* assignValue 关联审批人或组
* javaClass 自定义类名
* dueDate 持续时间
* isSequential 是否会签

##### ScriptTask
###### 属性
* script 脚本内容

##### JavaTask
###### 属性
* javaClass 自定义类名

##### ReceiveTask
###### 属性
* waitState 等待状态字段名
* stateValue 等待状态值

##### MailTask
###### 属性
* to 收件人
* subject 邮件主题
* content 邮件内容

## Run Example
```
> cd example
> umi dev
```

## React Version
```
>= 16.x
```