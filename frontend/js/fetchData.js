async function fetchData(result){
    let data = await result.json();
    if(result.status == 200 || result.status == 201){
        return data;
    }
    else if(result.status == 401){
        localStorage.removeItem("user");
        window.location.assign("login.html");
    }
    else {
        throw new Error(data.error);
    }
}