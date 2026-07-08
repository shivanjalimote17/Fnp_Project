export function storeid(userid){
    localStorage.setItem("id",userid);
}

export function getId(){
    return localStorage.getItem("id");
}

export function removeId(){
    localStorage.removeItem("id");
}