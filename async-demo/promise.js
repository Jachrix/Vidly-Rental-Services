// const p = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         //resolve(1);
//         reject(new Error('message'));
//     }, 2000);

// });

// p
//     .then(result => console.log('Result', result))
//     .catch(error => console.log('Error', error.message));


async function notifyCustomer() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) {
        const movies = await getTopMovies();
        console.log('Top movies: ', movies);
        await sendEmail(customer.email, movies);
        console.log('Email sent...');
    }
}
notifyCustomer();


function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    });
}