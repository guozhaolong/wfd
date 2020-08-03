export default function(G6){
  G6.registerBehavior('moveNode', {
    getEvents():any {
      return {
        'keydown': 'onKeydown',
      }
    },
    onKeydown(e){
      const items = this.graph.get('selectedItems');
      if(items && items.length > 0){
        const item = this.graph.findById(items[0]);
        if(e.keyCode === 37){ // left
          this.graph.updateItem(item,{x: item.getModel().x - 1});
        }else if(e.keyCode === 38){ // up
          this.graph.updateItem(item,{y: item.getModel().y - 1});
        }else if(e.keyCode === 39){ // right
          this.graph.updateItem(item,{x: item.getModel().x + 1});
        }else if(e.keyCode === 40){ // down
          this.graph.updateItem(item,{y: item.getModel().y + 1});
        }
      }
    },
  });
}
