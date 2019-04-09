import React, {Component} from 'react';
import styles from './index.less';
import G6 from '@antv/g6/src';
import registerItem from './item'
import registerBehavior from './behavior'
registerItem(G6);
registerBehavior(G6);

const headerHeight = 64;
const footHeight = 55;
const marginHeight = 48;
const toolbarHeight = 40;


class Designer extends Component {
  constructor(props) {
    super(props);
    this.pageRef= React.createRef();
    this.state = {
      selectedModel: {},
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
      <div className="root">
        <div className="toolbar">
          
        </div>
        <div>
          <div style={{flex:'0 0 auto',float: 'left',width:'10%'}}>
            <div className="itemPanel">
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'start-node',size:'40*40',label:'开始'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/start.svg')} style={{width:58,height:58}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'task-node',size:'80*48',label:'任务节点'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/task.svg')} style={{width:80,height:48}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'decision-node',size:'60*60',label:'判断节点'})}
                   onDragEnd={(e)=>this.dragAddNodeEnd(e)}
                   src={require('../assets/decision.svg')} style={{width:68,height:68}}/>
              <img onDragStart={(e)=>this.dragAddNodeStart(e,{shape:'end-node',size:'40*40',label:'结束'})}
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
              <div className="panelTitle"></div>
              <div>asdfasdfasd</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Designer;