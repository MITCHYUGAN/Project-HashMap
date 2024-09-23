export default class HashMap {

    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => [])
        this.size = 0
        this.loadFactor = loadFactor
    }

    // Hash function to generate hash Code
    hash(key) {
        let hashCode = 0
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length
        }
        return hashCode
    }

    // Resize bucket if LoadFactor Exceeds 
    resize(){
        const newCapacity = this.buckets.length * 2
        const newBuckets = new Array(newCapacity).fill(null).map(() => [])
        
        for(const bucket of this.buckets){
            for(const[key, value] of bucket){
                const index = this.hash(key) % newCapacity;
                newBuckets[index].push([key, value])
            }
        }

        this.buckets = newBuckets
    }

    // Set method to add or update key-value pair
    set(key, value) {
        const index = this.hash(key)

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound")
        }

        const bucket = this.buckets[index]
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value
                return
            }
        }

        bucket.push([key, value])
        this.size++

        // Resize if load factor is exceeded
        if (this.size / this.buckets.length > this.loadFactor) {
            this.resize()
        }
    }

    // Get a key and returns it's value
    get(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        if (index < 0 || index > this.buckets.length) {
            throw new Error("Trying to access index out of bound")
        }

        for (const [k, v] of bucket) {
            if (k === key) {
                return v
            }
        }

        return null
    }

    // Check if a key exists in the bucket
    has(key) {
        return this.get(key) !== null
    }

    // Remove a node or element from the bucket
    remove(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                this.size--
                return true
            }
        }

        return false
    }

    // Return the size of the Hashmap
    length() {
        return this.size
    }

    // Clear the HashMap
    clear() {
        this.buckets = new Array(this.buckets.length).fill(null).map(() => [])
        this.size = 0
    }

    // Return an Array of all the keys in the HashMap
    keys() {
        const arr = []

        for (let i = 0; i < this.buckets.length; i++) {
            for (let v = 0; v < this.buckets[i].length; v++) {
                arr.push(this.buckets[i][v][0])
            }
        }
        return arr
    }

    // Return an Array of all the values in the HashMap
    values() {
        const arr = []

        for (const bucket of this.buckets) {
            for (const [_, values] of bucket) {
                arr.push(values)
            }
        }
        return arr
    }

    // Return all the element/node/key-value-pairs in the HashMap
    entries() {
        const arr = []

        for (const bucket of this.buckets) {
            for (const entries of bucket) {
                arr.push(entries)
            }
        }
        return arr
    }
}
