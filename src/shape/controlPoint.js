import editorStyle from '../util/defaultStyle';

const SingleShapeMixin = require('@antv/g6/src/shape/single-shape-mixin');
const Util = require('@antv/g6/src/util');
export default function(G6) {
  G6.Shape.registerFactory('controlPoint', {
    defaultShapeType: 'point-control-marker',
  });

  G6.Shape.registerControlPoint('single-control-point', Util.mix({}, SingleShapeMixin, {
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
