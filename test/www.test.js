const { server } = require('./../bin/www');


test('get common students', async(done)=>{
    const noti = {
        teacher: 'lol@gmail.com',
        notification: 'hi lol @haha@gmail.com'
    }
    await request(server)
    .post('/api/retrievefornotifications')
    .send(noti)
    .then(async(e)=> {
        console.log(e)
        console.log('DONE')
        done()
    }).catch(err => {
        console.log(err)
        done()
    })
})




// test('Create a valid Service', async(done) => {
//     const service = {
//         name: "cool",
//         description: "description"
//     };

//     await Service.count().then(async function (count) {

//         await request(app)
//             .post('/api/services')
//             .send(service)
//             .then(async() => {
//                 await Service.count().then(function (newcount) {
//                     expect(newcount).toBe(count + 1);
//                     // execute done callback here
//                     done();
//                 });
//             })
//             .catch(err => {
//                 // write test for failure here
//                 console.log(`Error ${err}`)
//                 done()
//             });
//     });
// });