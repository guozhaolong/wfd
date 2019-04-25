export default function(G6){
  G6.registerBehavior('clickSelected', {
    getDefaultCfg() {
      return {
        multiple: false,
      }
    },
    getEvents() {
      return {
        'node:click': 'onClick',
        'edge:click': 'onClick',
        'edge:mouseover': 'onEdgeMouseOver',
        'edge:mouseleave': 'onEdgeMouseLeave',
        'canvas:click': 'onCanvasClick',
      }
    },
    onClick(e) {
      this._clearSelected();
      this.graph.setItemState(e.item, 'selected', true);
      let selectedItems = this.graph.get('selectedItems');
      if(!selectedItems)
        selectedItems = [];
      selectedItems = [e.item.get('id')];
      this.graph.set('selectedItems',selectedItems);
      this.graph.emit('aftertitemselected',selectedItems);
    },
    onEdgeMouseOver(e){
      if(!e.item.hasState('selected'))
        this.graph.setItemState(e.item, 'hover', true);
    },
    onEdgeMouseLeave(e){
      if(!e.item.hasState('selected'))
        this.graph.setItemState(e.item, 'hover', false);
    },
    onCanvasClick(){
      this._clearSelected();
    },
    _clearSelected(){
      let selected = this.graph.findAllByState('node', 'selected');
      selected.forEach(node => {
        this.graph.setItemState(node, 'selected', false);
      });
      selected = this.graph.findAllByState('edge', 'selected');
      selected.forEach(edge => {
        this.graph.setItemState(edge, 'selected', false);
      });
      this.graph.set('selectedItems',[]);
      this.graph.emit('aftertitemselected',[]);
    }
  });
}