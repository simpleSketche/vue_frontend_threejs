

export default function RhinoService () {
  }

let script;
let anotherScript;
let result;
let allResults = [];
const scripts = [
  'https://files.mcneel.com/rhino3dm/js/latest/rhino3dm.js',
]

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
                  console.log(result)
                   resolve()
                 })
         }
    })
}


RhinoService.prototype.decodeRhinoJsonToThreeJson = async function (rhinoModelJson){
  await this.decodeRhinoJson(rhinoModelJson);
  return result.toThreejsJSON(true);
}


RhinoService.prototype.decodeMultipleRhinoJsons = function(rhinoModelJsons){

    return new Promise((resolve, reject) => {
      anotherScript = document.createElement('script')
      anotherScript.src = scripts[0]
      document.head.appendChild(anotherScript)
      anotherScript.onerror = (err) => {
        return reject(err)
      }

      anotherScript.onload = () => {
        window.rhino3dm()
              .then(module => {
                window.Rhino3dm = module
                let keys = Object.keys(rhinoModelJsons)
                let numKeys = keys.length
                console.log(rhinoModelJsons)
                for(let i = 0; i < numKeys; i++){
                  let curTypeJsons = rhinoModelJsons[keys[i]];
                  for(let j  = 0; j < curTypeJsons.length; j++){
                    let curMeshJson= JSON.parse(curTypeJsons[j])
                    let curDecodedObj = module.CommonObject.decode(curMeshJson)
                    allResults.push(curDecodedObj.toThreejsJSON(true));
                  }
                }
                resolve()
              })
      }
    })

}


RhinoService.prototype.decodeGeneratorResult = async function(generatorJson){
  let allJsons = generatorJson.data;
  await this.decodeMultipleRhinoJsons(allJsons);
  return allResults;
}
