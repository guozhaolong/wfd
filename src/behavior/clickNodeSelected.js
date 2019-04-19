export default function(G6){
  G6.registerBehavior('clickNodeSelected', {
    getDefaultCfg() {
      return {
        multiple: false,
      }
    },
    getEvents() {
      return {
        'node:click': 'onNodeClick',
        'canvas:click': 'onCanvasClick',
      }
    },
    onNodeClick(e) {
      this._clearSelected();
      this.graph.setItemState(e.item, 'selected', true);
      this.graph.set('selectedItem',e.item);
      this.graph.emit('selectedItem',e.item);
    },
    onCanvasClick(){
      this._clearSelected();
    },
    _clearSelected(){
      const item = this.graph.get('selectedItem');
      if(item) {
        this.graph.setItemState(item, 'selected', false);
        this.graph.set('selectedItem',null);
        this.graph.emit('selectedItem',null);
      }
    }
  });
}