import React, { useState } from 'react';
import data from '../info/data.json';
import Loader from './Loader';
// console.log(Object.entries(data));

let result = [];
let listItems;

export function RendOfJson() {
  
  let [res, setRes] = useState(null)

  const allRender = () => {
    const prom = new Promise((resolve, reject) => {
      setTimeout(() => {
        const arrOfJson = Object.entries(data);
        resolve(arrOfJson)
      }, 2000)
    })
    prom.then(arrOfJson => {
      for (let index = 0; index < arrOfJson.length; index++) {
        const element = arrOfJson[index];
        if (typeof element[1] === 'object' && element[1] !== null) {
          const subArr = Object.entries(element[1])
          for (let i = 0; i < subArr.length; i++) {
            const element2 = subArr[i];
            result[index] = element[0] + ' : ' + element2[0] + ' : ' + element2[1]
            index++
          }
        } else
        result[index] = element[0] + ' : ' + element[1]
      }
      listItems = result.map((result) =>
        <li  key={result}>{result}</li>
      )
      setRes(
        result
        )
    }
    )
  }
  allRender();
  return res !== null ?
      <ul className='ul-list'>
        {listItems} 
      </ul>
      : <Loader/>
}

