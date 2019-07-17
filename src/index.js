import React, {Component,Fragment} from 'react';
import {Input,Select,Checkbox,Collapse,DatePicker,TimePicker} from 'antd'
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/switch/style/css';
import styles from './index.less';
import G6 from '@antv/g6/src';
import { getShapeName } from './util/clazz'
import moment from 'moment';
import locale from './locales/index';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare,faCopy, faPaste,faTrashAlt,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faLayerUp, faLayerDown,faUndo,faRedo } from './util/faIcons';
library.add(faShare,faCopy,faPaste,faTrashAlt,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup,faLayerUp,faLayerDown,faUndo,faRedo);
import Command from './plugins/command'
import Toolbar from './plugins/toolbar'
import AddItemPanel from './plugins/addItemPanel'
import CanvasPanel from './plugins/canvasPanel'
import registerItem from './item'
import registerBehavior from './behavior'
registerItem(G6);
registerBehavior(G6);
const { Panel } = Collapse;
const LangContext = React.createContext();
const DetailPanel = ({model,users,groups,onChange,readOnly = false,})=>{
  return (
    <LangContext.Consumer>
      {
        (i18n) => {
          let title;
          if(model.clazz === 'userTask')
            title = i18n['userTask'];
          else if(model.clazz === 'javaTask')
            title = i18n['javaTask'];
          else if(model.clazz === 'scriptTask')
            title = i18n['scriptTask'];
          else if(model.clazz === 'mailTask')
            title = i18n['mailTask'];
          else if(model.clazz === 'receiveTask')
            title = i18n['receiveTask'];
          else if(model.clazz === 'gateway')
            title = i18n['exclusiveGateway'];
          else if(model.clazz === 'flow')
            title = i18n['sequenceFlow'];
          else if(model.clazz === 'start')
            title = i18n['startEvent'];
          else if(model.clazz === 'end')
            title = i18n['endEvent'];
          else if(model.clazz === 'timerStart' || model.clazz === 'timerCatch')
            title = i18n['timerEvent'];
          else if(model.clazz === 'messageStart' || model.clazz === 'messageCatch')
            title = i18n['messageEvent'];
          else if(model.clazz === 'signalStart' || model.clazz === 'signalCatch')
            title = i18n['signalEvent'];
          return (
            model.clazz ? <div data-clazz={model.clazz}>
              <div className={styles.panelTitle}>{title}</div>
              <div className={styles.panelBody}>
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
                {
                  model.clazz === 'userTask' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div>{i18n['userTask.assignType']}：</div>
                      <Select
                        style={{width: '100%', fontSize: 12}}
                        placeholder={i18n['userTask.assignType.placeholder']}
                        defaultValue={"person"}
                        value={model.assignType}
                        onChange={(e) => onChange('assignType', e)}
                        disabled={readOnly}
                      >
                        <Select.Option key="person">{i18n['userTask.assignType.person']}</Select.Option>
                        <Select.Option key="persongroup">{i18n['userTask.assignType.persongroup']}</Select.Option>
                        <Select.Option key="custom">{i18n['userTask.assignType.custom']}</Select.Option>
                      </Select>
                    </div>
                    {
                      model.assignType === 'person' &&
                      <div className={styles.panelRow}>
                        <div>{i18n['userTask.assignType.person.title']}：</div>
                        <Select
                          mode="multiple"
                          showSearch
                          style={{width: '100%', fontSize: 12}}
                          placeholder={i18n['userTask.assignType.person.placeholder']}
                          optionFilterProp="children"
                          defaultValue={model.candidateUsers}
                          onChange={(e) => onChange('candidateUsers', e)}
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          disabled={readOnly}
                        >
                          {users && users.map(user => (<Select.Option key={user.id}>{user.name}</Select.Option>))}
                        </Select>
                      </div>
                    }
                    {
                      model.assignType === 'persongroup' &&
                      <div className={styles.panelRow}>
                        <div>{i18n['userTask.assignType.persongroup.title']}：</div>
                        <Select
                          mode="multiple"
                          showSearch
                          style={{width: '100%', fontSize: 12}}
                          placeholder={i18n['userTask.assignType.persongroup.placeholder']}
                          optionFilterProp="children"
                          defaultValue={model.candidateGroups}
                          onChange={(e) => onChange('candidateGroups', e)}
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          disabled={readOnly}
                        >
                          {groups && groups.map(group => (<Select.Option key={group.id}>{group.name}</Select.Option>))}
                        </Select>
                      </div>
                    }
                    {
                      model.assignType === 'custom' &&
                      <div className={styles.panelRow}>
                        <div>{i18n['userTask.assignType.custom.title']}：</div>
                        <Input style={{width: '100%', fontSize: 12}}
                               value={model.javaClass}
                               onChange={(e) => {
                                 onChange('javaClass', e.target.value)
                               }}
                               disabled={readOnly}
                        />
                      </div>
                    }
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['userTask.dueDate']}：</div>
                      <DatePicker defaultValue={model.dueDate ? moment(model.dueDate) : null}
                                  disabled={readOnly}
                                  placeholder={i18n['userTask.dueDate.placeholder']}
                                  showTime
                                  style={{width: '100%'}}
                                  onChange={(value, dateString) => onChange('dueDate', value)}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <Checkbox onChange={(e) => onChange('isSequential', e.target.checked)}
                                disabled={readOnly}
                                checked={!!model.isSequential}>{i18n['userTask.counterSign']}</Checkbox>
                    </div>
                  </Fragment>
                }
                {
                  model.clazz === 'scriptTask' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['scriptTask.script']}：</div>
                      <Input.TextArea style={{width: '100%', fontSize: 12}}
                                      rows={4}
                                      value={model.script}
                                      onChange={(e) => {
                                        onChange('script', e.target.value)
                                      }}
                                      disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  model.clazz === 'javaTask' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['javaTask.javaClass']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.javaClass}
                             onChange={(e) => {
                               onChange('javaClass', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  model.clazz === 'receiveTask' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['receiveTask.waitState']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.waitState}
                             onChange={(e) => {
                               onChange('waitState', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['receiveTask.stateValue']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.stateValue}
                             onChange={(e) => {
                               onChange('stateValue', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  model.clazz === 'mailTask' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['mailTask.to']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.to}
                             onChange={(e) => {
                               onChange('to', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['mailTask.subject']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.subject}
                             onChange={(e) => {
                               onChange('subject', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['mailTask.content']}：</div>
                      <Input.TextArea style={{width: '100%', fontSize: 12}}
                                      rows={4}
                                      value={model.content}
                                      onChange={(e) => {
                                        onChange('content', e.target.value)
                                      }}
                                      disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  (model.clazz === 'timerStart' || model.clazz === 'timerCatch') &&
                  <Fragment>
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
                  </Fragment>
                }
                {
                  (model.clazz === 'signalStart' || model.clazz === 'signalCatch') &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['signalEvent.signal']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.signal}
                             onChange={(e) => {
                               onChange('signal', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  (model.clazz === 'messageStart' || model.clazz === 'messageCatch') &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div style={{display: 'inline'}}>{i18n['messageEvent.message']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.message}
                             onChange={(e) => {
                               onChange('message', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                  </Fragment>
                }
                {
                  model.clazz === 'flow' &&
                  <Fragment>
                    <div className={styles.panelRow}>
                      <div>{i18n['sequenceFlow.expression']}：</div>
                      <Input.TextArea style={{width: '100%', fontSize: 12}}
                                      rows={4}
                                      value={model.conditionExpression}
                                      onChange={(e) => {
                                        onChange('conditionExpression', e.target.value)
                                      }}
                                      disabled={readOnly}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <div>{i18n['sequenceFlow.seq']}：</div>
                      <Input style={{width: '100%', fontSize: 12}}
                             value={model.seq}
                             onChange={(e) => {
                               onChange('seq', e.target.value)
                             }}
                             disabled={readOnly}
                      />
                    </div>
                    <div className={styles.panelRow}>
                      <Checkbox onChange={(e) => onChange('reverse', e.target.checked)}
                                disabled={readOnly}
                                checked={!!model.reverse}>{i18n['sequenceFlow.reverse']}</Checkbox>
                    </div>
                  </Fragment>
                }
              </div>
            </div> : <Fragment/>
          )
        }
      }
    </LangContext.Consumer>
  )
};

class Designer extends Component {
  static defaultProps = {
    height: 500,
    isView: false,
    mode: 'edit',
    lang: 'zh',
  };
  constructor(props) {
    super(props);
    this.pageRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.itemPanelRef = React.createRef();
    this.detailPanelRef = React.createRef();
    this.resizeFunc = ()=>{};
    this.state = {
      selectedModel: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.data !== this.props.data){
      if(this.graph){
        this.graph.changeData(this.initShape(this.props.data));
        this.graph.setMode(this.props.mode);
        this.graph.emit('canvas:click');
        if(this.cmdPlugin){
          this.cmdPlugin.initPlugin(this.graph);
        }
        if(this.props.isView){
          this.graph.fitView(5)
        }
      }
    }
  }

  componentDidMount() {
    const { isView,mode } = this.props;
    const height = this.props.height-1;
    const width = this.pageRef.current.offsetWidth;
    let plugins = [];
    if(!isView){
      this.cmdPlugin = new Command();
      const toolbar = new Toolbar({container:this.toolbarRef.current});
      const addItemPanel = new AddItemPanel({container:this.itemPanelRef.current});
      const canvasPanel = new CanvasPanel({container:this.pageRef.current});
      plugins = [ this.cmdPlugin,toolbar,addItemPanel,canvasPanel ];
    }
    this.graph = new G6.Graph({
      plugins: plugins,
      container: this.pageRef.current,
      height: height,
      width: width,
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [ ],
        edit: ['drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
          'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign'],
      },
      defaultEdge: {
        shape: 'flow-polyline-round',
      },
    });
    if(isView){
      this.graph.setMode('view');
    }else{
      this.graph.setMode(mode);
    }
    this.graph.data(this.props.data?this.initShape(this.props.data):{nodes:[],edges:[]});
    this.graph.render();
    if(isView && this.props.data && this.props.data.nodes){
      this.graph.fitView(5)
    }
    this.initEvents();
  }

  initShape(data){
    if(data && data.nodes){
      return {
        nodes: data.nodes.map(node => {
          return {
            shape: getShapeName(node.clazz),
            ...node,
          }
        }),
        edges: data.edges
      }
    }
    return data;
  }

  initEvents(){
    this.graph.on('afteritemselected',(items)=>{
      if(items && items.length > 0) {
        const item = this.graph.findById(items[0]);
        this.setState({selectedModel: {...item.getModel()}});
      } else {
        this.setState({selectedModel: { }});
      }
    });
    const page = this.pageRef.current;
    const graph = this.graph;
    const height = this.props.height-1;
    this.resizeFunc = ()=>{
      graph.changeSize(page.offsetWidth,height);
    };
    window.addEventListener("resize", this.resizeFunc);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunc);
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate();
    });
  }

  onItemCfgChange(key,value){
    const items = this.graph.get('selectedItems');
    if(items && items.length > 0){
      const item = this.graph.findById(items[0]);
      if(this.graph.executeCommand) {
        this.graph.executeCommand('update', {
          itemId: items[0],
          updateModel: {[key]: value}
        });
      }else {
        this.graph.updateItem(item, {[key]: value});
      }
      this.setState({selectedModel:{  ...item.getModel() }});
    }
  }

  render() {
    const height = this.props.height;
    const { isView,mode,users,groups,lang } = this.props;
    const i18n = locale[lang.toLowerCase()];
    const readOnly = mode !== "edit";
    return (
      <LangContext.Provider value={i18n}>
        <div className={styles.root}>
          { !isView &&
            <div className={styles.toolbar} ref={this.toolbarRef}>
              <span className={styles.command} data-command="undo"><FontAwesomeIcon icon="undo" color="#666" /></span>
              <span className={styles.command} data-command="redo"><FontAwesomeIcon icon="redo" color="#666" /></span>
              <span className={styles.separator} />
              <span className={styles.command} data-command="copy"><FontAwesomeIcon icon="copy" color="#666" /></span>
              <span className={styles.command} data-command="paste"><FontAwesomeIcon icon="paste" color="#666" /></span>
              <span className={styles.command} data-command="delete"><FontAwesomeIcon icon="trash-alt" color="#666" /></span>
              <span className={styles.separator} />
              <span className={styles.command} data-command="zoomIn"><FontAwesomeIcon icon="search-plus" color="#666" /></span>
              <span className={styles.command} data-command="zoomOut"><FontAwesomeIcon icon="search-minus" color="#666" /></span>
              <span className={styles.command} data-command="resetZoom"><FontAwesomeIcon icon="compress" color="#666" /></span>
              <span className={styles.command} onClick={()=>this.graph.fitView(5)}><FontAwesomeIcon icon="expand" color="#666" /></span>
              <span className={styles.separator} />
              <span className={styles.command} data-command="toFront"><FontAwesomeIcon icon="layer-up" color="#666" /></span>
              <span className={styles.command} data-command="toBack"><FontAwesomeIcon icon="layer-down" color="#666" /></span>
            </div>
          }
          <div>
            { !isView &&
              <div ref={this.itemPanelRef} className={styles.itemPanel} style={{height: height}}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                  <Panel header={i18n['start']} key="1" forceRender>
                    <img data-item={"{clazz:'start',size:'30*30',label:''}"}
                         src={require('../assets/start.svg')} style={{width: 42, height: 42}}/>
                    <div>{i18n['startEvent']}</div>
                    <img data-item={"{clazz:'timerStart',size:'30*30',label:''}"}
                         src={require('../assets/timer-start.svg')} style={{width: 42, height: 42}}/>
                    <div>{i18n['timerEvent']}</div>
                    <img data-item={"{clazz:'messageStart',size:'30*30',label:''}"}
                         src={require('../assets/message-start.svg')} style={{width: 42, height: 42}}/>
                    <div>{i18n['messageEvent']}</div>
                    <img data-item={"{clazz:'signalStart',size:'30*30',label:''}"}
                         src={require('../assets/signal-start.svg')} style={{width: 42, height: 42}}/>
                    <div>{i18n['signalEvent']}</div>
                  </Panel>
                  <Panel header={i18n['task']} key="2" forceRender>
                    <img data-item={"{clazz:'userTask',size:'80*44',label:'"+i18n['userTask']+"'}"}
                         src={require('../assets/user-task.svg')} style={{width: 80, height: 44}}/>
                    <div>{i18n['userTask']}</div>
                    <img data-item={"{clazz:'scriptTask',size:'80*44',label:'"+i18n['scriptTask']+"'}"}
                         src={require('../assets/script-task.svg')} style={{width: 80, height: 44}}/>
                    <div>{i18n['scriptTask']}</div>
                    <img data-item={"{clazz:'javaTask',size:'80*44',label:'"+i18n['javaTask']+"'}"}
                         src={require('../assets/java-task.svg')} style={{width: 80, height: 44}}/>
                    <div>{i18n['javaTask']}</div>
                    <img data-item={"{clazz:'mailTask',size:'80*44',label:'"+i18n['mailTask']+"'}"}
                         src={require('../assets/mail-task.svg')} style={{width: 80, height: 44}}/>
                    <div>{i18n['mailTask']}</div>
                    <img data-item={"{clazz:'receiveTask',size:'80*44',label:'"+i18n['receiveTask']+"'}"}
                         src={require('../assets/receive-task.svg')} style={{width: 80, height: 44}}/>
                    <div>{i18n['receiveTask']}</div>
                  </Panel>
                  <Panel header={i18n['gateway']} key="3" forceRender>
                    <img data-item="{clazz:'gateway',size:'40*40',label:''}"
                         src={require('../assets/gateway.svg')} style={{width: 48, height: 48}}/>
                    <div>{i18n['exclusiveGateway']}</div>
                  </Panel>
                  <Panel header={i18n['catch']} key="4" forceRender>
                    <img data-item={"{clazz:'timerCatch',size:'50*30',label:''}"}
                         src={require('../assets/timer-catch.svg')} style={{width: 58, height: 38}}/>
                    <div>{i18n['timerEvent']}</div>
                    <img data-item={"{clazz:'messageCatch',size:'50*30',label:''}"}
                         src={require('../assets/message-catch.svg')} style={{width: 58, height: 38}}/>
                    <div>{i18n['messageEvent']}</div>
                    <img data-item={"{clazz:'signalCatch',size:'50*30',label:''}"}
                         src={require('../assets/signal-catch.svg')} style={{width: 58, height: 38}}/>
                    <div>{i18n['signalEvent']}</div>
                  </Panel>
                  <Panel header={i18n['end']} key="5" forceRender>
                    <img data-item={"{clazz:'end',size:'30*30',label:''}"}
                         src={require('../assets/end.svg')} style={{width: 42, height: 42}}/>
                    <div>{i18n['endEvent']}</div>
                  </Panel>
                </Collapse>
              </div>
            }
            <div ref={this.pageRef} className={styles.canvasPanel} style={{width:isView?'100%':'70%',borderBottom:isView?0:null}}/>
            { !isView &&
              <div ref={this.detailPanelRef} className={styles.detailPanel} style={{height:height}}>
                <DetailPanel model={this.state.selectedModel}
                             readOnly={readOnly}
                             users={users}
                             groups={groups}
                             onChange={(key,val)=>{this.onItemCfgChange(key,val)}}
                />
              </div>
            }
          </div>
        </div>
      </LangContext.Provider>
    );
  }
}

export default Designer;