(this["webpackJsonpphoto-editor"]=this["webpackJsonpphoto-editor"]||[]).push([[0],{100:function(e,t,n){},162:function(e,t,n){},163:function(e,t,n){},164:function(e,t,n){},171:function(e,t,n){},172:function(e,t,n){},279:function(e,t,n){},280:function(e,t){},281:function(e,t,n){},282:function(e,t,n){},283:function(e,t,n){"use strict";n.r(t),n.d(t,"render",(function(){return kt}));var a=n(2),r=n(16),i=n(15),o=n(0),c=n.n(o),l=(n(162),n(6)),s=n(69);n(163),n(100),n(164);function u(e){return Object(a.jsxs)("div",{className:"EditText-input",children:[Object(a.jsx)("input",{className:"Number-input",id:e.id,type:e.type,min:e.min,defaultValue:e.text,placeholder:e.hintText,onFocus:function(){void 0!==e.onClick&&e.onClick()},onClick:function(){void 0!==e.onClick&&e.onClick()},onChange:function(t){return e.onChange(t)}}),Object(a.jsx)("label",{className:"Number-label",htmlFor:"newWidth",onClick:function(){void 0!==e.onClick&&e.onClick()},children:e.title})]})}var d,x=n(309),y=n(311),h=n(312),f=n(66),b=n.n(f),j=n(328),p=n(8),v=n(285),O=n(310),g=n(329),m=n(326),C=n(313),T=Object(p.a)((function(e){return Object(j.a)({root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[300]},title:{fontFamily:"cursive",color:e.palette.secondary.main}})}))((function(e){var t=e.children,n=e.classes,r=e.onClose,i=Object(s.a)(e,["children","classes","onClose"]);return Object(a.jsxs)(x.a,Object(l.a)(Object(l.a)({disableTypography:!0,className:n.root},i),{},{children:[Object(a.jsx)(v.a,{className:n.title,variant:"h6",children:t}),r?Object(a.jsx)(O.a,{"aria-label":"close",className:n.closeButton,onClick:r,children:Object(a.jsx)(b.a,{})}):null]}))})),k=c.a.forwardRef((function(e,t){return Object(a.jsx)(g.a,Object(l.a)({direction:"up",ref:t},e))})),w=Object(p.a)((function(e){return{root:{padding:e.spacing(2)}}}))(y.a),S=Object(p.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(h.a);function F(e){var t=Object(r.c)(),n=c.a.useState(!1),l=Object(i.a)(n,2),s=l[0],d=l[1],x=Object(o.useState)({x:800,y:600}),y=Object(i.a)(x,1)[0],h=function(){d(!1)};return Object(a.jsxs)("div",{children:[Object(a.jsx)(O.a,{color:"inherit",onClick:function(){d(!0)},children:e.children}),Object(a.jsxs)(m.a,{PaperProps:{style:{backgroundColor:"#FFFFFFa0"}},TransitionComponent:k,onClose:h,"aria-labelledby":"customized-dialog-title",open:s,children:[Object(a.jsx)(T,{id:"customized-dialog-title",onClose:h,children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043c\u0435\u0440"}),Object(a.jsxs)(w,{dividers:!0,children:[Object(a.jsx)(u,{title:"\u0428\u0438\u0440\u0438\u043d\u0430",type:"number",hintText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435",min:"1",text:y.x+"",onChange:function(e){return y.x=parseInt(e.target.value)}}),Object(a.jsx)(u,{title:"\u0412\u044b\u0441\u043e\u0442\u0430",type:"number",hintText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435",min:"1",text:y.y+"",onChange:function(e){return y.y=parseInt(e.target.value)}})]}),Object(a.jsx)(S,{children:Object(a.jsx)(C.a,{autoFocus:!0,onClick:function(){h(),e.action.value=y,t(e.action)},color:"secondary",children:e.applyText})})]})]})}function E(e){return{r:parseInt(e.substr(1,2),16),g:parseInt(e.substr(3,2),16),b:parseInt(e.substr(5,2),16),a:parseInt(e.substr(7,2),16)/255}}function z(e){return P(e)+A(Math.floor(255*e.a))}function A(e){return I(Math.floor(e/16))+I(e%16)}!function(e){e[e.Art=0]="Art",e[e.Rectangle=1]="Rectangle",e[e.Triangle=2]="Triangle",e[e.Circle=3]="Circle",e[e.TextObject=4]="TextObject",e[e.Area=5]="Area"}(d||(d={}));var M=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];function I(e){return M[e]}function P(e){return"#"+A(e.r)+A(e.g)+A(e.b)}function R(e,t,n){var a;switch(n.type){case d.Rectangle:a=H(e,t,n);break;case d.Triangle:a=function(e,t,n){e.beginPath(),e.moveTo(n.p0.x,n.p0.y),e.lineTo(n.p1.x,n.p1.y),e.lineTo(n.p2.x,n.p2.y),e.closePath(),e.globalAlpha=n.props.fillColor.a,e.fillStyle=P(n.props.fillColor),e.fill(),n.props.strokeWidth>0&&(e.lineWidth=n.props.strokeWidth,e.globalAlpha=n.props.strokeColor.a,e.strokeStyle=P(n.props.strokeColor),e.stroke());return e.getImageData(0,0,t.x,t.y)}(e,t,n);break;case d.Circle:a=function(e,t,n){e.beginPath(),e.moveTo(n.position.x+n.radius,n.position.y),e.arc(n.position.x,n.position.y,n.radius,0,2*Math.PI),e.closePath(),e.globalAlpha=n.props.fillColor.a,e.fillStyle=P(n.props.fillColor),e.fill(),n.props.strokeWidth>0&&(e.lineWidth=n.props.strokeWidth,e.globalAlpha=n.props.strokeColor.a,e.strokeStyle=P(n.props.strokeColor),e.stroke());return e.getImageData(0,0,t.x,t.y)}(e,t,n);break;case d.Art:a=function(e,t,n){var a=document.createElement("canvas");a.width=n.image.width,a.height=n.image.height;var r=a.getContext("2d");if(null===r)throw new Error;r.putImageData(n.image,0,0);var i=document.createElement("canvas");i.width=Math.max(1,n.size.x),i.height=Math.max(1,n.size.y);var o=i.getContext("2d");if(null===o)throw new Error;return o.scale(n.size.x/n.image.width,n.size.y/n.image.height),o.drawImage(a,0,0),e.drawImage(i,n.position.x,n.position.y),e.getImageData(0,0,t.x,t.y)}(e,t,n);break;case d.TextObject:a=function(e,t,n){return e.font="".concat(n.textSize,"px monospace"),H(e,t,n.rectangle),e.globalAlpha=n.textColor.a,e.fillStyle=P(n.textColor),e.fillText(n.text,n.rectangle.position.x+2,n.rectangle.position.y+n.textSize),e.getImageData(0,0,t.x,t.y)}(e,t,n)}if(e.globalAlpha=1,void 0===a)throw new Error;return a}function H(e,t,n){return e.beginPath(),e.moveTo(n.position.x,n.position.y),e.lineTo(n.position.x+n.size.x,n.position.y),e.lineTo(n.position.x+n.size.x,n.position.y+n.size.y),e.lineTo(n.position.x,n.position.y+n.size.y),e.closePath(),e.globalAlpha=n.props.fillColor.a,e.fillStyle=P(n.props.fillColor),e.fill(),n.props.strokeWidth>0&&(e.lineWidth=n.props.strokeWidth,e.globalAlpha=n.props.strokeColor.a,e.strokeStyle=P(n.props.strokeColor),e.stroke()),e.getImageData(0,0,t.x,t.y)}n(171);var L=n(314),D=n(286),N=n(288),W=n(290),B=n(103),_="UPDATE_TOOL";var U;n(172);!function(e){e[e.Rectangle=0]="Rectangle",e[e.Triangle=1]="Triangle",e[e.Circle=2]="Circle",e[e.Text=3]="Text",e[e.Area=4]="Area"}(U||(U={}));var V=Object(L.a)((function(e){return Object(j.a)({root:{backgroundColor:"#FFFFFF8a"},item:{minWidth:"0",width:"48px",height:"48px",borderRadius:"24px",alignContent:"center",margin:"0 4px",padding:"0","&:hover":{background:"#42424242"}},selectedItem:{background:e.palette.secondary.light+"CC","&:hover":{background:e.palette.secondary.light}}})}));function G(e){var t=e.onSelected,n=Object(r.c)(),i=Object(r.d)((function(e){return e.currentTool})),o=function(e){e!==i&&(n({type:_,value:e}),t())},c=V();return Object(a.jsxs)(D.a,{className:"Tools-root "+c.root,children:[Object(a.jsx)(v.a,{className:"Tools-title",variant:"subtitle1",color:"inherit",children:"\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b"}),Object(a.jsxs)(N.a,{className:"Tools-list",component:"nav","aria-label":"\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b",children:[Object(a.jsx)(W.a,{button:!0,onClick:function(){return o(U.Rectangle)},className:c.item+" "+(i===U.Rectangle?c.selectedItem:""),children:Object(a.jsx)(B.a,{viewBox:"0 0 32 32",style:{margin:"auto"},children:Object(a.jsx)("rect",{x:"0",y:"0",width:"32",height:"32",fill:i===U.Rectangle?"#FFFFFF":"#424242"})})}),Object(a.jsx)(W.a,{button:!0,onClick:function(){return o(U.Triangle)},className:c.item+" "+(i===U.Triangle?c.selectedItem:""),children:Object(a.jsx)(B.a,{viewBox:"0 0 32 32",style:{margin:"auto"},children:Object(a.jsx)("polygon",{points:"0,32 32,32 16,0",fill:i===U.Triangle?"#FFFFFF":"#424242"})})}),Object(a.jsx)(W.a,{button:!0,onClick:function(){return o(U.Circle)},className:c.item+" "+(i===U.Circle?c.selectedItem:""),children:Object(a.jsx)(B.a,{viewBox:"0 0 32 32",style:{margin:"auto"},children:Object(a.jsx)("circle",{r:"16",cx:"16",cy:"16",fill:i===U.Circle?"#FFFFFF":"#424242"})})}),Object(a.jsx)(W.a,{button:!0,onClick:function(){return o(U.Text)},className:c.item+" "+(i===U.Text?c.selectedItem:""),children:Object(a.jsx)(B.a,{viewBox:"0 0 24 24",style:{margin:"auto"},children:Object(a.jsx)("path",{d:"M5 4v3h5.5v12h3V7H19V4z",fill:i===U.Text?"#FFFFFF":"#424242"})})}),Object(a.jsx)(W.a,{button:!0,onClick:function(){return o(U.Area)},className:c.item+" "+(i===U.Area?c.selectedItem:""),children:Object(a.jsx)(B.a,{viewBox:"0 0 24 24",style:{margin:"auto"},children:Object(a.jsx)("path",{d:"M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z",fill:i===U.Area?"#FFFFFF":"#424242"})})})]})]})}function Y(e){return Math.floor(Math.sqrt(Math.pow(e.x,2)+Math.pow(e.y,2)))}function K(e,t,n){var a={x:Math.min(e.x,t.x),y:Math.min(e.y,t.y)},r=Math.max(e.x,t.x),i=Math.max(e.y,t.y);return{type:d.Rectangle,position:a,size:{x:r-a.x,y:i-a.y},props:{fillColor:n.fillColor,strokeColor:n.strokeColor,strokeWidth:n.strokeWidth}}}function X(e,t,n){var a={x:Math.min(e.x,t.x),y:Math.min(e.y,t.y)},r=Math.max(e.x,t.x),i=Math.max(e.y,t.y);return{type:d.Area,position:a,size:{x:r-a.x,y:i-a.y}}}var J="REMOVE_SELECTED_OBJECT";function Z(){return{type:J}}var q="SELECT_AREA";var Q=function(e){return{type:q,value:e}},$="CUT_SELECTED_AREA";var ee=function(){return{type:$}},te="PUSH_TO_HISTORY";var ne=function(e){return{type:te,value:e}},ae="REPLACE_SELECTED_OBJECT";var re=function(e){return{type:ae,value:e}};function ie(e){var t=new ImageData(e.width,e.height);return t.data.set(new Uint8ClampedArray(e.data)),t}function oe(e){return{canvas:ie(e.selectedObject.image),selectedObject:null}}function ce(e,t){for(var n={type:d.Art,image:new ImageData(t.size.x,t.size.y),position:t.position,size:t.size},a=ie(e.canvas),r=0;r<n.size.y;r++)for(var i=0;i<n.size.x;i++){for(var o=4*(r*n.size.x+i),c=4*((r+n.position.y)*a.width+i+n.position.x),s=0;s<4;s++)n.image.data[o+s]=e.canvas.data[c+s];a.data[c+3]=0}return Object(l.a)(Object(l.a)({},e),{},{selectedObject:n,canvas:a})}function le(e,t){var n=Object(l.a)(Object(l.a)({},e),{},{selectedObject:t});if(null!=e.selectedObject){var a=document.createElement("canvas");if(a.width=e.canvas.width,a.height=e.canvas.height,null!=a){var r=a.getContext("2d");null!=r&&(console.log(r),r.putImageData(e.canvas,0,0),n.canvas=R(r,{x:e.canvas.width,y:e.canvas.height},e.selectedObject))}}return n}function se(e){return{canvas:ie(e.canvas),selectedObject:null}}var ue="SET_EDITOR";var de=function(e){return{type:ue,value:e}};function xe(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1],l=Object(o.useState)(null),s=Object(i.a)(l,2),u=s[0],x=s[1],y=Object(o.useState)(null),h=Object(i.a)(y,2),f=h[0],b=h[1],j=Object(o.useState)({x:0,y:0}),p=Object(i.a)(j,2),v=p[0],O=p[1],g=Object(r.c)(),m=Object(r.d)((function(e){return e.editor}),r.b),C=m.canvas,T=m.selectedObject,k=Object(r.d)((function(e){return e.currentTool})),w=Object(r.d)((function(e){return e.objectState}),r.b);if(null!=T&&(T.type===d.Rectangle||T.type===d.Triangle||T.type===d.Circle||T.type===d.TextObject)){var S;if(T.type===d.TextObject){var F=T;F.text=w.text,F.textSize=w.textSize,F.textColor=w.textColor,S=F.rectangle.props}else S=T.props;S.fillColor=w.fillColor,S.strokeColor=w.strokeColor,S.strokeWidth=w.strokeWidth}var E=Object(o.useRef)(null);Object(o.useEffect)((function(){null!=E.current&&fe(E.current,C,T,u)}),[C,T,u]),Object(o.useEffect)((function(){var e=function(e){if(e.ctrlKey)if("KeyX"===e.code){if(null!=u&&u.type===d.Area){g(Q(u));var t=m.canvas;g(ee()),g(ne(t)),x(null),g(Z())}}else"KeyA"===e.code&&x(X({x:0,y:0},{x:C.width,y:C.height}));else switch(e.code){case"Escape":x(null);var n=le(m,null);g(ne(n.canvas)),g(de(n));break;case"Delete":if(null!=u&&u.type===d.Area){g(Q(u));var a=m.canvas;g(Z()),g(ne(a))}else g(Z());x(null);break;case"Enter":if(null!=u&&u.type===d.Area)g(Q(u));else{var r=m.canvas;g(re(null)),g(ne(r))}x(null)}};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}));var z=function(e,t){if(n){var a=null;switch(console.log(k),k){case U.Rectangle:a=K(e,t,w);break;case U.Triangle:a=function(e,t,n){var a={x:Math.min(e.x,t.x),y:e.y},r={x:Math.max(e.x,t.x),y:t.y};return{type:d.Triangle,p0:{x:a.x,y:a.y},p1:{x:r.x,y:a.y},p2:{x:a.x/2+r.x/2,y:r.y},props:{fillColor:n.fillColor,strokeColor:n.strokeColor,strokeWidth:n.strokeWidth}}}(e,t,w);break;case U.Circle:a=function(e,t,n){var a=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));return{type:d.Circle,position:{x:e.x,y:e.y},radius:a,props:{fillColor:n.fillColor,strokeColor:n.strokeColor,strokeWidth:n.strokeWidth}}}(e,t,w);break;case U.Text:a=function(e,t,n){return{type:d.TextObject,rectangle:K(e,t,n),text:n.text,textSize:n.textSize,textColor:n.textColor}}(e,t,w);break;case U.Area:a=X(e,t)}x(a)}};return Object(a.jsx)("div",{className:"Canvas-container",children:Object(a.jsx)("canvas",{id:"canvas",ref:E,className:"Canvas",width:C.width,height:C.height,onMouseDown:function(e){var t=E.current;if(null!==t){if("pointer"===t.style.cursor){if(null!=T){if(x(T),null==t.getContext("2d"))return;null!=T&&g(Z()),O({x:e.clientX-t.offsetLeft,y:e.clientY-t.offsetTop})}}else if("grab"===t.style.cursor)(null!=T||null!==u&&u.type===d.Area)&&(t.style.cursor="grabbing",null===T&&null!==u&&u.type===d.Area||x(T),g(Z()),O({x:e.clientX-t.offsetLeft,y:e.clientY-t.offsetTop}));else{if(null!=T){var n=le(m,null);g(ne(n.canvas)),g(de(n))}O({x:e.clientX-t.offsetLeft,y:e.clientY-t.offsetTop})}c(!0)}},onMouseMove:function(e){var t=E.current;if(null!==t){var a,r,i={x:e.clientX-t.offsetLeft,y:e.clientY-t.offsetTop};if(n){if(null!=T){var o=le(m,null);g(ne(o.canvas)),g(de(o))}var c=i.x-v.x,l=i.y-v.y;if("pointer"===t.style.cursor){if(null!==u&&null!==f)if(u.type===d.Rectangle||u.type===d.TextObject||u.type===d.Art||u.type===d.Area){var s;if(s=u.type===d.TextObject?u.rectangle:u,e.shiftKey&&s.type===d.Art){var x={x:c,y:l},y=Y(x),h=Y(s.size);c=y*(s.size.x/h),l=y*(s.size.y/h);var j=Math.sign(((a=x).x*(r=f).x+a.y*r.y)/(Y(a)*Y(r)));s.position.x+=c*Math.min(f.x,0)*j,s.position.y+=l*Math.min(f.y,0)*j,s.size.x+=c*j,s.size.y+=l*j}else f.x>0?s.size.x+=c:f.x<0&&(s.position.x+=c,s.size.x+=-c),f.y>0?s.size.y+=l:f.y<0&&(s.position.y+=l,s.size.y+=-l);0===s.size.x&&(s.size.x=-1),0===s.size.y&&(s.size.y=-1),s.size.x<0&&(f.x*=-1,s.size.x=Math.abs(s.size.x),s.position.x-=s.size.x),s.size.y<0&&(f.y*=-1,s.size.y=Math.abs(s.size.y),s.position.y-=s.size.y)}else if(u.type===d.Triangle)f.x+=c,f.y+=l;else if(u.type===d.Circle){var p=u;p.radius=Y({x:i.x-p.position.x,y:i.y-p.position.y})}O(i),null!=E.current&&fe(E.current,C,null,u)}else if("grabbing"===t.style.cursor){var k;if(null!=u)if(u.type===d.Rectangle||u.type===d.Circle||u.type===d.TextObject||u.type===d.Art||u.type===d.Area)(k=u.type===d.TextObject?u.rectangle:u).position.x+=c,k.position.y+=l;else if(u.type===d.Triangle){var w=u;w.p0.x+=c,w.p0.y+=l,w.p1.x+=c,w.p1.y+=l,w.p2.x+=c,w.p2.y+=l}O(i),null!=E.current&&fe(E.current,C,null,u)}else z(v,i)}else null===T&&null!==u&&u.type===d.Area?ye(t,i,u,b):ye(t,i,T,b),O(i)}},onMouseUp:function(e){var t=E.current;if(null!==t){var n={x:e.clientX-t.offsetLeft,y:e.clientY-t.offsetTop};if(null!=u)ye(t,n,u,b),u.type!==d.Area?(g(re(u)),x(null)):"default"===t.style.cursor&&x(null);else if("default"===t.style.cursor&&null!=T){g(ne(C));var a=le(m,null);g(de(a))}c(!1)}}})})}function ye(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3?arguments[3]:void 0;if(null!=n){if(n.type===d.Rectangle||n.type===d.TextObject||n.type===d.Art||n.type===d.Area){var r,i=(r=n.type===d.TextObject?n.rectangle:n).position,o=r.size,c=[{x:i.x,y:i.y},{x:i.x+o.x/2,y:i.y},{x:i.x+o.x,y:i.y},{x:i.x+o.x,y:i.y+o.y/2},{x:i.x+o.x,y:i.y+o.y},{x:i.x+o.x/2,y:i.y+o.y},{x:i.x,y:i.y+o.y},{x:i.x,y:i.y+o.y/2}],l=c.map((function(e){return Y({x:e.x-t.x,y:e.y-t.y})<=12})).findIndex((function(e){return e}));l>-1?(a({x:Math.sign(c[l].x-(i.x+o.x/2)),y:Math.sign(c[l].y-(i.y+o.y/2))}),e.style.cursor="pointer"):t.x>=i.x&&t.x<=i.x+o.x&&t.y>=i.y&&t.y<=i.y+o.y?e.style.cursor="grab":e.style.cursor="default"}else if(n.type===d.Triangle){var s=n,u=[s.p0,s.p1,s.p2],x=u.map((function(e){return Y({x:e.x-t.x,y:e.y-t.y})<=12})).findIndex((function(e){return e}));x>-1?(a(u[x]),e.style.cursor="pointer"):he(t,s.p0,s.p1,s.p2)?e.style.cursor="grab":e.style.cursor="default"}else if(n.type===d.Circle){var y=n,h=Y({x:t.x-y.position.x,y:t.y-y.position.y});h>=y.radius-12&&h<=y.radius+12?e.style.cursor="pointer":Y({x:t.x-y.position.x,y:t.y-y.position.y})<Math.max(y.radius-12,0)?e.style.cursor="grab":e.style.cursor="default"}}else e.style.cursor="default"}function he(e,t,n,a){var r=e.x-a.x,i=e.y-a.y,o=a.x-n.x,c=n.y-a.y,l=c*(t.x-a.x)+o*(t.y-a.y),s=c*r+o*i,u=(a.y-t.y)*r+(t.x-a.x)*i;return l<0?s<=0&&u<=0&&s+u>=l:s>=0&&u>=0&&s+u<=l}function fe(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(null!=e){var r=e.getContext("2d");if(null!=r&&(r.putImageData(t,0,0),null!=n&&(r.putImageData(R(r,{x:t.width,y:t.height},n),0,0),je(n,r)),null!=a))if(a.type!==d.Area){var i=a;r.putImageData(R(r,{x:t.width,y:t.height},i),0,0)}else je(a,r)}}function be(e,t,n){var a=e.createLinearGradient(t.x,t.y,t.x+n.x,t.y+n.y);return a.addColorStop(0,"#F00"),a.addColorStop(.2,"#FF0"),a.addColorStop(.4,"#0F0"),a.addColorStop(.6,"#0FF"),a.addColorStop(.8,"#00F"),a.addColorStop(1,"#F0F"),a}function je(e,t){if(t.lineWidth=2,e.type===d.Rectangle||e.type===d.TextObject||e.type===d.Art||e.type===d.Area){var n;n=e.type===d.TextObject?e.rectangle:e,e.type===d.Area&&t.setLineDash([3,4]);var a=n.position,r=n.size;t.beginPath();var i=Math.min(a.y+r.y,a.y);t.moveTo(a.x-t.lineWidth,i-t.lineWidth),t.lineTo(a.x+r.x+t.lineWidth,i-t.lineWidth),t.lineTo(a.x+r.x+t.lineWidth,i+Math.abs(r.y)+t.lineWidth),t.lineTo(a.x-t.lineWidth,i+Math.abs(r.y)+t.lineWidth),t.lineTo(a.x-t.lineWidth,i-t.lineWidth),t.closePath(),t.strokeStyle=be(t,a,n.size),t.fillStyle=t.strokeStyle,t.stroke();var o=[{x:a.x,y:a.y},{x:a.x+r.x/2,y:a.y},{x:a.x+r.x,y:a.y},{x:a.x+r.x,y:a.y+r.y/2},{x:a.x+r.x,y:a.y+r.y},{x:a.x+r.x/2,y:a.y+r.y},{x:a.x,y:a.y+r.y},{x:a.x,y:a.y+r.y/2}];e.type===d.Area&&t.setLineDash([]),o.forEach((function(e){t.beginPath(),t.arc(e.x,e.y,8,0,2*Math.PI,!1),t.fill(),t.strokeStyle="#424242",t.stroke(),t.closePath()}))}else if(e.type===d.Triangle){var c=e;t.beginPath(),t.moveTo(c.p0.x,c.p0.y),t.lineTo(c.p1.x,c.p1.y),t.lineTo(c.p2.x,c.p2.y),t.closePath();var l=[c.p0,c.p1,c.p2],s={x:Math.min(c.p0.x,c.p1.x,c.p2.x),y:Math.min(c.p0.y,c.p1.y,c.p2.y)},u={x:Math.max(c.p0.x,c.p1.x,c.p2.x),y:Math.max(c.p0.y,c.p1.y,c.p2.y)};t.strokeStyle=be(t,s,{x:u.x-s.x,y:u.y-s.y}),t.fillStyle=t.strokeStyle,t.stroke();l.forEach((function(e){t.beginPath(),t.arc(e.x,e.y,8,0,2*Math.PI,!1),t.fill(),t.strokeStyle="#424242",t.stroke(),t.closePath()}))}else if(e.type===d.Circle){var x=e,y=x.position;t.beginPath(),t.moveTo(y.x+x.radius+t.lineWidth,y.y),t.arc(y.x,y.y,x.radius+t.lineWidth,0,2*Math.PI),t.closePath(),t.strokeStyle=be(t,{x:y.x-x.radius,y:y.y-x.radius},{x:2*x.radius,y:2*x.radius}),t.fillStyle=t.strokeStyle,t.stroke()}}var pe=n(141);function ve(e){var t=Object(o.useState)(e.defaultColor),n=Object(i.a)(t,2),r=n[0],c=n[1],l=Object(o.useState)(!1),s=Object(i.a)(l,2),d=s[0],x=s[1],y=function(t){if(void 0!==t){var n=t.rgb.a;void 0===n&&(n=1);var a={r:t.rgb.r,g:t.rgb.g,b:t.rgb.b,a:n};c(a),document.getElementById(e.id).value="".concat(z(a)),e.onChange(a)}};return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{children:[d?Object(a.jsxs)("div",{style:{position:"fixed",zIndex:4},children:[Object(a.jsx)("div",{style:{position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"},onClick:function(){x(!1)}}),Object(a.jsx)("div",{ref:function(e){null!==e&&(e.style.transform="translateY(".concat(-e.clientHeight-8,"px)"))},children:Object(a.jsx)(pe.a,{color:{r:r.r,g:r.g,b:r.b,a:r.a},disableAlpha:!1,onChangeComplete:y,onChange:y})})]}):null,Object(a.jsx)(u,{id:e.id,title:e.title,text:z(r),type:"text",onClick:function(){x(!d)},onChange:function(t){t.target.oninput=null;var n=E(t.target.value);c(n),e.onChange(n)}})]})})}var Oe="UPDATE_FILL_COLOR";var ge="UPDATE_STROKE_COLOR";var me="UPDATE_STROKE_WIDTH";var Ce="UPDATE_TEXT";var Te="UPDATE_TEXT_COLOR";var ke="UPDATE_TEXT_SIZE";var we=function(e,t){var n=new ImageData(t.x,t.y);return n.data.fill(255),Object(l.a)(Object(l.a)({},e),{},{selectedObject:null,canvas:n})}({selectedObject:null,canvas:new ImageData(1,1)},{x:800,y:600}),Se={editor:we,imageHistory:{history:[we.canvas],currentHistoryPosition:0},currentTool:U.Rectangle,objectState:{fillColor:E("#FF00CCCC"),strokeColor:E("#FFCC0000"),strokeWidth:4,text:"",textSize:24,textColor:E("#FF424242")}};n(279);var Fe,Ee=function(){var e=Object(r.c)(),t=Object(r.d)((function(e){return e.currentTool}));return Object(a.jsxs)("div",{className:"ObjectParams",children:[Object(a.jsxs)("div",{className:"ParamsList",children:[Object(a.jsx)(ve,{id:"EditText-fill",title:"\u0426\u0432\u0435\u0442 \u0437\u0430\u043b\u0438\u0432\u043a\u0438",defaultColor:Se.objectState.fillColor,onChange:function(t){e(function(e){return{type:Oe,value:e}}(t))}}),Object(a.jsx)(ve,{id:"EditText-stroke",title:"\u0426\u0432\u0435\u0442 \u043a\u043e\u043d\u0442\u0443\u0440\u0430",defaultColor:Se.objectState.strokeColor,onChange:function(t){e({type:ge,value:t})}}),Object(a.jsx)(u,{id:"EditText-strokeWidth",title:"\u0422\u043e\u043b\u0449\u0438\u043d\u0430 \u043a\u043e\u043d\u0442\u0443\u0440\u0430",text:"".concat(Se.objectState.strokeWidth),min:"0",type:"number",onChange:function(t){var n=t.target.valueAsNumber;e({type:me,value:n})}})]}),Object(a.jsxs)("div",{className:"ParamsList",children:[t===U.Text&&Object(a.jsx)("textarea",{id:"EditText-text",title:"\u0422\u0435\u043a\u0441\u0442",defaultValue:Se.objectState.text,onChange:function(t){var n;e((n=t.target.value,{type:Ce,value:n}))}}),t===U.Text&&Object(a.jsx)(u,{id:"EditText-textSize",title:"\u0420\u0430\u0437\u043c\u0435\u0440 \u0442\u0435\u043a\u0441\u0442\u0430",text:"".concat(Se.objectState.textSize),min:"1",type:"number",onChange:function(t){var n;e((n=t.target.valueAsNumber,{type:ke,value:n}))}}),t===U.Text&&Object(a.jsx)(ve,{id:"EditText-textColor",title:"\u0426\u0432\u0435\u0442 \u0442\u0435\u043a\u0441\u0442\u0430",defaultColor:Se.objectState.textColor,onChange:function(t){e({type:Te,value:t})}})]})]})},ze=(n(280),n(325)),Ae=n(323),Me=n(324),Ie=n(322),Pe=n(142),Re=n(138),He=n.n(Re),Le=n(315),De=n(316),Ne=n(317),We=n(318),Be=n(319);!function(e){e[e.Grey=0]="Grey",e[e.Red=1]="Red",e[e.Green=2]="Green",e[e.Blue=3]="Blue",e[e.Brightness=4]="Brightness"}(Fe||(Fe={}));n(281);function _e(){return Object(a.jsxs)(B.a,{viewBox:"0 0 512 512",style:{width:"100%",height:"100%"},children:[Object(a.jsx)("path",{style:{fill:"#FFE17D"},d:"M214.71,306.106v197.626c0,6.139,6.46,10.132,11.951,7.386l61.5-30.75  c5.595-2.798,9.13-8.517,9.13-14.772v-159.49c0-5.702,1.967-11.229,5.568-15.649L473.4,81.157c3.602-4.42,5.568-9.947,5.568-15.649  V16.516C478.968,7.395,471.573,0,462.452,0H49.548c-9.122,0-16.516,7.395-16.516,16.516v48.991c0,5.702,1.967,11.229,5.568,15.649  l170.541,209.3C212.743,294.877,214.71,300.404,214.71,306.106z"}),Object(a.jsx)("path",{style:{fill:"#FFD164"},d:"M404.355,66.065H198.194c-4.561,0-8.258-3.697-8.258-8.258V0H49.548  c-9.122,0-16.516,7.395-16.516,16.516v48.991c0,5.702,1.967,11.229,5.568,15.649l170.541,209.3c3.602,4.42,5.569,9.948,5.569,15.65  v197.625c0,6.139,6.46,10.132,11.951,7.386l17.105-8.552V305.548c0-4.561,3.697-8.258,8.258-8.258h11.74  c5.474,0,10.593-2.712,13.667-7.242L415.346,86.804C421.33,77.985,415.013,66.065,404.355,66.065z"}),Object(a.jsx)("path",{style:{fill:"#FFC350"},d:"M123.502,66.065H33.08c0.126,5.502,2.037,10.817,5.52,15.091l170.541,209.3  c1.681,2.064,2.968,4.383,3.903,6.835h6.065c5.821,0,9.814-5.86,7.686-11.278L146.561,81.78  C142.836,72.299,133.688,66.065,123.502,66.065z"})]})}var Ue=Object(L.a)((function(e){return Object(j.a)({button:{backgroundColor:"#9d46ff",color:"#FFFFFF",fontWeight:600,fontFamily:"monospace",fontSize:"16px",margin:"8px",padding:"16px",width:"56px",height:"56px","&:hover":{backgroundColor:"#7200ca"}},paper:{marginTop:"4px",backgroundColor:"#8eacbbbe",color:"white"}})}));function Ve(e){var t=Ue(),n=c.a.useState(!1),r=Object(i.a)(n,2),o=r[0],s=r[1],u=c.a.useRef(null),d=function(e){u.current&&u.current.contains(e.target)||s(!1)};function x(e){"Tab"===e.key&&(e.preventDefault(),s(!1))}var y=c.a.useRef(o);return c.a.useEffect((function(){!0===y.current&&!1===o&&u.current.focus(),y.current=o}),[o]),Object(a.jsxs)("div",{className:"FiltersContainer",children:[Object(a.jsx)(O.a,{edge:"end",className:t.button,ref:u,onClick:function(){s((function(e){return!e}))},color:"primary",children:Object(a.jsx)(_e,{})}),Object(a.jsx)("div",{children:Object(a.jsx)(Le.a,{open:o,anchorEl:u.current,role:void 0,transition:!0,disablePortal:!0,children:function(n){var r=n.TransitionProps,i=n.placement;return Object(a.jsx)(De.a,Object(l.a)(Object(l.a)({},r),{},{style:{transformOrigin:"bottom"===i?"center top":"center bottom"},children:Object(a.jsx)(D.a,{className:t.paper,children:Object(a.jsx)(Ne.a,{onClickAway:d,children:Object(a.jsxs)(We.a,{autoFocusItem:o,id:"menu-list-grow",onKeyDown:x,children:[Object(a.jsx)(Be.a,{onClick:function(t){e.onSelect(Fe.Grey),d(t)},children:"\u0421\u0435\u0440\u044b\u0439"}),Object(a.jsx)(Be.a,{onClick:function(t){e.onSelect(Fe.Red),d(t)},children:"\u041a\u0440\u0430\u0441\u043d\u044b\u0439"}),Object(a.jsx)(Be.a,{onClick:function(t){e.onSelect(Fe.Green),d(t)},children:"\u0417\u0435\u043b\u0451\u043d\u044b\u0439"}),Object(a.jsx)(Be.a,{onClick:function(t){e.onSelect(Fe.Blue),d(t)},children:"\u0421\u0438\u043d\u0438\u0439"}),Object(a.jsx)(Be.a,{onClick:function(t){e.onSelect(Fe.Brightness),d(t)},children:"\u042f\u0440\u043a\u043e\u0441\u0442\u044c"})]})})})}))}})})]})}function Ge(e,t,n){for(var a=0;a<t.height;a++)for(var r=0;r<t.width;r++)for(var i=4*(a*t.width+r),o=0;o<4;o++)t.data[i+o]=e.data[i+o]*n[o]}var Ye=n(327),Ke=n(320),Xe=(n(282),Object(L.a)((function(e){return Object(j.a)({fab:{marginLeft:"24px"},slider:{width:"350px"}})})));function Je(e){var t=e.onApply,n=e.onChange,r=Xe(),c=Object(o.useState)(1),l=Object(i.a)(c,2),s=l[0],u=l[1];return Object(a.jsx)("div",{className:"BrightnessSlider-container",children:Object(a.jsxs)("div",{className:"BrightnessSlider-center",children:[Object(a.jsx)(Ye.a,{className:r.slider,defaultValue:1,"aria-labelledby":"discrete-slider-custom",step:.01,min:0,max:4,valueLabelDisplay:"auto",onChange:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,t){var a=t;u(a),n(a)}))}),Object(a.jsx)(Ke.a,{color:"primary","aria-label":"add",size:"small",className:r.fab,onClick:function(e){return t(s)},children:Object(a.jsx)(B.a,{children:Object(a.jsx)("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})})]})})}var Ze=Object(p.a)((function(e){return Object(j.a)({root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},title:{fontFamily:"cursive"}})}))((function(e){var t=e.children,n=e.classes,r=e.onClose,i=Object(s.a)(e,["children","classes","onClose"]);return Object(a.jsxs)(x.a,Object(l.a)(Object(l.a)({disableTypography:!0,className:n.root},i),{},{children:[Object(a.jsx)(v.a,{className:n.title,variant:"h6",children:t}),r?Object(a.jsx)(O.a,{"aria-label":"close",className:n.closeButton,onClick:r,children:Object(a.jsx)(b.a,{})}):null]}))})),qe=c.a.forwardRef((function(e,t){return Object(a.jsx)(g.a,Object(l.a)({direction:"up",ref:t},e))})),Qe=Object(p.a)((function(e){return{root:{padding:e.spacing(2)}}}))(y.a);function $e(e){return Object(a.jsx)("div",{children:Object(a.jsxs)(m.a,{TransitionComponent:qe,onClose:function(){return e.onClose()},"aria-labelledby":"customized-dialog-title",open:e.isOpen,children:[Object(a.jsx)(Ze,{id:"customized-dialog-title",onClose:function(){return e.onClose()},children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"}),Object(a.jsxs)(Qe,{dividers:!0,children:[Object(a.jsx)(C.a,{autoFocus:!0,onClick:function(){e.onSaveSize(),e.onClose()},color:"primary",children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0440\u0430\u0437\u043c\u0435\u0440 \u043f\u043e\u043b\u043e\u0442\u043d\u0430"}),Object(a.jsx)(C.a,{autoFocus:!0,onClick:function(){e.onChangeSize(),e.onClose()},color:"primary",children:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0440\u0430\u0437\u043c\u0435\u0440 \u043f\u043e\u043b\u043e\u0442\u043d\u0430"}),Object(a.jsx)(C.a,{autoFocus:!0,onClick:function(){return e.onClose()},color:"primary",children:"\u041e\u0442\u043c\u0435\u043d\u0430"})]})]})})}var et="UNDO_HISTORY";var tt=function(){return{type:et}},nt="REDO_HISTORY";var at=function(){return{type:nt}},rt="EDIT_CANVAS_SIZE";var it=function(e){return{type:rt,value:e}},ot="APPLY_FILTER";var ct=function(e){return{type:ot,value:e}},lt="CREATE_NEW_CANVAS";var st=function(e){return{type:lt,value:e}},ut=n(321),dt=n(70),xt=Object(Pe.a)({palette:{primary:{main:He.a.A700},secondary:{main:ut.a.A700,light:dt.a.A400}}}),yt=Object(L.a)((function(e){return Object(j.a)({root:{flexGrow:1,width:"100%"},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,textAlign:"start",fontFamily:"cursive"}})}));var ht=function(){var e=function(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1];return function(e,t){n||(a(!0),setTimeout((function(){t(),a(!1)}),e))}}(),t=Object(r.c)(),n=Object(r.d)((function(e){return e.editor}),r.b),c=Object(r.d)((function(e){return e.currentTool})),l=Object(o.useState)(!1),s=Object(i.a)(l,2),u=s[0],x=s[1],y=Object(o.useState)(null),h=Object(i.a)(y,2),f=h[0],b=h[1],j=yt(),p=Object(o.useState)(!1),g=Object(i.a)(p,2),m=g[0],C=g[1],T=Object(o.useState)(null),k=Object(i.a)(T,2),w=k[0],S=k[1];return Object(o.useEffect)((function(){var e=function(e){e.ctrlKey&&("KeyZ"===e.code?t(tt()):"KeyY"===e.code&&t(at()))};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}})),Object(a.jsx)("div",{className:"App",id:"App",children:Object(a.jsxs)(Ie.a,{theme:xt,children:[Object(a.jsx)(xe,{}),Object(a.jsxs)(ze.a,{position:"fixed",className:j.root,children:[Object(a.jsx)(Ae.a,{position:"static",style:{background:"#6200ea"},children:Object(a.jsxs)(Me.a,{children:[Object(a.jsx)(v.a,{variant:"h6",color:"inherit",className:j.title,children:"Reactive Photo Editor"}),Object(a.jsx)(F,{applyText:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",action:st({x:0,y:0}),children:Object(a.jsxs)(B.a,{children:[Object(a.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})]})}),Object(a.jsx)(F,{applyText:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c",action:it({x:0,y:0}),children:Object(a.jsxs)(B.a,{children:[Object(a.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})]})}),Object(a.jsx)(O.a,{"aria-label":"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c",color:"inherit",onClick:function(){!function(e){if(null!==document){var t=document.createElement("input");t.type="file",t.click(),null!==t&&(t.onchange=function(t){var n=t.target;if(null!=n.files){var a=n.files[0],r=URL.createObjectURL(a),i=new Image;i.onload=function(){URL.revokeObjectURL(i.src);var t=document.createElement("canvas");t.width=i.width,t.height=i.height;var n=t.getContext("2d");if(null!==n){n.drawImage(i,0,0);var a={type:d.Art,image:n.getImageData(0,0,i.width,i.height),position:{x:0,y:0},size:{x:i.width,y:i.height}};e(a)}t.remove()},i.src=r}})}}((function(e){S(e),C(!0)}))},children:Object(a.jsxs)(B.a,{children:[Object(a.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"})]})}),Object(a.jsx)(O.a,{"aria-label":"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",color:"inherit",edge:"end",onClick:function(){b(n),t(re(null)),function(){var e=document.getElementById("canvas");null!=e&&e.toBlob((function(e){if(null!=e){var t=window.URL.createObjectURL(new Blob([e])),n=document.createElement("a");n.href=t,n.setAttribute("download","image.png"),document.body.appendChild(n),n.click(),n.remove()}}),"image/png",.9)}(),t(de(n))},children:Object(a.jsxs)(B.a,{children:[Object(a.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"})]})}),m&&Object(a.jsx)($e,{isOpen:m,onSaveSize:function(){var e=null!==n.selectedObject,a=n.canvas;t(re(w)),e&&t(ne(a))},onChangeSize:function(){var e=null!==n.selectedObject,a=n.canvas;if(null===w)throw new Error;t(it(w.size)),t(re(w)),e&&t(ne(a))},onClose:function(){C(!1),S(null)}})]})}),Object(a.jsx)(G,{onSelected:function(){if(u){if(null===f)throw new Error;t(de(f)),x(!1)}}}),Object(a.jsx)(Ve,{onSelect:function(e){var a=n;if(null!=n.selectedObject){var r=le(n,null);t(ne(r.canvas)),t(de(r)),a=r}e!==Fe.Brightness?t(ct(e)):(b(a),x(!0))}})]}),c!==U.Area&&Object(a.jsx)(Ee,{}),u&&Object(a.jsx)(Je,{onChange:function(n){null!==f&&e(16,(function(){var e=function(e,t){for(var n=new ImageData(e.canvas.width,e.canvas.height),a=e.canvas,r=0;r<n.height;r++)for(var i=0;i<n.width;i++){for(var o=4*(r*n.width+i),c=0;c<3;c++)n.data[o+c]=a.data[o+c]*t;n.data[o+3]=a.data[o+3]}return{selectedObject:null,canvas:n}}(f,n);t(de(e))}))},onApply:function(e){if(x(!1),1!==e){var a=le(n,null);t(ne(a.canvas)),t(de(a))}}})]})})},ft=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,331)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),i(e),o(e)}))},bt=n(139);function jt(e,t){for(var n={history:e.history.flatMap((function(e){return ie(e)})),currentHistoryPosition:e.currentHistoryPosition};n.currentHistoryPosition<n.history.length-1;)n.history.pop();return n.currentHistoryPosition===n.history.length-1&&n.currentHistoryPosition++,n.history.push(ie(t)),n}var pt=function(e,t){var n=t.value;switch(t.type){case lt:var a=new ImageData(t.value.x,t.value.y);return a.data.fill(255),a;case rt:var r=new ImageData(n.x,n.y);r.data.fill(255);for(var i=Math.min(n.x,e.width),o=Math.min(n.y,e.height),c=0;c<o;c++)for(var l=0;l<i;l++)for(var s=4*(c*n.x+l),u=4*(c*e.width+l),d=0;d<4;d++)r.data[s+d]=e.data[u+d];return r;default:return ie(e)}},vt=function(e,t){return void 0===e?e:(t.type,{canvas:pt(e.canvas,t),selectedObject:e.selectedObject})},Ot=function(e,t){if(void 0===e)throw new Error;switch(t.type){case Oe:return Object(l.a)(Object(l.a)({},e),{},{fillColor:t.value});case ge:return Object(l.a)(Object(l.a)({},e),{},{strokeColor:t.value});case me:return Object(l.a)(Object(l.a)({},e),{},{strokeWidth:t.value});case Ce:return Object(l.a)(Object(l.a)({},e),{},{text:t.value});case ke:return Object(l.a)(Object(l.a)({},e),{},{textSize:t.value});case Te:return Object(l.a)(Object(l.a)({},e),{},{textColor:t.value});default:return e}},gt=function(e,t){if(void 0===e)throw new Error;var n=e.editor,a={canvas:n.canvas,selectedObject:n.selectedObject},r=e.imageHistory;switch(t.type){case ue:return Object(l.a)(Object(l.a)({},e),{},{editor:t.value});case et:return function(e){var t={selectedObject:e.editor.selectedObject,canvas:e.editor.canvas},n=e.imageHistory;if(n.history.length>0&&(n.currentHistoryPosition>0||null!=t.selectedObject)){if(null==t.selectedObject)n.currentHistoryPosition--;else{if(n=jt(n,ie((t=le(t,null)).canvas)),void 0===e)throw new Error;n.currentHistoryPosition--}t.canvas=ie(n.history[n.currentHistoryPosition])}return Object(l.a)(Object(l.a)({},e),{},{imageHistory:n,editor:t})}(e);case nt:return function(e){var t={selectedObject:e.editor.selectedObject,canvas:e.editor.canvas},n=e.imageHistory;return n.history.length>0&&n.currentHistoryPosition<n.history.length-1&&(n.currentHistoryPosition++,t.canvas=ie(n.history[n.currentHistoryPosition])),Object(l.a)(Object(l.a)({},e),{},{editor:t,imageHistory:n})}(e);case te:return Object(l.a)(Object(l.a)({},e),{},{imageHistory:jt(r,t.value)});case _:return Object(l.a)(Object(l.a)({},e),{},{currentTool:t.value});case ot:var i;return jt(r,a.canvas),i=jt(r,(a=function(e,t){var n=new ImageData(e.canvas.width,e.canvas.height);switch(t){case Fe.Red:Ge(e.canvas,n,[1,0,0,1]);break;case Fe.Green:Ge(e.canvas,n,[0,1,0,1]);break;case Fe.Blue:Ge(e.canvas,n,[0,0,1,1]);break;case Fe.Grey:!function(e,t){for(var n=0;n<t.height;n++)for(var a=0;a<t.width;a++){for(var r=4*(n*t.width+a),i=(e.data[r]+e.data[r+1]+e.data[r+2])/3,o=0;o<3;o++)t.data[r+o]=i;t.data[r+3]=e.data[r+3]}}(e.canvas,n)}return Object(l.a)(Object(l.a)({},e),{},{canvas:n})}(a,t.value)).canvas),Object(l.a)(Object(l.a)({},e),{},{imageHistory:i,editor:a});case q:return Object(l.a)(Object(l.a)({},e),{},{editor:ce(n,t.value)});case $:return Object(l.a)(Object(l.a)({},e),{},{editor:oe(n)});case ae:return a=le(n,t.value),Object(l.a)(Object(l.a)({},e),{},{editor:a});case J:return Object(l.a)(Object(l.a)({},e),{},{editor:se(n)});default:var o=vt(e.editor,t);if(void 0===o)throw new Error;var c=Ot(e.objectState,t);if(void 0===c)throw new Error;return{editor:o,imageHistory:e.imageHistory,currentTool:e.currentTool,objectState:c}}},mt=Object(bt.a)(gt,Se),Ct=n(11),Tt=n.n(Ct);function kt(){Tt.a.render(Object(a.jsx)(r.a,{store:mt,children:Object(a.jsx)(ht,{})}),document.getElementById("root"))}kt(),ft()}},[[283,1,2]]]);
//# sourceMappingURL=main.68eec4ba.chunk.js.map