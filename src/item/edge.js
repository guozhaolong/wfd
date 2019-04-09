import editorStyle from "../util/defaultStyle";
const Util = require('@antv/g6/src/util');

export default function(G6){
  G6.registerEdge('flow-polyline-round', {
    getShapeStyle(cfg) {
      cfg = this.getPathPoints(cfg);
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const controlPoints = this.getControlPoints(cfg);
      let points = [ startPoint ];
      if (controlPoints) {
        points = points.concat(controlPoints);
      }
      points.push(endPoint);
      const path = this.getPath(points);
      return {
        path,
        ...editorStyle.edgeStyle,
        endArrow: {
          path: 'M 0,0 L -10,-4 S -8 0,-10 4 Z',
        }
      }
    },
    getPath(points){
      const path = [];
      const last = points.length - 1;
      const cornerLen = 5;
      Util.each(points, (point, index) => {
        if (index === 0) {
          path.push([ 'M', point.x, point.y ]);
        } else if(index === last) {
          path.push([ 'L', point.x, point.y ]);
        } else {
          const prevPoint = points[index - 1];
          const nextPoint = points[index + 1];
          if(prevPoint.x === point.x) {
            path.push(['L', point.x, point.y > prevPoint.y ? point.y - cornerLen : point.y + cornerLen]);
          } else {
            path.push(['L', point.x > prevPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y]);
          }
          if(nextPoint.x === point.x) {
            path.push([ 'Q', point.x, point.y, point.x, point.y > nextPoint.y ? point.y - cornerLen : point.y + cornerLen]);
          } else {
            path.push([ 'Q', point.x, point.y, point.x > nextPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y]);
          }
        }
      });
      return path;
    },
    getControlPoints(cfg) {
      if(!cfg.sourceNode){
        return cfg.controlPoints;
      }

      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const startIdx = startPoint.index;
      const endIdx = endPoint.index;
      const gap = 20;
      const sourceBox = cfg.sourceNode.getBBox();
      const targetBox = cfg.targetNode.getBBox();
      // console.log(this.findPath(startPoint,endPoint,cfg.sourceNode,cfg.targetNode));

      return cfg.controlPoints;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      const path = group.getChildByIndex(0);
      if(name === 'selected'){
        if(value) {
          path.attr('lineWidth', editorStyle.edgeSelectedStyle.lineWidth);
          path.attr('stroke', editorStyle.edgeStyle.stroke);
        }else {
          path.attr('lineWidth', editorStyle.edgeStyle.lineWidth);
        }
      }else if(name === 'hover'){
        if(value)
          path.attr('stroke', editorStyle.edgeActivedStyle.stroke);
        else
          path.attr('stroke',editorStyle.edgeStyle.stroke);
      }
    },
    getPointBBox(t) {
      return { centerX: t.x, centerY: t.y, minX: t.x, minY: t.y, maxX: t.x, maxY: t.y, height: 0, width: 0 };
    },
    getBBoxWithGap(bbox, gap) {
      return 0 === bbox.width && 0 === bbox.height ? bbox : {
        centerX: bbox.centerX,
        centerY: bbox.centerY,
        minX: bbox.minX - gap,
        minY: bbox.minY - gap,
        maxX: bbox.maxX + gap,
        maxY: bbox.maxY + gap,
        height: bbox.height + 2 * gap,
        width: bbox.width + 2 * gap,
      };
    },
    getGapPoint(bbox, point) {
      return Math.abs(point.x - bbox.centerX) / bbox.width > Math.abs(point.y - bbox.centerY) / bbox.height //判断点是在图形左右还是上下
        ? { x: point.x > bbox.centerX ? bbox.maxX : bbox.minX, y: point.y } //左右时
        : { x: point.x, y: point.y > bbox.centerY ? bbox.maxY : bbox.minY }; //上下时
    },
    getMergeBBox(sourceBBox, targetBBox) {
      const minX = Math.min(sourceBBox.minX, targetBBox.minX), minY = Math.min(sourceBBox.minY, targetBBox.minY), maxX = Math.max(sourceBBox.maxX, targetBBox.maxX),
        maxY = Math.max(sourceBBox.maxY, targetBBox.maxY);
      return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY,
        height: maxY - minY,
        width: maxX - minX,
      };
    },
    getRectPoint(t) {
      return [{ x: t.minX, y: t.minY }, { x: t.maxX, y: t.minY }, { x: t.maxX, y: t.maxY }, { x: t.minX, y: t.maxY }];
    },
    hit(point, bbox) {
      return point.x < bbox.minX || point.x > bbox.maxX || point.y < bbox.minY || point.y > bbox.maxY;
    },
    getPointsId(points) {
      return points.map(p => {
        p.id = p.x + '-' + p.y;
        let obj = {};
        obj[p.id] = p;
        return obj;
      })
    },
    findPath(startPoint, endPoint, sourceNode, targetNode) {
      const gap = 20;
      const sourceBBox = sourceNode && sourceNode.getBBox() ? sourceNode.getBBox() : this.getPointBBox(startPoint);
      const targetBBox = targetNode && targetNode.getBBox() ? targetNode.getBBox() : this.getPointBBox(endPoint);
      const sourceGapBBox = this.getBBoxWithGap(sourceBBox,gap);
      const targetGapBBox = this.getBBoxWithGap(targetBBox,gap);
      const startGapPoint = this.getGapPoint(sourceGapBBox,startPoint);
      const endGapPoint = this.getGapPoint(targetGapBBox,endPoint);
      const minX = Math.min(startGapPoint.x,endGapPoint.x);
      const maxX = Math.max(startGapPoint.x,endGapPoint.x);
      const minY = Math.min(startGapPoint.y,endGapPoint.y);
      const maxY = Math.max(startGapPoint.y,endGapPoint.y);
      const virtualBBox = {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        maxX: maxX,
        maxY: minY,
        minX: minX,
        minY: maxY,
        height: maxY - minY,
        width: maxX - minX,
      };
      const bbox1 = this.getMergeBBox(sourceGapBBox,targetGapBBox);
      const bbox2 = this.getMergeBBox(sourceGapBBox,virtualBBox);
      const bbox3 = this.getMergeBBox(targetGapBBox,virtualBBox);
      let points = [this.getRectPoint(bbox1),this.getRectPoint(bbox2),this.getRectPoint(bbox3)];
      const bboxCenter = { x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2 };

      [virtualBBox, bbox1, bbox2,bbox3].forEach((bbox) => {
        if(bboxCenter.x < bbox.minX || bboxCenter.x > bbox.maxX)
          points.push([{ x: bboxCenter.x, y: bbox.minY }, { x: bboxCenter.x, y: bbox.maxY }]);
        if(bboxCenter.y < bbox.minY || bboxCenter.y > bbox.maxY)
          points.push([{ x: bbox.minX, y: bboxCenter.y }, { x: bbox.maxX, y: bboxCenter.y }]);
        points = points.filter(p => this.hit(p,sourceGapBBox) && this.hit(p,targetGapBBox))
      });
      [{ x: startGapPoint.x, y: endGapPoint.y }, { x: endGapPoint.x, y: startGapPoint.y }].forEach((p) => {
        this.hit(p, sourceGapBBox) && this.hit(p, targetGapBBox) && points.push(p);
      })
      points.unshift(startGapPoint);
      points.push(endGapPoint);
      let result = points;
      result.unshift(startPoint);
      result.push(endPoint);
      return result;
    }
  },'polyline');
}