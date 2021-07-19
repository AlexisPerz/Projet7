let user = localStorage.getItem("user");
if (user == null) {
    window.location.assign("login.html");
}
let token = JSON.parse(user).token;
fetch("http://localhost:3000/api/post", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(data => fetchData(data))
    .then(jsonListPost => {
        for (let jsonPost of jsonListPost) {
            let post = new Post(jsonPost);
            document.querySelector(".listPost").innerHTML += post.display();
        }
        document.querySelectorAll(".listPost .removepost").forEach(btn => {
            btn.addEventListener("click", function () {
                fetch(`http://localhost:3000/api/post/${this.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(result => {
                        this.closest(".post").remove();
                    })
            })
        })

        document.querySelectorAll(".listPost .removecomment").forEach(btn => {
            btn.addEventListener("click", function () {
                fetch(`http://localhost:3000/api/comment/${this.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(result => {
                        this.closest(".comment").remove();
                    })
            })
        })

        boutoncomment();

        document.querySelectorAll(".listPost .fa-pencil-alt").forEach(btn => {
            btn.addEventListener("click", function () {
                document.querySelector("#modifierId").value = this.dataset.id;
                document.querySelector("#modifier").value = this.dataset.text;
            })
        })
        document.querySelector("#bouton-modifier").addEventListener("click", function () {
            let data = {
                posts: {
                    message: document.querySelector("#modifier").value
                }
            }
            fetch(`http://localhost:3000/api/post/${document.querySelector("#modifierId").value}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(() => window.location.reload())
                .catch(error => console.log(error));
        })
    });

document.querySelector("#publier").addEventListener("click", function (e) {
    e.preventDefault();
    if (document.querySelector(".formPost textarea").reportValidity()) {
        let data = new FormData();
        data.append("message", document.querySelector('#newPost [name="message"]').value);
        if (document.querySelector('#newPost [name="image"]').value != "") {
            data.append("image", document.querySelector('#newPost [name="image"]').files[0]);
        }
        fetch("http://localhost:3000/api/post", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: data
        })
            .then(async result => fetchData(result))
            .then(data => {
                window.location.reload();
            })
            .catch(error => console.log(error));
    }
})

document.querySelector("#deconnexion").addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.assign("login.html");
})

function boutoncomment(){
    document.querySelectorAll(".addcomment").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.closest(".post").querySelector("textarea").reportValidity()) {
                let data = {
                    comments: {
                        message: e.target.closest(".post").querySelector("textarea").value,
                        postId: e.target.dataset.id
                    }
                }
                fetch("http://localhost:3000/api/comment", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(async result => fetchData(result))
                    .then(data => {
                        window.location.reload();
                    })
                    .catch(error => console.log(error));
            }
        })
    })
}

document.querySelector("#bouton-supprimer").addEventListener("click", function () {
    fetch("http://localhost:3000/api/user", {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(async result => fetchData(result))
                    .then(data => {
                        localStorage.removeItem("user");
                        window.location.assign("login.html");
                    })
                    .catch(error => console.log(error));
})