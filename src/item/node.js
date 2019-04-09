import editorStyle from "../util/defaultStyle";
const Item = require('@antv/g6/src/item/item');

export default function(G6) {
  G6.registerNode('flow-node', {
    drawAnchor(group) {
      const bbox = group.get('children')[0].getBBox();
      this.getAnchorPoints().forEach((p, i) => {
        const anchorContainer = group.addGroup();
        const anchor = new Item({
          type: 'anchor',
          group: anchorContainer,
          capture: false,
          index: i,
          isActived: false,
          model: {
            style: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorPointStyle,
              cursor: editorStyle.cursor.hoverEffectiveAnchor,
            }
          },
        });
        anchor.isAnchor = true;
        anchor.toFront();
        let hotpot;
        anchor.showHotpot = function () {
          hotpot = anchorContainer.addShape('marker', {
            attrs: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1],
              ...editorStyle.anchorHotsoptStyle
            }
          });
          hotpot.toFront();
          anchor.getKeyShape().toFront();
        };
        anchor.setActived = function () {
          anchor.update({style: {...editorStyle.anchorPointHoverStyle}});
        };
        anchor.clearActived = function () {
          anchor.update({style: {...editorStyle.anchorPointStyle}});
        };
        anchor.setHotspotActived = function (act) {
          hotpot &&
          (act ?
            hotpot.attr(editorStyle.anchorHotsoptActivedStyle)
            : hotpot.attr(editorStyle.anchorHotsoptStyle))
        };

        group.anchorShapes.push(anchorContainer);
        group.getAllAnchors = () => {
          return group.anchorShapes.map(c => {
            c.filter(a => a.isAnchor)
          })
        };
        group.getAnchor = (i) => {
          return group.anchorShapes.filter(a => a.get('index') === i)
        }
      });
    },
    drawShape(cfg, group) {
      const shapeType = this.shapeType;
      let style = this.getShapeStyle(cfg);
      const shape = group.addShape(shapeType, {
        attrs: {
          ...style,
          cursor: editorStyle.cursor.hoverNode
        }
      });
      cfg.labelCfg = {
        style: {
          cursor: editorStyle.cursor.hoverNode
        }
      };

      group.anchorShapes = [];
      group.showAnchor = (group) => {
        this.drawAnchor(group);
      };
      group.clearAnchor = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
        group.anchorShapes = [];
      };
      group.clearHotpotActived = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => {
          if (a.isAnchor)
            a.setHotspotActived(false);
        });
      };
      return shape;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      if (name === 'show-anchor') {
        if (value) {
          group.showAnchor(group);
        } else {
          group.clearAnchor(group);
        }
      } else if (name === 'selected') {
        const rect = group.getChildByIndex(0);
        if (value) {
          rect.attr('fillOpacity', editorStyle.nodeSelectedStyle.fillOpacity);
        } else {
          rect.attr('fillOpacity', editorStyle.nodeStyle.fillOpacity);
        }
      }
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
        [0, 0.5], // left
      ]
    }
  }, 'single-shape');

  G6.registerNode('task-node', {
    shapeType: 'rect',
    getShapeStyle(cfg) {
      cfg.size = [80, 44];
      cfg.label = cfg.label || '任务节点';
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...editorStyle.nodeStyle,
        stroke: '#1890FF',
        fill: '#1890FF',
      };
      return style;
    }
  }, 'flow-node');
  G6.registerNode('decision-node', {
    shapeType: 'path',
    getShapeStyle(cfg) {
      cfg.size = [60, 60];
      cfg.label = cfg.label || '判断节点';
      const width = cfg.size[0];
      const height = cfg.size[1];
      const gap = 4;
      const style = {
        path: [
          ['M', 0 - gap, 0 - height / 2 + gap],
          ['Q', 0, 0 - height / 2, gap, 0 - height / 2 + gap],
          ['L', width / 2 - gap, 0 - gap],
          ['Q', width / 2, 0, width / 2 - gap, gap],
          ['L', gap, height / 2 - gap],
          ['Q', 0, height / 2, 0 - gap, height / 2 - gap],
          ['L', -width / 2 + gap, gap],
          ['Q', -width / 2, 0, -width / 2 + gap, 0 - gap],
          ['Z'] // close
        ],
        ...editorStyle.nodeStyle,
        stroke: '#13C2C2',
        fill: '#13C2C2',
      };
      return style;
    },
  }, 'flow-node');
  G6.registerNode('start-node', {
    shapeType: 'circle',
    getShapeStyle(cfg) {
      cfg.size = [40, 40];
      cfg.label = cfg.label || '开始';
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...editorStyle.nodeStyle,
        stroke: '#FA8C16',
        fill: '#FA8C16',
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
      ]
    }
  }, 'flow-node');
  G6.registerNode('end-node', {
    shapeType: 'circle',
    getShapeStyle(cfg) {
      cfg.size = [40, 40];
      cfg.label = cfg.label || '结束';
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...editorStyle.nodeStyle,
        stroke: '#F5222D',
        fill: '#F5222D',
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [0.5, 1], // bottom
        [0, 0.5], // left
      ]
    }
  }, 'flow-node');
}