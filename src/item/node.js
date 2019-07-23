import editorStyle from "../util/defaultStyle";
const Item = require('@antv/g6/src/item/item');
const dashArray = [
  [0,1],
  [0,2],
  [1,2],
  [0,1,1,2],
  [0,2,1,2],
  [1,2,1,2],
  [2,2,1,2],
  [3,2,1,2],
  [4,2,1,2]
];
const interval = 9;
const lineDash = [4, 2, 1, 2];
export default function(G6) {
  G6.registerNode('flow-node', {
    icon: null,
    selectedColor: '#eee',
    unSelectedColor: '#f9f9f9',
    borderColor: '#bbb',
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
        }
      });
      if(cfg.icon){
        let attrs = {
          x: style.x+2,
          y: style.y+2,
          width: 14,
          height: 14,
        };
        if(shapeType === 'circle'){
          attrs = {
            x: style.x- style.r + 6,
            y: style.y - style.r + 6,
            width: 18,
            height: 18,
          }
        }else if(shapeType === 'path'){
          attrs = {
            x: -10,
            y: -8,
            width: 20,
            height: 20,
          }
        }
        group.icon = group.addShape('image', {
          attrs: {
            img:cfg.icon,
            ...attrs,
          }
        });
      }
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
          rect.attr('fill', item.getModel().selectedColor);
        } else {
          rect.attr('fill', item.getModel().unSelectedColor);
        }
      } else if (name === 'hover') {
        const rect = group.getChildByIndex(0);
        const text = group.getChildByIndex(1);
        if (value) {
          rect.attr('cursor', editorStyle.cursor.hoverNode);
          if(text)
            text.attr('cursor', editorStyle.cursor.hoverNode);
        } else {
          rect.attr('cursor', 'default');
          if(text)
            text.attr('cursor', 'default');
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
    },
    runAnimate(cfg, group){
      if(cfg.active){
        let totalArray = [];
        let index = 0;
        const shape = group.getFirst();
        shape.animate({
          onFrame(ratio) {
            for (let i = 0; i < 9; i += interval) {
              totalArray = totalArray.concat(lineDash);
            }
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            };
            index = (index + 1) % interval;
            return cfg;
          },
          repeat: true
        }, 5000);
      }
    },
    afterDraw(cfg, group) {
      this.runAnimate(cfg,group);
    },
    afterUpdate(cfg, group) {
      const icon = group.get('group').icon;
      if(cfg.hideIcon && icon && icon.get('visible')){
        icon.hide();
      }else if(!cfg.hideIcon && icon && !icon.get('visible')){
        icon.show();
      }
    },
    initStyle(cfg){
      cfg.selectedColor = this.selectedColor;
      cfg.unSelectedColor = this.unSelectedColor;
      cfg.icon = this.icon;
      return cfg;
    },
  }, 'single-shape');

  G6.registerNode('task-node', {
    shapeType: 'rect',
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF',
    getShapeStyle(cfg) {
      cfg.size = [80, 44];
      cfg = this.initStyle(cfg);
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    }
  }, 'flow-node');
  G6.registerNode('gateway-node', {
    shapeType: 'path',
    selectedColor: '#8CE8DE',
    unSelectedColor: '#E8FEFA',
    borderColor: '#13C2C2',
    labelPosition: 'bottom',
    getShapeStyle(cfg) {
      cfg.size = [40, 40];
      cfg = this.initStyle(cfg);
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
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -6, -6],
            ['L', 6, 6],
            ['Z'],
            ['M', 6, -6],
            ['L', -6, 6],
            ['Z'] // close
          ],
          lineWidth: 2,
          fill: this.borderColor,
          stroke: this.borderColor,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'flow-node');
  G6.registerNode('start-node', {
    shapeType: 'circle',
    selectedColor: '#FCD49A',
    unSelectedColor: '#FEF7E8',
    borderColor: '#FA8C16',
    labelPosition: 'bottom',
    getShapeStyle(cfg) {
      cfg.size = [30, 30];
      cfg = this.initStyle(cfg);
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -6],
            ['L', 6, 0],
            ['L', -4, 6],
            ['Z'] // close
          ],
          fill: this.borderColor,
          stroke: this.borderColor,
        }
      });
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
    selectedColor: '#CFD49A',
    unSelectedColor: '#EFF7E8',
    borderColor: '#F5222D',
    labelPosition: 'bottom',
    getShapeStyle(cfg) {
      cfg.size = [30, 30];
      cfg = this.initStyle(cfg);
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -4],
            ['L', 4, -4],
            ['L', 4, 4],
            ['L', -4, 4],
            ['Z'] // close
          ],
          fill: this.borderColor,
          stroke: this.borderColor,
        }
      });
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [0.5, 1], // bottom
        [0, 0.5], // left
      ]
    }
  }, 'flow-node');
  G6.registerNode('catch-node', {
    shapeType: 'path',
    selectedColor: '#FCD49A',
    unSelectedColor: '#FEF7E8',
    borderColor: '#FA8C16',
    labelPosition: 'bottom',
    getShapeStyle(cfg) {
      cfg.size = [50, 30];
      cfg = this.initStyle(cfg);
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        path: [
          ['M', 0 , -height/3],
          ['L', width/2, -height/3],
          ['L', 0, height/3*2],
          ['L', -width/2, -height/3],
          ['Z'] // close
        ],
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [0.8, 0.38], // right
        [0.5, 1], // bottom
        [0.2, 0.38], // left
      ]
    }
  }, 'flow-node');
  G6.registerNode('user-task-node', {
    icon: require('../assets/icons/icon_user.svg'),
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF',
  }, 'task-node');
  G6.registerNode('script-task-node', {
    icon: require('../assets/icons/icon_script.svg'),
    selectedColor: '#FFE7BA',
    unSelectedColor: '#FFF7E6',
    borderColor: '#FFA940',
  }, 'task-node');
  G6.registerNode('java-task-node', {
    icon: require('../assets/icons/icon_java.svg'),
    selectedColor: '#FFCCC7',
    unSelectedColor: '#FFF1F0',
    borderColor: '#FF4D4F',
  }, 'task-node');
  G6.registerNode('mail-task-node', {
    icon: require('../assets/icons/icon_mail.svg'),
    selectedColor: '#D9F7BE',
    unSelectedColor: '#F6FFED',
    borderColor: '#73D13D',
  }, 'task-node');
  G6.registerNode('receive-task-node', {
    icon: require('../assets/icons/icon_receive.svg'),
    selectedColor: '#ffd6e7',
    unSelectedColor: '#fff0f6',
    borderColor: '#ff85c0',
  }, 'task-node');
  G6.registerNode('timer-start-node', {
    icon: require('../assets/icons/icon_timer.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('message-start-node', {
    icon: require('../assets/icons/icon_message.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('signal-start-node', {
    icon: require('../assets/icons/icon_signal.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('timer-catch-node', {
    icon: require('../assets/icons/icon_timer.svg'),
  }, 'catch-node');
  G6.registerNode('signal-catch-node', {
    icon: require('../assets/icons/icon_signal.svg'),
  }, 'catch-node');
  G6.registerNode('message-catch-node', {
    icon: require('../assets/icons/icon_message.svg'),
  }, 'catch-node');
}