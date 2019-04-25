import React, {Component} from 'react';
import {Switch,Input,Select} from 'antd'
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/switch/style/css';
import styles from './index.less';
import G6 from '@antv/g6/src';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const classNames = require('classnames');
import { faSave,faReply,faShare,faCopy, faPaste,faTrash,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faLayerUp, faLayerDown } from './util/faIcons';
library.add(faSave,faReply,faShare,faCopy,faPaste,faTrash,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup,faLayerUp,faLayerDown);
import Command from './plugins/command'
import Toolbar from './plugins/toolbar'
import AddItemPanel from './plugins/addItemPanel'
import CanvasPanel from './plugins/canvasPanel'
import registerItem from './item'
import registerBehavior from './behavior'
registerItem(G6);
registerBehavior(G6);

class Designer extends Component {
  static defaultProps = {
    onSave: ()=>{}
  };
  constructor(props) {
    super(props);
    this.pageRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.itemPanelRef = React.createRef();
    this.detailPanelRef = React.createRef();
    this.state = {
      selectedModel: {
        clazz: '',
        label: '',
        assignee: '',
        isSequential: false,
        conditionExpression: '',
      },
      curZoom: 1,
      minZoom: 0.5,
      maxZoom: 2,
      graph: null,
    };
  }
  componentWillMount() {
    this.graph = null;
  }

