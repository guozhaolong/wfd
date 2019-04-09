export default function(G6){
  G6.registerBehavior('deleteItem', {
    getEvents() {
      return {
        'keydown': 'onKeydown',
      }
    },
    onKeydown(e){
      const item = this.graph.get('selectedItem');
      if(e.keyCode === 8 && item){
        this.graph.remove(item);
        this.graph.set('selectedItem',null);
      }
    }
  });
}