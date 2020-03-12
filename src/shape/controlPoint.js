import editorStyle from '../util/defaultStyle';
const SingleShapeMixin = require('@antv/g6/lib/shape/single-shape-mixin');

export default function(G6) {
  G6.Shape.registerFactory('controlPoint', {
    defaultShapeType: 'point-control-marker',
  });

  G6.Shape.registerControlPoint('single-control-point', G6.Util.mix({}, SingleShapeMixin, {
    itemType: 'point',
    drawShape(cfg, group) {
      const shapeType = this.shapeType;
      const style = this.getShapeStyle(cfg);
      return group.addShape(shapeType, {
        attrs: {
          ...style,
          symbol:'square'
        },
      });
    },

    setState(name, value, item) {
      if (name === 'active') {
        if (value) {
          this.update({ style: { ...editorStyle.pointPointHoverStyle } }, item);
        } else {
          this.update({ style: { ...editorStyle.pointPointStyle } }, item);
        }
      }
    },
  }));

  G6.Shape.registerControlPoint('point-control-marker', { shapeType: 'marker' }, 'single-control-point');

}
