import React, {Component} from 'react';
import {Switch,Input,Select} from 'antd'
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/switch/style/css';
import styles from './index.less';
import G6 from '@antv/g6/src';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faReply,faShare,faCopy, faPaste,faTrash,faSearchPlus,faSearchMinus,faCompress,faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSave,faReply,faShare,faCopy,faPaste,faTrash,faSearchPlus,faSearchMinus,faCompress,faExpandArrowsAlt);
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
    this.pageRef= React.createRef();
    this.state = {
      selectedModel: {
        clazz: '',
        label: '',
        assignee: '',
        isSequential: false,
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
    this.graph = new G6.Graph({
      container: this.pageRef.current,
      height: height < 500 ? 500 : height,
      width: width,
      modes: {
        default: [ 'drag-canvas', 'tooltip'],
        edit: ['drag-canvas', 'drag-node','hoverNodeActived','hoverAnchorActived','dragEdge',
          'dragPanelItemAddNode','clickNodeSelected','clickEdgeSelected','deleteItem'],
      },
      defaultEdge: {
        shape: 'flow-polyline-round',
      },
    });
    this.graph.setMode('edit');
    this.graph.data(this.props.data ? this.props.data : []);
    this.graph.render();
    this.initGhostImg();
    this.onItemClick();
  }

  onItemClick(){
    this.graph.on('selectedItem',(item)=>{
      if(item)
        this.setState({selectedModel:{  ...item.getModel() }});
      else
        this.setState({selectedModel:{ clazz: '',label: '',assignee: '',isSequential:false,}});
    });
  }

  onItemCfgChange(key,value){
    const item = this.graph.get('selectedItem');
    if(item){
      this.graph.updateItem(item,{[key]:value});
      this.setState({selectedModel:{  ...item.getModel() }});
    }
  }

  componentWillUnmount(){

  }

  initGhostImg(){
    this.ghostImg = document.createElement("img");
    this.ghostImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.ghostImg.style.opacity = '0';
  }

  dragAddNodeStart(e,obj){
    e.dataTransfer.setDragImage(this.ghostImg, 0, 0);
    this.graph.set('onDragAddNode',true);
    this.graph.set('addModel',obj);
  }

  dragAddNodeEnd(e){
    this.graph.emit('canvas:mouseup',e.nativeEvent);
    this.graph.set('onDragAddNode',false);
    this.graph.set('addModel',null);
  }

  onCanvasDragOver(e){
    this.graph.emit('canvas:mousemove',e.nativeEvent);
  }

  onCanvasDragLeave(e){
    this.graph.emit('canvas:mouseleave',e.nativeEvent);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.toolbar}>
          <span className={styles.command}><FontAwesomeIcon icon="reply" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="share" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command}><FontAwesomeIcon icon="copy" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="paste" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="trash" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command}><FontAwesomeIcon icon="search-plus" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="search-minus" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="compress" color="#666" /></span>
          <span className={styles.command}><FontAwesomeIcon icon="expand-arrows-alt" color="#666" /></span>
          <span className={styles.separator} />
          <span className={styles.command} onClick={()=>this.props.onSave(this.graph.save())}><FontAwesomeIcon icon="save" color="#1890ff" size="lg"/></span>
        </div>
        <div>
          <div style={{flex:'0 0 auto',float: 'left',width:'10%'}}>
            <div className={styles.itemPanel}>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'start-node',clazz:'startEvent',size:'40*40',label:'开始'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/start.svg')} style={{width:58,height:58}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'task-node',clazz:'userTask',assignee:'',size:'80*48',label:'任务节点'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/task.svg')} style={{width:80,height:48}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'decision-node',clazz:'exclusiveGateway',size:'60*60',label:'判断节点'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/decision.svg')} style={{width:68,height:68}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'end-node',clazz:'endEvent',size:'40*40',label:'结束'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/end.svg')} style={{width:58,height:58}}/>
            </div>
          </div>
          <div style={{flex:'0 0 auto',float: 'left',width:'70%'}}>
            <div ref={this.pageRef} style={{backgroundColor:'#fff',border: '1px solid #E9E9E9'}}
                 onDragOver={(e)=>{this.onCanvasDragOver(e)}}
                 onDragLeave={(e)=>{this.onCanvasDragLeave(e)}} />
          </div>
          <div style={{flex:'0 0 auto',float: 'left',width:'20%'}}>
            <div>
              <div className={styles.panelTitle}>属性</div>
              { this.state.selectedModel.clazz === 'userTask' &&
              <div className={styles.panelBody}>
                <div className={styles.panelRow}>
                  <div>标题：</div>
                  <Input style={{ width: 200,fontSize:12 }}
                         value={this.state.selectedModel.label}
                         onChange={(e) => this.onItemCfgChange('label',e.target.value)}/>
                </div>
                <div className={styles.panelRow}>
                  <div>审批人：</div>
                  <Select
                    mode="multiple"
                    showSearch
                    style={{ width: 200,fontSize:12 }}
                    placeholder="Select a assignee"
                    optionFilterProp="children"
                    defaultValue={this.state.selectedModel.assignee}
                    onChange={(e) => this.onItemCfgChange('assignee',e)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Select.Option value="admin">管理员</Select.Option>
                    <Select.Option value="zhang3">张三</Select.Option>
                    <Select.Option value="li4">李四</Select.Option>
                  </Select>
                </div>
                <div className={styles.panelRow}>
                  <div style={{display:'inline-block',marginRight: 5}}>是否为会签：</div>
                  <Switch defaultChecked onChange={(e) => this.onItemCfgChange('isSequential',e)} />
                </div>
              </div>
              }
              { this.state.selectedModel.clazz === 'exclusiveGateway' &&
              <div className={styles.panelBody}>
                <div className={styles.panelRow}>
                  <div>标题：</div>
                  <Input style={{ width: 200,fontSize:12 }}
                         value={this.state.selectedModel.label}
                         onChange={(e)=>{this.onItemCfgChange('label',e.target.value)}}/>
                </div>
              </div>
              }
              { this.state.selectedModel.clazz === 'sequenceFlow' &&
              <div className={styles.panelBody}>
                <div className={styles.panelRow}>
                  <div>标题：</div>
                  <Input style={{ width: 200,fontSize:12 }}
                         value={this.state.selectedModel.label}
                         onChange={(e)=>{this.onItemCfgChange('label',e.target.value)}}/>
                </div>
                <div className={styles.panelRow}>
                  <div>条件表达式：</div>
                  <Input.TextArea style={{ width: 200,fontSize:12 }}
                                  rows={4}
                                  value={this.state.selectedModel.label}
                                  onChange={(e)=>{this.onItemCfgChange('conditionExpression',e.target.value)}}/>
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