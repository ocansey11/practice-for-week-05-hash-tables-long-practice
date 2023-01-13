class KeyValuePair {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)
  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here

    this.count = 0
    this.capacity = numBuckets
    this.data = new Array(this.capacity)
    this.data.fill(null, 0, numBuckets)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    let index = this.hashMod(key)
    let newNode  =  new KeyValuePair(key,value)

    if(this.data[index] === null){
      this.data[index] = newNode
      this.count++
    }
    else{
      // first traverse the list to see if key values repeat themselves
      let keyCheck = this.data[index]
      let replaced = false

      while(keyCheck){
        if(replaced){
          break
        }
        if(keyCheck.key == key && keyCheck.value !== value){
          replaced = true
          return keyCheck.value = value
        }
        else{
          keyCheck = keyCheck.next
        }
      }

      // handles hashCollision if replaced never results to true
      let head =  this.data[index]
      this.data[index] = newNode
      this.data[index].next = head
      this.count++
    }
  }

  read(key) {
    // Your code here
    let index = this.hashMod(key)
    let head =  this.data[index]

    while(head){
      if(head.key == key){
        return head.value
      }
      head = head.next
    }
    return undefined
  }


  resize() {
    // Your code here
    this.capacity *= 2
    let oldArr = []
    this.count = 0

    // put old values in new oldArr to keep them for a while
    for(let i = 0; i < this.data.length; i++){
      oldArr.push(this.data[i])
    }

    //create new resized Array
    this.data = new Array(this.capacity)

    // for loop to reinsert last nodes of arrays back into the newArray
    for(let i = 0; i < oldArr.length; i++){
      let head = oldArr[i]
      // go to last node of the head
      while(head.next !== null){
        if(head.next.next == null){
          this.insert(head.next.key, head.next.value)
          head.next = null
        }
        else{
          head = head.next
        }
      }
      // if only one key in head, insert head.key and .value
      this.insert(head.key, head.value)
    }
  }


  delete(key) {
    // Your code here
    let index = this.hashMod(key)
    let head =  this.data[index]

    while(head.key !== key){
      head = head.next
    }
    head.value = undefined
    this.count--
    return 'Key not found'
    // the problem is, if you set head to null, you fuck up the next values
  }
}


module.exports = HashTable;
