import{l as r,t as b,m as y,s as c,v as m,a}from"./marketing-E2pJE5T-.js";const o=a.state([[0,0,0],[0,0,10],[10,0,0]]),d=a.state([[0,2],[1,2]]),i=a.state({}),s=a.state({}),n=a.state([["steel",100]]),f=a.state([["rectangle",100]]),p=a.state([["pinned",!0,!0,!0,0,0,0]]),x=a.state([["100x",100,0,0,0,0,0]]),t=new Map;t.set("nodes",{text:"Nodes",fields:[{field:"A",text:"X-coordinate",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}},{field:"C",text:"Z-coordinate",editable:{type:"float"}}],data:o});t.set("elements",{text:"Elements",fields:[{field:"A",text:"Node 1",editable:{type:"float"}},{field:"B",text:"Node 2",editable:{type:"float"}}],data:d});t.set("materials",{text:"Materials",fields:[{field:"A",text:"Label"},{field:"B",text:"Elasticity",editable:{type:"float"}}],data:n});t.set("sections",{text:"Sections",fields:[{field:"A",text:"Label"},{field:"B",text:"Area",editable:{type:"float"}}],data:f});t.set("pointSupports",{text:"Point Supports",fields:[{field:"A",text:"Label"},{field:"B",text:"X-translation",editable:{type:"float"}},{field:"C",text:"Y-translation",editable:{type:"float"}},{field:"D",text:"Z-translation",editable:{type:"float"}},{field:"E",text:"X-rotation",editable:{type:"float"}},{field:"F",text:"Y-rotation",editable:{type:"float"}},{field:"G",text:"Z-rotation",editable:{type:"float"}}],data:p});t.set("pointLoads",{text:"Point Loads",fields:[{field:"A",text:"Label"},{field:"B",text:"X-Force",editable:{type:"float"}},{field:"C",text:"Y-Force",editable:{type:"float"}},{field:"D",text:"Z-Force",editable:{type:"float"}},{field:"E",text:"X-Moment",editable:{type:"float"}},{field:"F",text:"Y-Moment",editable:{type:"float"}},{field:"G",text:"Z-Moment",editable:{type:"float"}}],data:x});t.set("nodeInputs",{text:"Nodes Inputs",fields:[{field:"A",text:"Node"},{field:"B",text:"Point Support",editable:{type:"float"}},{field:"C",text:"Point Load",editable:{type:"float"}}],data:i});t.set("elementInputs",{text:"Element Inputs",fields:[{field:"A",text:"Node"},{field:"B",text:"Materials",editable:{type:"float"}},{field:"C",text:"Sections",editable:{type:"float"}}],data:i});const u=({sheet:e,data:l})=>{e==="nodes"&&(o.val=l),e==="elements"&&(d.val=l),e==="materials"&&(n.val=l),e==="sections"&&(f.val=l),e==="pointSupports"&&(p.val=l),e==="pointLoads"&&(x.val=l),e==="nodeInputs"&&(i.val=l),e==="elementInputs"&&(s.val=l)};document.body.append(r({topLeft:{element:b("Analyzer")},topRight:{element:y({})},main:{element:c({sheets:t,onChange:u}),title:"Inputs"},right:{element:m({structure:{nodes:o,elements:d,nodeInputs:i,elementInputs:s}})}}));