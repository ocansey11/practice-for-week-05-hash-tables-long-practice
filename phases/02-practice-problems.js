function anagrams(str1, str2) {
  // Your code here
  let set1 =  new Set(str1)
  let set2 =  new Set(str2)
  if(set1.size !== set2.size){
    return false
  }

 for(let i = 0; i < set1.size; i++){
   let value = str1[i]
   if(!(set2.has(value))) {
    return false
   }
  }
  return true
}

function commonElements(arr1, arr2) {
  // Your code here
  let set1 =  new Set(arr1)
  let set2 =  new Set(arr2)
  let newArr = []

  for(let i = 0; i < set1.size; i++){
   let value = arr1[i]
    if((set2.has(value))) {
      newArr.push(value)
    }
  }
  return newArr

}

function duplicate(arr) {
  // Your code here
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];

    if (obj[num]) {
      return num;
    } else {
      obj[num] = 'available';
    }
  }
}

function twoSum(nums, target) {
  // Your code here
  let set1 = new Set(nums)
  for(let i = 0; i < nums.length;i++ ){
    let value =  target - nums[i]

    if(set1.has(value) && value !==nums[i]){
      return true
    }
 }

 return false
}


function wordPattern(pattern, strings) {
  // Your code here
  const obj = {};
  const assigned = new Set()

  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    let key = pattern[i];

    if(!obj[key] && !assigned.has(str) ) {
      obj[key] = str;
      assigned.add(str);
    } else if (obj[key] !== str) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
