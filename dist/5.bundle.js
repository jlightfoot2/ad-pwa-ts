webpackJsonp([5],{"./src/components/PageWithLinks.tsx":function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),i=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++){t=arguments[r];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var a=r("./node_modules/react/react.js"),s=r("./src/components/BasicPage.tsx"),l=r("./node_modules/react-router/es/index.js");t.fieldRowStyle={marginBottom:"15px"};var o=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return n(r,e),r.prototype.render=function(){return a.createElement(s.default,i({},this.props),a.createElement("h2",null,"Choose a Related Resource"),a.createElement("ul",null,a.createElement("li",{style:t.fieldRowStyle},a.createElement(l.Link,{to:"main/library"},"Library")),a.createElement("li",{style:t.fieldRowStyle},a.createElement("a",{href:"http://afterdeployment.dcoe.mil/links-and-books/Families and Friendships",target:"_blank"},"Links and Books")),a.createElement("li",{style:t.fieldRowStyle},a.createElement("a",{href:"http://afterdeployment.dcoe.mil/forums/peer-2-peer",target:"_blank"},"Forum")),a.createElement("li",{style:t.fieldRowStyle},a.createElement("a",{href:"http://afterdeployment.dcoe.mil/fact/families-and-friendships",target:"_blank"},"Facts")),a.createElement("li",{style:t.fieldRowStyle},a.createElement("a",{href:"http://afterdeployment.dcoe.mil/article/families-and-friendships",target:"_blank"},"Articles")),a.createElement("li",{style:t.fieldRowStyle},a.createElement("a",{href:"http://afterdeployment.dcoe.mil/tip/families-and-friendships",target:"_blank"},"Tips"))))},r}(a.Component);t.default=o},"./src/containers/Resources.tsx":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("./src/components/PageWithLinks.tsx"),i=r("./src/res/data/page.ts"),a=r("./node_modules/react-redux/es/index.js");t.resourcesLinks=[{title:"Library",link:"",attributes:{}},{title:"Links and Books",link:"",attributes:{}},{title:"Forum",link:"",attributes:{}},{title:"Facts",link:"",attributes:{}},{title:"Articles",link:"",attributes:{}},{title:"Tips",link:"",attributes:{}}];var s=function(e,t){return{title:"Resources",page:{title:i.resourcesPage.title,subtitle:"Family & Friends Module",content:i.resourcesPage.content},content:i.resourcesPage.content,image:i.resourcesPage.image,actions:[]}},l=function(e){return{}};t.default=a.connect(s,l)(n.default)}});