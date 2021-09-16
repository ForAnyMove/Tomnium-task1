import React from 'react';
import data from '../info/data.json';

// console.log(Object.values(data)[3]);
// console.log(Object.keys(data));
console.log(Object.entries(data));
const arrOfJson = Object.entries(data);
let result = [];
function allRender(){
  for (let index = 0; index < arrOfJson.length; index++) {
    const element = arrOfJson[index];
    result[index] = element[0] + ' : ' + element[1]
  }
  return  (
   <div>
     {result}
   </div>
   )
}
console.log(result)
export function RendOfJson() { 
  return (
    <div className="rend-of">
      {allRender()}
    </div>
  );
}

