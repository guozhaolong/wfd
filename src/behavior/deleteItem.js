export default function(G6){
  G6.registerBehavior('deleteItem', {
    getEvents() {
      return {
        'keydown': 'onKeydown',
        'canvas:mouseleave': 'onCanvasLeave',
        'canvas:mouseenter': 'onCanvasFocus',
      }
    },
    onKeydown(e){
      const item = this.graph.get('selectedItem');
      const focus = this.graph.get('focusGraphWrapper');
      if(e.keyCode === 8 && item && focus){
        this.graph.remove(item);
        this.graph.set('selectedItem',null);
        this.graph.emit('selectedItem',null);
      }
    },
    onCanvasLeave(e){
      this.graph.set('focusGraphWrapper',false);
    },
    onCanvasFocus(){
      this.graph.set('focusGraphWrapper',true);
    }
  });
}