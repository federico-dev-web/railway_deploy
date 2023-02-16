import { faker } from '@faker-js/faker'

faker.locale = 'es'

const getFakeProds = () => { 
    let objs = []
    for (let i = 0; i< 5; i++) {
        objs.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    return objs
}

export default getFakeProds



