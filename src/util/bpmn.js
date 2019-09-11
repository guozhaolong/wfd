export function exportXML(json,canvas,createFile = true) {
  const id = canvas.id || "flow";
  const name = canvas.name || "flow";
  let dataObjs = "";
  let processXML = `<progress id="${id}" name="${name}">\n`;
  processXML += dataObjs;
  json.nodes.forEach(node => {
    switch (node.clazz) {
      case 'start':
        processXML += `  <startEvent id="${node.id}"></startEvent>\n`;
        break;
      case 'end':
        processXML += `  <endEvent id="${node.id}"></endEvent>\n`;
        break;
      case 'userTask': {
        let assignments = "";
        if(node.assignValue && node.assignValue.length > 0){
          if(node.assignType === 'person'){
            assignments += `flowable:candidateUsers="${node.assignValue.join(',')}"`;
          }else if(node.assignType === 'persongroup'){
            assignments += `flowable:candidateGroups="${node.assignValue.join(',')}"`;
          }
        }
        processXML += `  <userTask id="${node.id}" name="${node.label}" ${assignments}></userTask>\n`;
        break;
      }
      case 'gateway':
        processXML += `  <exclusiveGateway id="${node.id}" name="${node.label}"></exclusiveGateway>\n`;
        break;
      default:
        break;
    }
  });
  json.edges.forEach(edge => {
    let condition = "";
    if(edge.coditionExpression){
      condition = `    <conditionExpression xsi:type="tFormalExpression"><![CDATA[${edge.coditionExpression}]]></conditionExpression>\n`;
    }
    processXML += `  <sequenceFlow id="${edge.source}_${edge.sourceAnchor}-${edge.target}_${edge.targetAnchor}" sourceRef="${edge.source}" targetRef="${edge.target}">${condition}</sequenceFlow>\n`;
  });
  processXML += `</process>\n`;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">\n`;
  xml += processXML;
  xml += `</definitions>`;
  if(createFile){
    const blob = new Blob(["\ufeff"+xml], { type: 'application/xml;charset=utf-8;' });
    const filename = `${name}.xml`;
    let link = document.createElement('a');
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  return xml;
}
