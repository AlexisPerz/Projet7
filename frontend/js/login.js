document.getElementById("login").addEventListener("submit", function(e){
    e.preventDefault();
    if(this.reportValidity()){
       let data = {
           email: document.getElementById("floatingInput").value,
           password: document.getElementById("floatingPassword").value
        };
        fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async result => fetchData(result))
        .then(data => {
            localStorage.setItem("user",JSON.stringify(data));
            window.location.assign("post.html");
        })
        .catch(error => console.log(error));
    }
})