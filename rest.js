const resultsContainer = document.getElementById('results');//buncha button-function-listeners being declared
const getAllPostsButton = document.getElementById('getAllPosts');
const getPostByIdButton = document.getElementById('getPostById');
const createNewPostButton = document.getElementById('createNewPost');
const replacePostByIdButton = document.getElementById('replacePostById');
const updatePostTitleByIdButton = document.getElementById('updatePostTitleById');
const deletePostByIdButton = document.getElementById('deletePostById');

function renderResults(data) {//renders results to the html
    resultsContainer.innerHTML = '';
    if (Array.isArray(data)) {//if data is in an array then it will create a new div for each so that it renders properly
        data.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.textContent = JSON.stringify(item);
            resultsContainer.appendChild(resultElement);
        });
    } else {//renders single data item to a div html container
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.textContent = JSON.stringify(data);
        resultsContainer.appendChild(resultElement);
    }
}

function renderError(error) {//if all else fails will render this error message
    resultsContainer.innerHTML = `<div class="error">Error: ${error}</div>`;
}

function fetchData(url, method = 'GET', body = null) {//does all the real heavy lifting for the previous functions
    resultsContainer.textContent = 'Loading...';
    return fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderResults(data);
        })
        .catch(error => {
            renderError(error);
        });
}

getAllPostsButton.addEventListener('click', () => {//event listener for get all posts
    resultsContainer.innerHTML = '';
    fetchData('https://jsonplaceholder.typicode.com/posts');
});

getPostByIdButton.addEventListener('click', () => {//event listener for get post with id of 10
    resultsContainer.innerHTML = '';
    fetchData('https://jsonplaceholder.typicode.com/posts/10');
});

createNewPostButton.addEventListener('click', () => {//event listener to create new post
    resultsContainer.innerHTML = '';
    const newPost = {
        userId: 1,
        id: 1,
        title: 'The Salmon of Doubt',
        body: 'Hitchhiking the Galaxy One Last Time.'
    };
    fetchData('https://jsonplaceholder.typicode.com/posts', 'POST', newPost);
});

replacePostByIdButton.addEventListener('click', () => {//event listener to replace post with id of 12
    resultsContainer.innerHTML = '';
    const updatedPost = {
        userId: 1,
        id: 12,
        title: 'GOBLINPROOFING ONES CHICKEN COOP',
        body: 'AND OTHER PRACTICAL ADVICE IN OUR CAMPAIGN AGAINST THE FAIRY KINGDOM.'
    };
    fetchData('https://jsonplaceholder.typicode.com/posts/12', 'PUT', updatedPost);
});

updatePostTitleByIdButton.addEventListener('click', () => {//event listener to update the title of post with id of 12
    resultsContainer.innerHTML = '';
    const updatedTitle = {
        title: 'HOW TO TEACH QUANTUM PHYSICS TO YOUR DOG'
    };
    fetchData('https://jsonplaceholder.typicode.com/posts/12', 'PATCH', updatedTitle);
});

deletePostByIdButton.addEventListener('click', function () {//event listener to delete post with id of 12
    resultsContainer.innerHTML = '';
    fetchData('https://jsonplaceholder.typicode.com/posts/12', 'DELETE');
    alert("This post has been deleted, SUCCESSFULLY!");//pops up windows alert
});
//    ಠ ಠ