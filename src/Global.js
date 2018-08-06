let MyPlugin = {};

MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
        console.log("添加全局方法或属性");
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
    })
    // filter
    Vue.filter('time', function(value) {
        return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    })

    // 3. 注入组件
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    })

    // 4. 添加实例方法
    // 简要判断游览器类型
    Vue.prototype.$MyBrowser = function () {
        //取得浏览器的userAgent字符串
        let userAgent = navigator.userAgent;

        let is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
        //检测是否是谷歌内核(可排除360及谷歌以外的浏览器)
        function isChrome(){
            let ua = navigator.userAgent.toLowerCase();

            return ua.indexOf("chrome") > 1;
        }
        //测试mime
        function _mime(option, value) {
            let mimeTypes = navigator.mimeTypes;
            for (let mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        }

        //判断是否Opera浏览器
        if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
            return "Opera"
        }

        //判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF"
        }

        //判断是否Chrome浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            if (isChrome() && is360) {
                return "360"
            } else {
                return "Chrome"
            }
        }

        //判断是否Safari浏览器
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari"
        }

        //判断是否IE浏览器(10以下)
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
            return "IE";
        }

        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return "IE";
        }

        //判断是否Edge浏览器
        if (userAgent.indexOf("Trident") > -1) {
            return "Edge";
        }
    }

    // 下载文件

    Vue.prototype.$Opera360Download = function (src) {
        let $a = document.createElement('a');
        $a.setAttribute("href", src);
        $a.setAttribute("download", "");


        let evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, true, false, true, false, 0, null);
        $a.dispatchEvent(evObj);
    }

    Vue.prototype.$ChromeFfIedownload = function (data, strFileName, strMimeType) {
        let self = window, // this script is only for browsers anyway...
            u = "application/octet-stream", // this default mime also triggers iframe downloads
            m = strMimeType || u,
            x = data,
            url = !strFileName && !strMimeType && x,
            D = document,
            a = D.createElement("a"),
            z = function(a){return String(a);},
            B = (self.Blob || self.MozBlob || self.WebKitBlob || z),
            fn = strFileName || "download",
            blob,
            fr,
            ajax;
        B= B.call ? B.bind(self) : Blob ;


        if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
            x=[x, m];
            m=x[0];
            x=x[1];
        }


        if(url && url.length< 2048){
            fn = url.split("/").pop().split("?")[0];
            a.href = url; // assign href prop to temp anchor
            if(a.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
                let ajax=new XMLHttpRequest();
                ajax.open( "GET", url, true);
                ajax.responseType = 'blob';
                ajax.onload= function(e){
                    Vue.prototype.$ChromeFfIedownload(e.target.response, fn, u);
                };
                ajax.send();
                return ajax;
            } // end if valid url?
        } // end if url?



        //go ahead and download dataURLs right away
        if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(x)){
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(d2b(x), fn) :
                saver(x) ; // everyone else can save dataURLs un-processed
        }//end if dataURL passed?

        blob = x instanceof B ?
            x :
            new B([x], {type: m}) ;


        function d2b(u) {
            let p= u.split(/[:;,]/),
                t= p[1],
                dec= p[2] == "base64" ? atob : decodeURIComponent,
                bin= dec(p.pop()),
                mx= bin.length,
                i= 0,
                uia= new Uint8Array(mx);

            for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

            return new B([uia], {type: t});
        }

        function saver(url, winMode){

            if ('download' in a) { //html5 A[download]
                a.href = url;
                a.setAttribute("download", fn);
                a.className = "download-js-link";
                // a.innerHTML = "downloading...";
                a.style.position = 'absolute';
                D.body.appendChild(a);
                setTimeout(function() {
                    a.click();
                    D.body.removeChild(a);
                    if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
                }, 66);
                return true;
            }

            // handle non-a[download] safari as best we can:
            if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
                url=url.replace(/^data:([\w\/\-\+]+)/, u);
                if(!window.open(url)){ // popup blocked, offer direct download:
                    if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
                }
                return true;
            }

            //do iframe dataURL download (old ch+FF):
            let f = D.createElement("iframe");
            D.body.appendChild(f);

            if(!winMode){ // force a mime that will download:
                url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
            }
            f.src=url;
            setTimeout(function(){ D.body.removeChild(f); }, 333);

        }//end saver




        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            return navigator.msSaveBlob(blob, fn);
        }

        if(self.URL){ // simple fast and modern way using Blob and URL:
            saver(self.URL.createObjectURL(blob), true);
        }else{
            // handle non-Blob()+non-URL browsers:
            if(typeof blob === "string" || blob.constructor===z ){
                try{
                    return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  );
                }catch(y){
                    return saver( "data:" +  m   + "," + encodeURIComponent(blob)  );
                }
            }

            // Blob but not URL:
            fr=new FileReader();
            fr.onload=function(e){
                saver(this.result);
            };
            fr.readAsDataURL(blob);
        }
        return true;
    }
    //5.全局变量
    Vue.prototype.getRandColor = '#ADADAD';


}
module.exports = MyPlugin;
