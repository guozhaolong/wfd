export default function(G6){
  G6.registerBehavior('clickEdgeSelected', {
    getEvents() {
      return {
        'edge:click': 'onEdgeClick',
        'edge:mouseover': 'onEdgeMouseOver',
        'edge:mouseleave': 'onEdgeMouseLeave',
        'canvas:click': 'onCanvasClick',
      }
    },
    onEdgeClick(e){
      this._clearSelected();
      this.graph.setItemState(e.item, 'selected', true);
      this.graph.set('selectedItem',e.item);
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
      const item = this.graph.get('selectedItem');
      if(item) {
        this.graph.setItemState(item, 'selected', false);
        this.graph.set('selectedItem',null);
      }
    }
  });
}