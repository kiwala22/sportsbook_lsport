import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["show", "unhide"];

  password() {
    if (this.value.classList.contains("fa-eye")) {
      this.value.classList.add("fa-eye-slash");
      this.input.type = "text";
    } else {
      this.value.classList.add("fa-eye");
      this.input.type = "password";
    }
  }

  get value() {
    return this.showTarget;
  }

  get input() {
    return this.unhideTarget;
  }
}
