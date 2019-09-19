import editorStyle from "../util/defaultStyle";

export default function(G6) {
  G6.registerNode('task-node', {
    shapeType: 'rect',
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF',
    iconWidth: 12,
    iconHeight: 12,
    iconPaddingLeft: 2,
    iconPaddingTop: 2,
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
  }, 'base-node');
  G6.registerNode('gateway-node', {
    shapeType: 'path',
    selectedColor: '#8CE8DE',
    unSelectedColor: '#E8FEFA',
    borderColor: '#13C2C2',
    labelPosition: 'bottom',
    iconWidth: 20,
    iconHeight: 20,
    iconPaddingLeft: 2,
    iconPaddingTop: 2,
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
          ['Z']
        ],
        ...editorStyle.nodeStyle,
        fill: cfg.unSelectedColor,
        stroke: this.borderColor,
      };
      return style;
    },
  }, 'base-node');
  G6.registerNode('exclusive-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -8, -8],
            ['L', 8, 8],
            ['Z'],
            ['M', 8, -8],
            ['L', -8, 8],
            ['Z']
          ],
          lineWidth: 2,
          fill: this.borderColor,
          stroke: this.borderColor,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('parallel-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', 0, -10],
            ['L', 0, 10],
            ['Z'],
            ['M', -10, 0],
            ['L', 10, 0],
            ['Z']
          ],
          lineWidth: 2,
          fill: this.borderColor,
          stroke: this.borderColor,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('inclusive-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 10,
          lineWidth: 2,
          stroke: this.borderColor,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('start-node', {
    shapeType: 'circle',
    selectedColor: '#FCD49A',
    unSelectedColor: '#FEF7E8',
    borderColor: '#FA8C16',
    labelPosition: 'bottom',
    iconWidth: 18,
    iconHeight: 18,
    iconPaddingLeft: 6,
    iconPaddingTop: 6,
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
  }, 'base-node');
  G6.registerNode('end-node', {
    shapeType: 'circle',
    selectedColor: '#CFD49A',
    unSelectedColor: '#EFF7E8',
    borderColor: '#F5222D',
    labelPosition: 'bottom',
    iconWidth: 18,
    iconHeight: 18,
    iconPaddingLeft: 6,
    iconPaddingTop: 6,
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
  }, 'base-node');
  G6.registerNode('catch-node', {
    shapeType: 'path',
    selectedColor: '#FCD49A',
    unSelectedColor: '#FEF7E8',
    borderColor: '#FA8C16',
    labelPosition: 'bottom',
    iconWidth: 20,
    iconHeight: 20,
    iconPaddingLeft: -10,
    iconPaddingTop: -8,
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
  }, 'base-node');
  G6.registerNode('user-task-node', {
    icon: require('../assets/icons/flow/icon_user.svg'),
    selectedColor: '#95D6FB',
    unSelectedColor: '#E7F7FE',
    borderColor: '#1890FF',
  }, 'task-node');
  G6.registerNode('script-task-node', {
    icon: require('../assets/icons/flow/icon_script.svg'),
    selectedColor: '#FFE7BA',
    unSelectedColor: '#FFF7E6',
    borderColor: '#FFA940',
  }, 'task-node');
  G6.registerNode('java-task-node', {
    icon: require('../assets/icons/flow/icon_java.svg'),
    selectedColor: '#FFCCC7',
    unSelectedColor: '#FFF1F0',
    borderColor: '#FF4D4F',
  }, 'task-node');
  G6.registerNode('mail-task-node', {
    icon: require('../assets/icons/flow/icon_mail.svg'),
    selectedColor: '#D9F7BE',
    unSelectedColor: '#F6FFED',
    borderColor: '#73D13D',
  }, 'task-node');
  G6.registerNode('receive-task-node', {
    icon: require('../assets/icons/flow/icon_receive.svg'),
    selectedColor: '#ffd6e7',
    unSelectedColor: '#fff0f6',
    borderColor: '#ff85c0',
  }, 'task-node');
  G6.registerNode('timer-start-node', {
    icon: require('../assets/icons/flow/icon_timer.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('message-start-node', {
    icon: require('../assets/icons/flow/icon_message.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('signal-start-node', {
    icon: require('../assets/icons/flow/icon_signal.svg'),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('timer-catch-node', {
    icon: require('../assets/icons/flow/icon_timer.svg'),
  }, 'catch-node');
  G6.registerNode('signal-catch-node', {
    icon: require('../assets/icons/flow/icon_signal.svg'),
  }, 'catch-node');
  G6.registerNode('message-catch-node', {
    icon: require('../assets/icons/flow/icon_message.svg'),
  }, 'catch-node');
}
