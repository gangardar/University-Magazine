export function getRedirectPath() {
  const role = localStorage.getItem("userRole");
  const userRole = role ? role : '';
    switch (userRole) {
      case "ADMIN":
        return "/admin";
      case "STUDENT":
        return "/student/home";
      case "COORDINATOR":
        return "/marketingCoordinator";
      case "MANAGER":
        return "/marketingManager";
      case "GUEST":
        return "/guest";
      default:
        return "/";
    }
  }