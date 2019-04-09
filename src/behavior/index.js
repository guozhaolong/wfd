import clickEdgeSelected from './clickEdgeSelected'
import clickNodeSelected from './clickNodeSelected'
import deleteItem from './deleteItem'
import dragEdge from './dragEdge'
import dragPanelItemAddNode from './dragPanelItemAddNode'
import hoverAnchorActived from './hoverAnchorActived'
import hoverNodeActived from './hoverNodeActived'
export default function(G6){
  clickEdgeSelected(G6);
  clickNodeSelected(G6);
  deleteItem(G6);
  dragEdge(G6);
  dragPanelItemAddNode(G6);
  hoverAnchorActived(G6);
  hoverNodeActived(G6);
}
