const app = new Vue({
    el: '#app',
    data: {
        books: [{
                id: 1,
                name: '《JavaScript高级程序设计》',
                date: '2006-8',
                price: 95.00,
                count: 1
            },
            {
                id: 2,
                name: '《你不知道的JavaScript》',
                date: '2010-7',
                price: 185.00,
                count: 1
            },
            {
                id: 3,
                name: '《http权威指南》',
                date: '2006-9',
                price: 76.00,
                count: 1
            },
            {
                id: 4,
                name: '《算法导论》',
                date: '2006-1',
                price: 66.00,
                count: 1
            },
            {
                id: 5,
                name: '《编程珠玑》',
                date: '2008-10',
                price: 39.00,
                count: 1
            },
            {
                id: 6,
                name: '《剑指offer》',
                date: '2013-7',
                price: 36.00,
                count: 1
            },
        ]
    },
    methods: {
        getFinalPrice(price) {
            return '￥' + price.toFixed(2)
        },
        decrement(index) {
            return this.books[index].count--
        },
        increment(index) {
            return this.books[index].count++
        },
        removeHandle(index) {
            this.books.splice(index, 1)
        }
    },
    computed: {
        totalPrice() {
            // 1.for()
            // let totalPrice = 0
            // for (let i = 0; i < this.books.length; i++) {
            //     totalPrice += this.books[i].price * this.books[i].count
            // }
            // return totalPrice

            // 2. for(let i in this.books)
            // let totalPrice = 0
            // for (let i in this.books) {
            //     const book = this.books[i]
            //     totalPrice += book.price * book.count
            // }
            // return totalPrice

            // 3.for(let i of this.books)
            // let totalPrice = 0
            // for (let item of this.books) {
            //     totalPrice += item.price * item.count
            // }
            // return totalPrice

            return this.books.reduce((pre, book) => {
                return pre + book.price * book.count
            }, 0)
        }
    },
    filters: {
        showPrice(price) {
            return '￥' + price.toFixed(2)
        }
    }
});