##wfd
[![NPM Version](http://img.shields.io/npm/v/wfd.svg?style=flat)](https://www.npmjs.org/package/wfd)

## Usage
![image](https://github.com/guozhaolong/wfd/raw/master/example/images/demo.jpg)
```
import Designer from 'wfd';

const data = {
    nodes: [{ id: 'node1', x: 100, y: 200, label: '开始', shape: 'start-node', },
        { id: 'node2', x: 300, y: 200, label: '主任审批', shape: 'task-node', },
        { id: 'node6', x: 600, y: 200, label: '结束', shape: 'end-node', }],
    edges: [{ source: 'node1', target: 'node2',sourceAnchor:1,targetAnchor:3 },]
};

<Designer data={data} onSave={(d)=>{console.log(d)}}/>
```
## LICENSE

MIT
