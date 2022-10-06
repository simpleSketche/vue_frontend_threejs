

export default function RhinoService () {
  }

let script;
let result;

//   RhinoService.prototype.init = function () {
//     return new Promise((resolve, reject) => {
//       const scripts = [
//         'https://files.mcneel.com/rhino3dm/js/latest/rhino3dm.js',
//       ]

//       script = document.createElement('script')
//       script.src = scripts[0]
//       document.head.appendChild(script)
//       script.onerror = (err) => {
//         return reject(err)
//       }
//       script.onload = () => {
//         window.rhino3dm()
//               .then(module => {
//                 window.Rhino3dm = module
//                 resolve()
//               })
//       }
//     })
//   }


RhinoService.prototype.decodeRhinoJson = function(rhinoModelJson){
    return new Promise((resolve, reject) => {
        const scripts = [
            'https://files.mcneel.com/rhino3dm/js/latest/rhino3dm.js',
          ]
    
          script = document.createElement('script')
          script.src = scripts[0]
          document.head.appendChild(script)
        script.onerror = (err) => {
            return reject(err)
          }
        script.onload = () => {
           window.rhino3dm()
                 .then(module => {
                   window.Rhino3dm = module
                   result = module.CommonObject.decode(rhinoModelJson.data)

                   resolve()
                 })
         }
    })
}


  RhinoService.prototype.decodeRhinoJsonToThreeJson = async function (rhinoModelJson){
    await this.decodeRhinoJson(rhinoModelJson);
    return result.toThreejsJSON(true);
  }