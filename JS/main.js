async function IncludeJavascript(filename){
    var script = await document.createElement('script');
    script.src = await filename;
    return new Promise((resolve,reject)=>{
        script.onload = ()=>{
            resolve()
        }
        document.body.appendChild(script);
    })
}


IncludeJavascript('JS/geo.js')
IncludeJavascript('JS/key.js') // import 



window.onload = ()=>{ // html event







    // 
}