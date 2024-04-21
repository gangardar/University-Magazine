import apiClient from "./api-client";

class LoginEndPoint {

    login(data) {
        return apiClient.post("/user/login", data);
    }

    // Function to store id and role in local storage
    storeUserData(userData) {
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("profilePhoto", userData.profilePhoto);
        if (userData.faculty != null) {
            localStorage.setItem("facultyId", userData.faculty.id);
        }
    }

    clearUserData() {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("facultyId");
        localStorage.removeItem("profilePhoto");
    }

}

export default new LoginEndPoint();