const instaData1 = {
    data:[{
        id: 100,
        source: 'what is going on',
        real: false
    },{
        id: 101,
        source: 'testing',
        real: true
    }],
    paging:{
        next: 'instaData2'
    }
}

const instaData2 = {
    data:[{
        id: 200,
        source: 'hi there',
        real: false
    },{
        id: 201,
        source: 'forget this',
        real: true
    }],
    paging:{
        next: 'instaData3'
    }
}

const instaData3 = {
    data:{
        id: 300,
        source: 'what do you mean',
        real: true
    },
    paging:{
        next: 'instaData4'
    }
}

const instaData4 = {
    data:{
        id: 400,
        source: 'I am smart',
        real: false
    }
}
let allData= []

const link1 = instaData1
const link2 = link1.paging.next
console.log(link2)
console.log(instaData2.paging.next)
console.log(link2.paging.next)

function uploadingData(source) {
    for (post of source) {
        allData.push(post)
    }
}

uploadingData(link1.data)
uploadingData(link2.data)
uploadingData(link3.data)
uploadingData(link4.data)
uploadingData(link5.data)


