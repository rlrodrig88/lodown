'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/*
/**
 * identity: takes anything and returns it unchanged
 *
 * @param {anything}
 * @returns {anything}
 */
function identity(anything) {
    return anything;
}
module.exports.identity = identity;

/** typeOf: returns the datatype for a given element.  Will diferentiate between 
 * different types of objects.
 *    
 * @param {Anything} Literally, anything. 
 * @returns {String} The data type of element given
 */
function typeOf(anything) {
    if (typeof anything === "boolean") {
        return "boolean";
    } else if (anything === null) {
        return "null";
    } else if(anything === undefined) {
        return "undefined";
    } else if(typeof anything === "number") {
        return "number";
    } else if (typeof anything === "string") {
        return "string";
    } else if (Array.isArray(anything)) {
        return "array";
    } else if (typeof anything === "function") {
        return "function";
    } else 
        return "object";
}
module.exports.typeOf = typeOf;

/** first: returns the first "x" elements in a given array where x is a number.  
 *  If x is not a number or missing, returns the first element in the array
 *    
 * @param {Array, Number} List elements, number of elements at the beginning of the array  
 * @returns {newArray} The first "x" elements from the given array
 */
function first(arrayFirst, numberFirst) {
     if (Array.isArray(arrayFirst) === false || numberFirst < 0) {
        return [];
     } else if(typeof numberFirst !== "number" || numberFirst === undefined) {
        return arrayFirst[0];
     } else 
        return arrayFirst.slice(0, numberFirst);
}
module.exports.first = first;

/** last: returns the last "x" elements in a given array where x is a number.  
 *  If x is not a number or missing, returns the last element in the array
 *    
 * @param {Array, Number} List elements, number of elements at the end of the array  
 * @returns {newArray} The last "x" elements from the given array
 */
function last(arrayLast, numberLast) {
     if (Array.isArray(arrayLast) === false || numberLast < 0) {
        return [];
     } else if(typeof numberLast !== "number" || numberLast === undefined) {
        return arrayLast[arrayLast.length - 1];
     } else 
        return arrayLast.slice(numberLast * -1);
}
module.exports.last = last;

/** indexOf: returns the index of the first occurance of a given value in a 
 *  given array.
 *    
 * @param {List, Value} List of values or objects, value to find index of  
 * @returns {Index} Index of first occurance of value
 */
function indexOf(list, value) {
    let outVal = -1;
        each(list, function(el, i, list) {
        if (value === el && outVal === -1) outVal = i;
       });
    return outVal;
}
module.exports.indexOf = indexOf;

/** filter: calls a function for each element in a array or object.  Returns a list 
 *  of the values for which the function returned true.
 *    
 * @param {List, Function} List of values or objects, function to call  
 * @returns {Array} an array of elements for which the function returned false
 */
function filter(list, test) {
    let passed = [];
    each(list, function(el, i, list) {
        if (test(el, i, list)) passed.push(el);
    });
    return passed;
}
module.exports.filter = filter;

/** reject: calls a function for each element in a array or object.  Returns a list
 *  of all the values for which the function returned false.
 *    
 * @param {List, Function} List of values or objects, function to call  
 * @returns {Array} an array of elements for which the function returned false
 */
function reject(list, test) {
    let failed = [];
    filter(list, function(el, i, list) {
        if(test(el, i, list) === false) failed.push(el);
    });
    return failed;
}
module.exports.reject = reject;

/** partiton: calls a function for each element in a array or object.  Returns array 
 *  cataining a list of all truthy values and a list of all falsey values.
 *    
 * @param {List, Function} List of values or objects, function to call  
 * @returns {Array} array containing 2 arrays: truthy values and falsey values
 */
function partition(list, test) {
    let truthyList = [];
    let falseyList = [];
    let masterList = [];
    each(list, function(el, i, list) {
        if (test(el, i, list)) truthyList.push(el);
        else falseyList.push(el);
    });
    masterList.push(truthyList);
    masterList.push(falseyList);    
    return masterList;
}
module.exports.partition = partition;

/** unique: removes duplicates from an array
 *    
 * @param {Array} Array to remove duplicate values
 * @returns {newArray} array with dulicate values removed
 */
function unique(list) {
    let newList = [];
    each(list, function(el, i, list) {
        if (indexOf(newList, list[i]) === -1) newList.push(list[i]);
    });
    return newList;
}
module.exports.unique = unique;

/** map: calls a function for each element in a array or object.
 *    
 * @param {List, Function} List of values or objects, function to call  
 * @returns {newArray} array with new values or objects returned from the given function
 */
function map(collection, func) {
    let newCollection = [];    
    each(collection, function(el, i, list) {
        newCollection.push(func(el, i, list));
     });
    return newCollection;
}
module.exports.map = map;

/** pluck: returns an array containing the value of <property> for every element in <array>
 *    
 * 
 * @param {Array, Key}  array of objects, a property key
 * @returns {newArray} array containing the value for every element from the object in the array
 */
function pluck(collection, property) {
    let properties = []; 
    map(collection, function(el, i, list) {
        properties.push(list[i][property]);
    }); 
    return properties;
}
module.exports.pluck = pluck;

/** contains: Returns true if a given value in a given list.
 * 
 * @param {Array, Value}  array of values, a value to find a match
 * @returns {Boolean} returns true or false
 */
function contains(list, value) {
    let output = false;
    each(list, function(el, i, list) {
        output = list[i] === value || output === true ? output = true : output = false;
    });
    return output;
}
module.exports.contains = contains;

/** every: Returns true if every value in the list pass a given
 *  test.
 * 
 * @param {Array, Function}  array of values, a function used to test  
 * @returns {Boolean} returns true or false
 */
function every(col, test) {
    if (test === undefined) test = identity;  // Need to fix this line
    let passed = true;
    each(col, (item, i, col) => {
        if (test(item, i, col) && passed === true) {
            passed = true;
        } else passed = false;
    });
    return passed;
}
module.exports.every = every;

/** some: Returns true if any of the values in the list pass a given
 *  test.
 * 
 * @param {Array, Function}  array of values, a function used to test
 * @returns {Value} returns the result of the final function call
 */
function some(list, func) {
    if (func === undefined) func = identity;     
    let passed = false;
    each(list, (el, i, list) => {
        if (func(el, i, list) || passed === true) passed = true;
    });
    return passed;
}
module.exports.some = some;

/** reduce: Reduces a list of values(collection) to a single value.  Memo is the 
 *  inital state of the reduction and each step thereafter is returned by the passed 
 *  function.  
 * 
 *  If a Memo is not given, it becomes the first item in the list 
 *
 * @param {Array, Function, Memo}  Array of values, function to call, 
 * Initial state of reduction.
 * @returns {Boolean} returns true or false
 */
function reduce(col, func, memo) {
    if (memo === undefined) {
       var pv = col[0];
    } else pv = memo;
    console.log(pv);
    each(col, (el, i, list) => { 
        pv = func(pv, el, i);
    });
    return pv;
}
module.exports.reduce = reduce;

/** extend: Copies all of the properties in multiple source objects
 *  into the destination object.  Then return the destination object.
 *
 * @param {Destination Object, Source Objects}  objects
 * @returns {Object} returns the destination object
 */

function extend(...objects) {
   const target = objects[0];
   each(objects, (obj, i, ojects) => {
       if (i === 0) return;
       each(obj, (val, key, object) => {
           target[key] = val;
       });
   });
   return target;
}
module.exports.extend = extend;
