const baseUrl = "https://tp-js-2-api-wjfqxquokl.now.sh/users";

let Users = [];

let myUser = {
    fullname: "",
    email: "",
    address: "",
    phone: ""
};

const handleError = err =>{
    alert(`Hubo un error. ${err}`);
};

const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseUrl}`)
        Users = res.data
        //imprimir();
    }
    catch (err) {
        handleError(err);
    }
};

const searchUser = async (search) => {
    try {
        const res = await axios.get(`${baseUrl}?search=${search}`)
         Users = res.data
    }
    catch (err) {
        handleError(err)
    }
};

//MOSTRAR Y CERRAR MODAL ADD EMPLOYEE

const addNewEmployeeButton = document.querySelector("#add-employee-button");
const addEmployeeModal = document.querySelector("#form-add");
addNewEmployeeButton.addEventListener("click", () =>{
    addEmployeeModal.setAttribute("style", "display: block")
});

const closeAddEmployeeModal = document.querySelector("#close-add-modal");
const cancelAddEmployeeModal = document.querySelector("#cancel-button")
closeAddEmployeeModal.addEventListener("click", () =>{
    addEmployeeModal.setAttribute("style", "display: none")
});

cancelAddEmployeeModal.addEventListener("click", () =>{
    addEmployeeModal.setAttribute("style", "display: none")
})

const nameInput = document.querySelector("#input-name");
const emailInput = document.querySelector("#input-email");
const addressInput = document.querySelector("#input-adress");
const numberInput = document.querySelector("#input-number");
const submitButton = document.querySelector("#submit-button");

const postUser = async () => {
    let fullname = nameInput.value;
    let email = emailInput.value;
    let address = addressInput.value;
    let phone = numberInput.value; 

    let newEmployee = {
        fullname,
        email,
        address,
        phone
    }
    try {
        const res = await axios.post(baseUrl, newEmployee)
        Users.push(newEmployee)
        load()
    }
    catch (err){
        handleError(err)
    }
};

submitButton.addEventListener("click", postUser())

/*const postUser = async (fullname, email, address, phone) => {
    try {
        const res = await axios.post(`${baseUrl}`, {
            fullname,
            email,
            address,
            phone
        })
        newUser = res.data
        Users.push(newUser)
        load();
    }
    catch (err){
        handleError(err)
    }
};*/

const putUser = async (id, fullname, email, address, phone) => {
    let data = {
        fullname,
        email,
        address,
        phone
    };
    try {
        const res = await axios.put(`${baseUrl}/${id}`, data)
        for (let i = 0; i < Users.length; i++) {
            if(Users[i].id == id) {
                Users[i] = res.data;
            }
        }
        imprimir();
    }
    catch (err){
        handleError(err);
    }
};

const deleteUser = async (id) => {
    try {   
        const res = await axios.delete(`${baseUrl}/${id}`)
        const index = Users.findIndex(user => {
            return user.id == id
        })
        Users.splice(index, 1)
        load();
    }
    catch (err){
        handleError(err)
    }
    
};



/*
getAllUsers();
const imprimir = () => {
    document.querySelector("#users-list").innerHTML = ""
    Users.forEach(user => {
        let list = document.querySelector("#users-list");
        let newUser = document.createElement("li");
        let newID = document.createElement("span");
        let newFullName = document.createElement("span");
        let newEmail = document.createElement("span");
        let newAddress = document.createElement("span");
        let newPhone = document.createElement("span");
        let newEdit = document.createElement("button")
        let newDelete= document.createElement("button");

        let divActions = createElement("div");
        let spanDeleteButton = createElement("span");
        let spanEditButton = createElement("span");
        spanEditButton.appendChild(newEdit);
        spanDeleteButton.appendChild(newDelete);
        divActions.appendChild(spanEditButton);
        divActions.appendChild(spanDeleteButton);

        newUser.appendChild(newID);
        newUser.appendChild(newFullName);
        newUser.appendChild(newEmail);
        newUser.appendChild(newAddress);
        newUser.appendChild(newPhone);
        newUser.appendChild(divActions);

        list.appendChild(newUser);

        newID.innerHTML = user.id;
        newFullName.innerHTML = user.fullname;
        newEmail.innerHTML = user.email;
        newAddress.innerHTML = user.address;
        newPhone.innerHTML = user.phone;

        newDelete.addEventListener("click", ()=> {
            deleteUser(newID);
            newUser.remove();
        })
    })
}*/


