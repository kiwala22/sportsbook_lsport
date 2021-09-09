import Requests from "./Requests";

export default {
  currentUserLogin() {
    let path = "/api/v1/check_user";
    return Requests.isGetRequest(path).then((response) => response.data);
  },
};