  componentDidMount() {
    const height = window.innerHeight - 160;
    const width = this.pageRef.current.offsetWidth;
    const cmd = new Command();
    const toolbar = new Toolbar({container:this.toolbarRef.current});
    const addItemPanel = new AddItemPanel({container:this.itemPanelRef.current});
    const canvasPanel = new CanvasPanel({container:this.pageRef.current});

    this.graph = new G6.Graph({
      plugins: [ cmd,toolbar,addItemPanel,canvasPanel ],
      container: this.pageRef.current,
      height: height < 500 ? 500 : height,
      width: width,
      modes: {
        default: [ 'drag-canvas', 'tooltip'],
        edit: ['drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
          'dragPanelItemAddNode','clickSelected','deleteItem'],
      },
      defaultEdge: {
        shape: 'flow-polyline-round',
      },
    });
    this.graph.setMode('edit');
    this.graph.data(this.props.data ? this.props.data : []);
    this.graph.render();
    this.initEvents();
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
    return (
      <div className={styles.root}>
        <div className={styles.toolbar} ref={this.toolbarRef}>
          <span className={styles.command} data-command="undo"><FontAwesomeIcon icon="reply" color="#666" /></span>
          <span className={styles.command} data-command="redo"><FontAwesomeIcon icon="share" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command} data-command="copy"><FontAwesomeIcon icon="copy" color="#666" /></span>
          <span className={styles.command} data-command="paste"><FontAwesomeIcon icon="paste" color="#666" /></span>
          <span className={styles.command} data-command="delete"><FontAwesomeIcon icon="trash" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command} data-command="zoomIn"><FontAwesomeIcon icon="search-plus" color="#666" /></span>
          <span className={styles.command} data-command="zoomOut"><FontAwesomeIcon icon="search-minus" color="#666" /></span>
          <span className={styles.command} data-command="resetZoom"><FontAwesomeIcon icon="compress" color="#666" /></span>
          <span className={styles.command} onClick={()=>this.graph.fitView(5)}><FontAwesomeIcon icon="expand" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command} data-command="toFront"><FontAwesomeIcon icon="layer-up" color="#666" /></span>
          <span className={styles.command} data-command="toBack"><FontAwesomeIcon icon="layer-down" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command} onClick={()=>this.props.onSave(this.graph.save())}><FontAwesomeIcon icon="save" color="#1890ff" size="lg"/></span>
        </div>
        <div>
          <div style={{flex:'0 0 auto',float: 'left',width:'10%'}}>
            <div className={styles.itemPanel} ref={this.itemPanelRef}>
              <img data-item="{shape:'start-node',clazz:'startEvent',size:'40*40',label:'开始'}"
                   src={require('../assets/start.svg')} style={{width:58,height:58}}/>
              <img data-item="{shape:'task-node',clazz:'userTask',size:'80*48',label:'任务节点'}"
                   src={require('../assets/task.svg')} style={{width:80,height:48}}/>
              <img data-item="{shape:'decision-node',clazz:'exclusiveGateway',size:'60*60',label:'判断节点'}"
                   src={require('../assets/decision.svg')} style={{width:68,height:68}}/>
              <img data-item="{shape:'end-node',clazz:'endEvent',size:'40*40',label:'结束'}"
                   src={require('../assets/end.svg')} style={{width:58,height:58}}/>
            </div>
          </div>
          <div style={{flex:'0 0 auto',float: 'left',width:'70%'}}>
            <div ref={this.pageRef} style={{backgroundColor:'#fff',border: '1px solid #E9E9E9'}}/>
          </div>
          <div style={{flex:'0 0 auto',float: 'left',width:'20%'}}>
            <div ref={this.detailPanelRef}>
              {this.state.selectedModel.clazz === 'userTask' && <div data-clazz="userTask">
                <div className={styles.panelTitle}>审批节点属性</div>
                <div className={styles.panelBody}>
                  <div className={styles.panelRow}>
                    <div>标题：</div>
                    <Input style={{width: 200, fontSize: 12}}
                           value={this.state.selectedModel.label}
                           onChange={(e) => this.onItemCfgChange('label', e.target.value)}/>
                  </div>
                  <div className={styles.panelRow}>
                    <div>审批人：</div>
                    <Select
                      mode="multiple"
                      showSearch
                      style={{width: 200, fontSize: 12}}
                      placeholder="Select a assignee"
                      optionFilterProp="children"
                      defaultValue={this.state.selectedModel.assignee}
                      onChange={(e) => this.onItemCfgChange('assignee', e)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Select.Option key="admin">管理员</Select.Option>
                      <Select.Option key="zhang3">张三</Select.Option>
                      <Select.Option key="li4">李四</Select.Option>
                    </Select>
                  </div>
                  <div className={styles.panelRow}>
                    <div style={{display: 'inline-block', marginRight: 5}}>是否为会签：</div>
                    <Switch defaultChecked onChange={(e) => this.onItemCfgChange('isSequential', e)}/>
                  </div>
                </div>
              </div>
              }
              {this.state.selectedModel.clazz === 'exclusiveGateway' && <div data-clazz="exclusiveGateway">
                <div className={styles.panelTitle}>判断节点属性</div>
                <div className={styles.panelBody}>
                  <div className={styles.panelRow}>
                    <div>标题：</div>
                    <Input style={{width: 200, fontSize: 12}}
                           value={this.state.selectedModel.label}
                           onChange={(e) => {
                             this.onItemCfgChange('label', e.target.value)
                           }}/>
                  </div>
                </div>
              </div>
              }
              {this.state.selectedModel.clazz === 'sequenceFlow' && <div data-clazz="sequenceFlow">
                <div className={styles.panelTitle}>连接线属性</div>
                <div className={styles.panelBody}>
                  <div className={styles.panelRow}>
                    <div>标题：</div>
                    <Input style={{width: 200, fontSize: 12}}
                           value={this.state.selectedModel.label}
                           onChange={(e) => {
                             this.onItemCfgChange('label', e.target.value)
                           }}/>
                  </div>
                  <div className={styles.panelRow}>
                    <div>条件表达式：</div>
                    <Input.TextArea style={{width: 200, fontSize: 12}}
                                    rows={4}
                                    value={this.state.selectedModel.conditionExpression}
                                    onChange={(e) => {
                                      this.onItemCfgChange('conditionExpression', e.target.value)
                                    }}/>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Designer;