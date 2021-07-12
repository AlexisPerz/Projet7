document.getElementById("signin").addEventListener("submit", function(e){
    e.preventDefault();
    if(this.reportValidity()){
       let data = {
           email: document.getElementById("floatingInput").value,
           password: document.getElementById("floatingPassword").value
        };
        fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then(data => window.location.assign("login.html"))
        .catch(error => console.log(error));
    }
})