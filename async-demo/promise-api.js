// // Resolve
// const p = Promise.resolve({ id: 1 });

// p
//     .then(data => console.log(data))

// // Reject
// const e = Promise.reject(new Error('The reason for rejection'));

// e
//     .catch(error => console.log(error));

const P1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Asynchronous operations 1........");
        resolve(1);
        //reject(new Error('because something failed .....'));
    }, 2000);
});

const P2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Asynchronous operations 2........");
        resolve(2);
    }, 2000);
});

// Parallel promise running 

// Promise.all([P1, P2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err.message));

// Once one promise if fulfilled

Promise.race([P1, P2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message));