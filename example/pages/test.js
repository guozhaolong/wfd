import Designer from "../../dist";
import React from "react";
export default () => {
  const data = {
    nodes: [{ id: 'node1', x: 100, y: 200, label: '开始', shape: 'start-node', },
      { id: 'node2', x: 300, y: 200, label: '主任审批', shape: 'task-node', },
      { id: 'node3', x: 200, y: 300, label: '经理审批', shape: 'task-node', },
      { id: 'node4', x: 400, y: 400, label: '金额大于1000', shape: 'decision-node', },
      { id: 'node5', x: 500, y: 300, label: '董事长审批', shape: 'task-node', },
      { id: 'node6', x: 600, y: 200, label: '结束', shape: 'end-node', }],
    edges: [{ source: 'node1', target: 'node2',sourceAnchor:1,targetAnchor:3 },
      { source: 'node2', target: 'node3',sourceAnchor:2,targetAnchor:1 },
      // { source: 'node3', target: 'node4',sourceAnchor:0,targetAnchor:2 },
      // { source: 'node4', target: 'node5',sourceAnchor:0,targetAnchor:3 },
      // { source: 'node3', target: 'node6',sourceAnchor:1,targetAnchor:3 }
    ]
  };
  return (
    <div >
      <Designer data={data} onSave={(d)=>{console.log(d)}}/>
    </div>
  );
}
