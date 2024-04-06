import apiClient from "./api-client";

class LoginEndPoint{

    login(data) {
        return apiClient.post("/user/login", data);
    }

    // Function to store id and role in local storage
    storeUserData(userData) {
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("token", userData.token);
    }

}

export default new LoginEndPoint();