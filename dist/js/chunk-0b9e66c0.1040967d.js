(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b9e66c0"],{"7db0":function(t,e,c){"use strict";var n=c("23e7"),a=c("b727").find,o=c("44d2"),r="find",u=!0;r in[]&&Array(1)[r]((function(){u=!1})),n({target:"Array",proto:!0,forced:u},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(r)},ce33:function(t,e,c){"use strict";c("ddb6")},ddb6:function(t,e,c){},f922:function(t,e,c){"use strict";c.r(e);c("a4d3"),c("e01a");var n=c("7a23"),a=Object(n["L"])("data-v-7517433d");Object(n["v"])("data-v-7517433d");var o={key:0},r=Object(n["i"])("h2",null,"Interested?Reach out now!",-1),u=Object(n["h"])("Contact");Object(n["t"])();var i=a((function(t,e,c,i,s,d){var b=Object(n["A"])("base-card"),l=Object(n["A"])("base-button"),f=Object(n["A"])("router-view"),h=Object(n["A"])("base-badge");return s.coach?(Object(n["s"])(),Object(n["f"])("div",o,[Object(n["i"])("section",null,[Object(n["i"])(b,null,{default:a((function(){return[Object(n["i"])("h2",null,Object(n["D"])(d.fullname),1),Object(n["i"])("h3",null,"$"+Object(n["D"])(s.coach.hourlyRate)+"/hour",1)]})),_:1})]),Object(n["i"])("section",null,[Object(n["i"])(b,null,{default:a((function(){return[Object(n["i"])("header",null,[r,Object(n["i"])(l,{to:d.contactLink},{default:a((function(){return[u]})),_:1},8,["to"])]),Object(n["i"])(f,null,{default:a((function(t){var e=t.Component;return[Object(n["i"])(n["c"],{name:"fadeIn"},{default:a((function(){return[(Object(n["s"])(),Object(n["f"])(Object(n["B"])(e)))]})),_:2},1024)]})),_:1})]})),_:1})]),Object(n["i"])("section",null,[Object(n["i"])(b,null,{default:a((function(){return[(Object(n["s"])(!0),Object(n["f"])(n["a"],null,Object(n["y"])(s.coach.areas,(function(t){return Object(n["s"])(),Object(n["f"])(h,{key:t,type:t,title:t},null,8,["type","title"])})),128)),Object(n["i"])("p",null,Object(n["D"])(s.coach.description),1)]})),_:1})])])):Object(n["g"])("",!0)})),s=c("1da1"),d=(c("96cf"),c("99af"),c("7db0"),{props:["id"],data:function(){return{coach:null}},computed:{contactLink:function(){return"/coaches/".concat(this.id,"/contact")},fullname:function(){return"".concat(this.coach.firstName," ").concat(this.coach.lastName)},coaches:function(){return this.$store.getters["coaches/coaches"]}},methods:{loadCoach:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.coaches.length>0)){e.next=4;break}t.coach=t.coaches.find((function(e){return e.id==t.id})),e.next=7;break;case 4:return e.next=6,t.$store.dispatch("coaches/loadCoach",t.id);case 6:t.coach=t.$store.getters["coaches/currentCoach"];case 7:case"end":return e.stop()}}),e)})))()}},created:function(){this.loadCoach()}});c("ce33");d.render=i,d.__scopeId="data-v-7517433d";e["default"]=d}}]);
//# sourceMappingURL=chunk-0b9e66c0.1040967d.js.map