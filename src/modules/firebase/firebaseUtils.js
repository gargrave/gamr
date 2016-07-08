import {forEach} from 'lodash';


export function fbToArray(resObject) {
  let arr = [];
  forEach(resObject, (value, key) => {
    value.id = key;
    arr.push(value);
  });
  return arr;
}
