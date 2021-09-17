import React, { useState } from 'react';
import data from '../info/data.json';
import Loader from './Loader';
// console.log(Object.entries(data));

let result = [];
let listItems;
let res2 = [];



export function RendOfJson() {

  let [res, setRes] = useState(null)
  let [litab, setSwitch] = useState(true)

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
          result[index] = element[0] 
          for (let i = 0; i < subArr.length; i++) {
            const element2 = subArr[i];
            res2[i] = element2[0] + ' : ' + element2[1]
          }
          result[result.length - 1] = [result[result.length - 1], res2]
        } else
          result[index] = element[0] + ' : ' + element[1]
      }
      listItems = result.map((result) =>
        (typeof result[1] === 'object' && result[1] !== null) ?
          <li key={result}>{result[0]}<ul>{result[1].map((r) => <li key={r}>{r}</li>)}</ul></li>
          :
          <li key={result}>{result}</li>
      )
      setRes(result)
    }
    )
  }
  const switchFunc = () => {
    setSwitch(!litab);
    listItems = result.map((result) =>
      !litab ?
      (typeof result[1] === 'object' && result[1] !== null) ?
      <li key={result}>{result[0]}<ul>{result[1].map((r) => <li key={r}>{r}</li>)}</ul></li>
      :
      <li key={result}>{result}</li>
        :
        (typeof result[1] === 'object' && result[1] !== null) ?
          <tr key={result}>
            <td>
              {result[0]}
            </td>
            {result[1].map((r) => <tr><td key={r}>{r.split(':')[0]}</td><td>{r.split(':')[1]}</td></tr>)}
          </tr>
          :
          <tr key={result}>
            <td>
              {result.split(':')[0]}
            </td>
            <td>{result.split(':')[1]}</td>
          </tr>)
  }
  allRender();
  return (res !== null) ?
    <div>
      <button onClick={() => { switchFunc() }}>Switch to {litab ? 'table' : 'list'}</button>
      {litab ?
        <ul className='ul-list'>
          {listItems}
        </ul>
        :
        <table className='tb-list'>
          {listItems}
        </table>
      }
    </div>
    : <Loader />
}

