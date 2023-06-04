/*!
 Buttons for DataTables 1.1.2
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(p){return e(p,window,document)}):"object"===typeof exports?module.exports=function(p,o){p||(p=window);if(!o||!o.fn.dataTable)o=require("datatables.net")(p,o).$;return e(o,p,p.document)}:e(jQuery,window,document)})(function(e,p,o,n){var j=e.fn.dataTable,t=0,u=0,l=j.ext.buttons,m=function(a,b){!0===b&&(b={});e.isArray(b)&&(b={buttons:b});this.c=e.extend(!0,{},m.defaults,b);b.buttons&&(this.c.buttons=b.buttons);
    this.s={dt:new j.Api(a),buttons:[],subButtons:[],listenKeys:"",namespace:"dtb"+t++};this.dom={container:e("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)};this._constructor()};e.extend(m.prototype,{action:function(a,b){var c=this._indexToButton(a).conf;if(b===n)return c.action;c.action=b;return this},active:function(a,b){var c=this._indexToButton(a),d=this.c.dom.button.active;if(b===n)return c.node.hasClass(d);c.node.toggleClass(d,b===n?!0:b);return this},add:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         b){if("string"===typeof a&&-1!==a.indexOf("-")){var c=a.split("-");this.c.buttons[1*c[0]].buttons.splice(1*c[1],0,b)}else this.c.buttons.splice(1*a,0,b);this.dom.container.empty();this._buildButtons(this.c.buttons);return this},container:function(){return this.dom.container},disable:function(a){this._indexToButton(a).node.addClass(this.c.dom.button.disabled);return this},destroy:function(){e("body").off("keyup."+this.s.namespace);var a=this.s.buttons,b=this.s.subButtons,c,d,f;c=0;for(a=a.length;c<
    a;c++){this.removePrep(c);d=0;for(f=b[c].length;d<f;d++)this.removePrep(c+"-"+d)}this.removeCommit();this.dom.container.remove();b=this.s.dt.settings()[0];c=0;for(a=b.length;c<a;c++)if(b.inst===this){b.splice(c,1);break}return this},enable:function(a,b){if(!1===b)return this.disable(a);this._indexToButton(a).node.removeClass(this.c.dom.button.disabled);return this},name:function(){return this.c.name},node:function(a){return this._indexToButton(a).node},removeCommit:function(){var a=this.s.buttons,
        b=this.s.subButtons,c,d;for(c=a.length-1;0<=c;c--)null===a[c]&&(a.splice(c,1),b.splice(c,1),this.c.buttons.splice(c,1));c=0;for(a=b.length;c<a;c++)for(d=b[c].length-1;0<=d;d--)null===b[c][d]&&(b[c].splice(d,1),this.c.buttons[c].buttons.splice(d,1));return this},removePrep:function(a){var b,c=this.s.dt;if("number"===typeof a||-1===a.indexOf("-"))b=this.s.buttons[1*a],b.conf.destroy&&b.conf.destroy.call(c.button(a),c,b,b.conf),b.node.remove(),this._removeKey(b.conf),this.s.buttons[1*a]=null;else{var d=
        a.split("-");b=this.s.subButtons[1*d[0]][1*d[1]];b.conf.destroy&&b.conf.destroy.call(c.button(a),c,b,b.conf);b.node.remove();this._removeKey(b.conf);this.s.subButtons[1*d[0]][1*d[1]]=null}return this},text:function(a,b){var c=this._indexToButton(a),d=this.c.dom.collection.buttonLiner,d="string"===typeof a&&-1!==a.indexOf("-")&&d&&d.tag?d.tag:this.c.dom.buttonLiner.tag,e=this.s.dt,h=function(a){return"function"===typeof a?a(e,c.node,c.conf):a};if(b===n)return h(c.conf.text);c.conf.text=b;d?c.node.children(d).html(h(b)):
        c.node.html(h(b));return this},toIndex:function(a){var b,c,d,e;d=this.s.buttons;var h=this.s.subButtons;b=0;for(c=d.length;b<c;b++)if(d[b].node[0]===a)return b+"";b=0;for(c=h.length;b<c;b++){d=0;for(e=h[b].length;d<e;d++)if(h[b][d].node[0]===a)return b+"-"+d}},_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0];c._buttons||(c._buttons=[]);c._buttons.push({inst:this,name:this.c.name});this._buildButtons(this.c.buttons);b.on("destroy",function(){a.destroy()});e("body").on("keyup."+this.s.namespace,
        function(b){if(!o.activeElement||o.activeElement===o.body){var c=String.fromCharCode(b.keyCode).toLowerCase();a.s.listenKeys.toLowerCase().indexOf(c)!==-1&&a._keypress(c,b)}})},_addKey:function(a){a.key&&(this.s.listenKeys+=e.isPlainObject(a.key)?a.key.key:a.key)},_buildButtons:function(a,b,c){var d=this.s.dt,f=0;b||(b=this.dom.container,this.s.buttons=[],this.s.subButtons=[]);for(var h=0,i=a.length;h<i;h++){var k=this._resolveExtends(a[h]);if(k)if(e.isArray(k))this._buildButtons(k,b,c);else{var g=
        this._buildButton(k,c!==n?!0:!1);if(g){var r=g.node;b.append(g.inserter);c===n?(this.s.buttons.push({node:r,conf:k,inserter:g.inserter}),this.s.subButtons.push([])):this.s.subButtons[c].push({node:r,conf:k,inserter:g.inserter});k.buttons&&(g=this.c.dom.collection,k._collection=e("<"+g.tag+"/>").addClass(g.className),this._buildButtons(k.buttons,k._collection,f));k.init&&k.init.call(d.button(r),d,r,k);f++}}}},_buildButton:function(a,b){var c=this.c.dom.button,d=this.c.dom.buttonLiner,f=this.c.dom.collection,
        h=this.s.dt,i=function(b){return"function"===typeof b?b(h,g,a):b};b&&f.button&&(c=f.button);b&&f.buttonLiner&&(d=f.buttonLiner);if(a.available&&!a.available(h,a))return!1;var k=function(a,b,c,d){d.action.call(b.button(c),a,b,c,d);e(b.table().node()).triggerHandler("buttons-action.dt",[b.button(c),b,c,d])},g=e("<"+c.tag+"/>").addClass(c.className).attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",this.s.dt.table().node().id).on("click.dtb",function(b){b.preventDefault();!g.hasClass(c.disabled)&&
    a.action&&k(b,h,g,a);g.blur()}).on("keyup.dtb",function(b){b.keyCode===13&&!g.hasClass(c.disabled)&&a.action&&k(b,h,g,a)});d.tag?g.append(e("<"+d.tag+"/>").html(i(a.text)).addClass(d.className)):g.html(i(a.text));!1===a.enabled&&g.addClass(c.disabled);a.className&&g.addClass(a.className);a.titleAttr&&g.attr("title",a.titleAttr);a.namespace||(a.namespace=".dt-button-"+u++);d=(d=this.c.dom.buttonContainer)&&d.tag?e("<"+d.tag+"/>").addClass(d.className).append(g):g;this._addKey(a);return{node:g,inserter:d}},
    _indexToButton:function(a){if("number"===typeof a||-1===a.indexOf("-"))return this.s.buttons[1*a];a=a.split("-");return this.s.subButtons[1*a[0]][1*a[1]]},_keypress:function(a,b){var c,d,f,h;f=this.s.buttons;var i=this.s.subButtons,k=function(c,d){if(c.key)if(c.key===a)d.click();else if(e.isPlainObject(c.key)&&c.key.key===a&&(!c.key.shiftKey||b.shiftKey))if(!c.key.altKey||b.altKey)if(!c.key.ctrlKey||b.ctrlKey)(!c.key.metaKey||b.metaKey)&&d.click()};c=0;for(d=f.length;c<d;c++)k(f[c].conf,f[c].node);
        c=0;for(d=i.length;c<d;c++){f=0;for(h=i[c].length;f<h;f++)k(i[c][f].conf,i[c][f].node)}},_removeKey:function(a){if(a.key){var b=e.isPlainObject(a.key)?a.key.key:a.key,a=this.s.listenKeys.split(""),b=e.inArray(b,a);a.splice(b,1);this.s.listenKeys=a.join("")}},_resolveExtends:function(a){for(var b=this.s.dt,c,d,f=function(c){for(var d=0;!e.isPlainObject(c)&&!e.isArray(c);){if(c===n)return;if("function"===typeof c){if(c=c(b,a),!c)return!1}else if("string"===typeof c){if(!l[c])throw"Unknown button type: "+
    c;c=l[c]}d++;if(30<d)throw"Buttons: Too many iterations";}return e.isArray(c)?c:e.extend({},c)},a=f(a);a&&a.extend;){if(!l[a.extend])throw"Cannot extend unknown button type: "+a.extend;var h=f(l[a.extend]);if(e.isArray(h))return h;if(!h)return!1;c=h.className;a=e.extend({},h,a);c&&a.className!==c&&(a.className=c+" "+a.className);var i=a.postfixButtons;if(i){a.buttons||(a.buttons=[]);c=0;for(d=i.length;c<d;c++)a.buttons.push(i[c]);a.postfixButtons=null}if(i=a.prefixButtons){a.buttons||(a.buttons=[]);
        c=0;for(d=i.length;c<d;c++)a.buttons.splice(c,0,i[c]);a.prefixButtons=null}a.extend=h.extend}return a}});m.background=function(a,b,c){c===n&&(c=400);a?e("<div/>").addClass(b).css("display","none").appendTo("body").fadeIn(c):e("body > div."+b).fadeOut(c,function(){e(this).remove()})};m.instanceSelector=function(a,b){if(!a)return e.map(b,function(a){return a.inst});var c=[],d=e.map(b,function(a){return a.name}),f=function(a){if(e.isArray(a))for(var i=0,k=a.length;i<k;i++)f(a[i]);else"string"===typeof a?
    -1!==a.indexOf(",")?f(a.split(",")):(a=e.inArray(e.trim(a),d),-1!==a&&c.push(b[a].inst)):"number"===typeof a&&c.push(b[a].inst)};f(a);return c};m.buttonSelector=function(a,b){for(var c=[],d=function(a,b){var g,f,h=[];e.each(b.s.buttons,function(a,b){null!==b&&h.push({node:b.node[0],name:b.conf.name})});e.each(b.s.subButtons,function(a,b){e.each(b,function(a,b){null!==b&&h.push({node:b.node[0],name:b.conf.name})})});g=e.map(h,function(a){return a.node});if(e.isArray(a)||a instanceof e){g=0;for(f=a.length;g<
f;g++)d(a[g],b)}else if(null===a||a===n||"*"===a){g=0;for(f=h.length;g<f;g++)c.push({inst:b,idx:b.toIndex(h[g].node)})}else if("number"===typeof a)c.push({inst:b,idx:a});else if("string"===typeof a)if(-1!==a.indexOf(",")){var j=a.split(",");g=0;for(f=j.length;g<f;g++)d(e.trim(j[g]),b)}else if(a.match(/^\d+(\-\d+)?$/))c.push({inst:b,idx:a});else if(-1!==a.indexOf(":name")){j=a.replace(":name","");g=0;for(f=h.length;g<f;g++)h[g].name===j&&c.push({inst:b,idx:b.toIndex(h[g].node)})}else e(g).filter(a).each(function(){c.push({inst:b,
    idx:b.toIndex(this)})});else"object"===typeof a&&a.nodeName&&(f=e.inArray(a,g),-1!==f&&c.push({inst:b,idx:b.toIndex(g[f])}))},f=0,h=a.length;f<h;f++)d(b,a[f]);return c};m.defaults={buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:"dt-button-collection"},button:{tag:"a",className:"dt-button",active:"active",disabled:"disabled"},buttonLiner:{tag:"span",className:""}}};m.version="1.1.2";e.extend(l,{collection:{text:function(a){return a.i18n("buttons.collection",
            "Collection")},className:"buttons-collection",action:function(a,b,c,d){var a=c.offset(),f=e(b.table().container()),h=!1;e("div.dt-button-background").length&&(h=e("div.dt-button-collection").offset(),e(o).trigger("click.dtb-collection"));d._collection.addClass(d.collectionLayout).css("display","none").appendTo("body").fadeIn(d.fade);var i=d._collection.css("position");h&&"absolute"===i?d._collection.css({top:h.top+5,left:h.left+5}):"absolute"===i?(d._collection.css({top:a.top+c.outerHeight(),left:a.left}),
            c=a.left+d._collection.outerWidth(),f=f.offset().left+f.width(),c>f&&d._collection.css("left",a.left-(c-f))):(a=d._collection.height()/2,a>e(p).height()/2&&(a=e(p).height()/2),d._collection.css("marginTop",-1*a));d.background&&m.background(!0,d.backgroundClassName,d.fade);setTimeout(function(){e("div.dt-button-background").on("click.dtb-collection",function(){});e("body").on("click.dtb-collection",function(a){if(!e(a.target).parents().andSelf().filter(d._collection).length){d._collection.fadeOut(d.fade,
            function(){d._collection.detach()});e("div.dt-button-background").off("click.dtb-collection");m.background(false,d.backgroundClassName,d.fade);e("body").off("click.dtb-collection");b.off("buttons-action.b-internal")}})},10);if(d.autoClose)b.on("buttons-action.b-internal",function(){e("div.dt-button-background").click()})},background:!0,collectionLayout:"",backgroundClassName:"dt-button-background",autoClose:!1,fade:400},copy:function(a,b){if(l.copyHtml5)return"copyHtml5";if(l.copyFlash&&l.copyFlash.available(a,
        b))return"copyFlash"},csv:function(a,b){if(l.csvHtml5&&l.csvHtml5.available(a,b))return"csvHtml5";if(l.csvFlash&&l.csvFlash.available(a,b))return"csvFlash"},excel:function(a,b){if(l.excelHtml5&&l.excelHtml5.available(a,b))return"excelHtml5";if(l.excelFlash&&l.excelFlash.available(a,b))return"excelFlash"},pdf:function(a,b){if(l.pdfHtml5&&l.pdfHtml5.available(a,b))return"pdfHtml5";if(l.pdfFlash&&l.pdfFlash.available(a,b))return"pdfFlash"},pageLength:function(a){var a=a.settings()[0].aLengthMenu,b=e.isArray(a[0])?
        a[0]:a,c=e.isArray(a[0])?a[1]:a,d=function(a){return a.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},a.page.len())};return{extend:"collection",text:d,className:"buttons-page-length",autoClose:!0,buttons:e.map(b,function(a,b){return{text:c[b],action:function(b,c){c.page.len(a).draw()},init:function(b,c,d){var e=this,c=function(){e.active(b.page.len()===a)};b.on("length.dt"+d.namespace,c);c()},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}),init:function(a,b,c){var e=
            this;a.on("length.dt"+c.namespace,function(){e.text(d(a))})},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}});j.Api.register("buttons()",function(a,b){b===n&&(b=a,a=n);return this.iterator(!0,"table",function(c){if(c._buttons)return m.buttonSelector(m.instanceSelector(a,c._buttons),b)},!0)});j.Api.register("button()",function(a,b){var c=this.buttons(a,b);1<c.length&&c.splice(1,c.length);return c});j.Api.registerPlural("buttons().active()","button().active()",function(a){return a===n?this.map(function(a){return a.inst.active(a.idx)}):
    this.each(function(b){b.inst.active(b.idx,a)})});j.Api.registerPlural("buttons().action()","button().action()",function(a){return a===n?this.map(function(a){return a.inst.action(a.idx)}):this.each(function(b){b.inst.action(b.idx,a)})});j.Api.register(["buttons().enable()","button().enable()"],function(a){return this.each(function(b){b.inst.enable(b.idx,a)})});j.Api.register(["buttons().disable()","button().disable()"],function(){return this.each(function(a){a.inst.disable(a.idx)})});j.Api.registerPlural("buttons().nodes()",
    "button().node()",function(){var a=e();e(this.each(function(b){a=a.add(b.inst.node(b.idx))}));return a});j.Api.registerPlural("buttons().text()","button().text()",function(a){return a===n?this.map(function(a){return a.inst.text(a.idx)}):this.each(function(b){b.inst.text(b.idx,a)})});j.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(a){a.inst.node(a.idx).trigger("click")})});j.Api.registerPlural("buttons().containers()","buttons().container()",function(){var a=
    e();e(this.each(function(b){a=a.add(b.inst.container())}));return a});j.Api.register("button().add()",function(a,b){1===this.length&&this[0].inst.add(a,b);return this.button(a)});j.Api.register("buttons().destroy()",function(){this.pluck("inst").unique().each(function(a){a.destroy()});return this});j.Api.registerPlural("buttons().remove()","buttons().remove()",function(){this.each(function(a){a.inst.removePrep(a.idx)});this.pluck("inst").unique().each(function(a){a.removeCommit()});return this});
    var q;j.Api.register("buttons.info()",function(a,b,c){var d=this;if(!1===a)return e("#datatables_buttons_info").fadeOut(function(){e(this).remove()}),clearTimeout(q),q=null,this;q&&clearTimeout(q);e("#datatables_buttons_info").length&&e("#datatables_buttons_info").remove();e('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a?"<h2>"+a+"</h2>":"").append(e("<div/>")["string"===typeof b?"html":"append"](b)).css("display","none").appendTo("body").fadeIn();c!==n&&0!==c&&(q=setTimeout(function(){d.buttons.info(!1)},
        c));return this});j.Api.register("buttons.exportData()",function(a){if(this.context.length){for(var b=new j.Api(this.context[0]),c=e.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(a){return d(a)},footer:function(a){return d(a)},body:function(a){return d(a)}}},a),d=function(a){if("string"!==typeof a)return a;c.stripHtml&&(a=a.replace(/<.*?>/g,""));c.trim&&(a=a.replace(/^\s+|\s+$/g,
        ""));c.stripNewlines&&(a=a.replace(/\n/g," "));c.decodeEntities&&(s.innerHTML=a,a=s.value);return a},a=b.columns(c.columns).indexes().map(function(a){return c.format.header(b.column(a).header().innerHTML,a)}).toArray(),f=b.table().footer()?b.columns(c.columns).indexes().map(function(a){var d=b.column(a).footer();return c.format.footer(d?d.innerHTML:"",a)}).toArray():null,h=b.rows(c.rows,c.modifier).indexes().toArray(),h=b.cells(h,c.columns).render(c.orthogonal).toArray(),i=a.length,k=0<i?h.length/
        i:0,g=Array(k),l=0,m=0;m<k;m++){for(var n=Array(i),o=0;o<i;o++)n[o]=c.format.body(h[l],o,m),l++;g[m]=n}return{header:a,footer:f,body:g}}});var s=e("<textarea/>")[0];e.fn.dataTable.Buttons=m;e.fn.DataTable.Buttons=m;e(o).on("init.dt plugin-init.dt",function(a,b){if("dt"===a.namespace){var c=b.oInit.buttons||j.defaults.buttons;c&&!b._buttons&&(new m(b,c)).container()}});j.ext.feature.push({fnInit:function(a){var a=new j.Api(a),b=a.init().buttons||j.defaults.buttons;return(new m(a,b)).container()},cFeature:"B"});
    return m});
