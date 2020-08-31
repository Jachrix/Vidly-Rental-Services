console.log('Before.........');

// Async operations



// getItems(1, (items) => {
//     console.log(items);
//     getEachItem(items.id, (val) => {
//         console.log(val);
//         getName(val.name, (output) => {
//             console.log(output);
//         });
//     })
// });

// getItems(1, getEachItem);

// function getEachItem(items) {
//     console.log(items);
//     getEachItem(items.id, getName)
// }

// function getName(val) {
//     console.log(val);
//     getName(val.name, displayName);
// }

// function displayName(output) {
//     console.log(output);
// }

// function getItems(id, callback) {
//     setTimeout(() => {
//         console.log("Getting all items......");
//         callback({ id: 1, name: "Anyim", email: 'me@gmail.com' });
//     }, 2000);
// }

// function getEachItem(itemId, callback) {
//     setTimeout(() => {
//         console.log("Getting each item .....");
//         callback({ id: itemId, name: "Anyim", email: 'me@gmail.com' });
//     }, 2000);
// }

// function getName(itemName, callback) {
//     setTimeout(() => {
//         console.log("Getting each name .....");
//         callback({ name: "Anyim" });
//     }, 2000);
// }

// getUser(1, getRepository);

// getUser(1, (user) => {
//     getRepositories(user.gitHubAcc, (repos) => {
//         getComits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });

console.log('After..........');

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log("Getting Users from database.....");
//         callback({ id: id, gitHubAcc: "Jachrix" });
//         //return { id: id, gitHubAcc: "Jachrix" };
//     }, 2000);
//     // return id;
// }

// function getRepositories(username, callback) {

//     setTimeout(() => {
//         console.log("Getting repositories.....");
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);
// }

// function getComits(repo, callback) {
//     setTimeout(() => {
//         console.log('Getting commits .......');
//         callback(['My first commit', 'My second commit']);
//     });
// }

// getUser(1, (user) => {
//     getRepositories(user.gitHubAcc, (repos) => {
//         getComits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });

// const p = getUser(1);
// getUser(1)
//     .then(userData => getRepositories(userData.gitHubAcc))
//     .then(repo => getComits(repo[0]))
//     .then(commits => console.log('Commits :', commits[0]))
//     .catch(error => console.log("Error:", error.message));

// Async and Await approach

async function displayCommits() {
    try {
        const user = await getUser(1);
        const getRepo = await getRepositories(user.gitHubAcc);
        const getFirstComit = await getComits(getRepo[0]);
        console.log(getFirstComit);
        console.log(getRepo[0]);
    } catch (error) {
        console.log('Error :', error.message);
    }

}

displayCommits();



function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting Users from database.....");
            resolve({ id: id, gitHubAcc: "Jachrix" });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting repositories.....");
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getComits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commits .......');
            resolve(['My first commit', 'My second commit']);
            //reject(new Error('Could not get the commits....'));
        });
    });
}