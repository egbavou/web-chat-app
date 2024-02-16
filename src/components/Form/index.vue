<template>
  <div class="w-full" :class="clas">
    <div class="w-full relative flex">
      <p @click="open()" @blur="fonc1()" id="pa"
        class="label px-1 ml-4 flex left-0 mt-5 absolute text-[18px] justify-center items-center">
        {{ texte }}
      </p>
      <input v-model="valeur" :type="type === 'password' ? (showPasswordValue ? 'text' : 'password') : type
        " :placeholder="place" :class="cla"
        class="w-full h-[60px] text-[.85rem] border-gray-400 rounded-xl transition-all duration-[.5s] border px-2 outline-none placeholder-white focus:border-[.1rem] focus:placeholder-black"
        v-on:input="Control()" v-on:focus="fonc()" v-on:blur="fonc1()"
        title="Veuillez remplir ce champ obligatoirement" />
      <i v-if="Showicon" :class="icon"
        class="fa-solid text-xs absolute right-[.8rem] text-black top-[.7rem] cursor-pointer" id="icon-eyes"
        v-on:click="toggleShowPassword()"></i>
    </div>
    <div class="" :class="classeName">
      <i class="fa-solid fa-triangle-exclamation font-bold text-[.8rem] pt-[.5%] text-red-500"></i>
      {{ content1 }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Input",
  data() {
    return {
      transition: false,
      content1: "",
      classeName: "hidden",
      cla: "focus:border-black",
      showPasswordValue: false,
      icon: "fa-eye-slash",
      hasClick: false,
      valeur: "",
      isEmailValid: {
        type: Boolean,
      },
      isTextValid: {
        type: Boolean,
      },
      isPasswordValid: {
        type: Boolean,
      },
      isNumberValid: {
        type: Boolean,
      },
      isValid: {
        type: Boolean,
      },
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    texte: {
      type: String,
      default: "",
    },
    place: {
      type: String,
      default: "",
    },
    clas: {
      type: String,
      default: "",
    },
    Showicon: {
      type: Boolean,
    },
  },
  methods: {
    open() {
      this.$el.querySelector(".in").focus();
    },
    fonc() {
      this.$el
        .querySelector(".label")
        .classList.add(
          "translate-y-[-28px]",
          "text-[.7rem]",
          "bg-white",
          "translate-x-[5px]",
          "duration-[.5s]"
        );
      this.hasClick = true;
    },
    fonc1() {
      var p = document.getElementById("pa");
      if (this.valeur == "") {
        this.$el
          .querySelector(".label")
          .classList.remove(
            "translate-y-[-28px]",
            "text-[.7rem]",
            "bg-white",
            "translate-x-[5px]"
          );
      }
    },
    toggleShowPassword() {
      if (this.type === "password") {
        this.showPasswordValue = !this.showPasswordValue;
        if (this.icon == "fa-eye-slash") {
          this.icon = "fa-eye";
        } else {
          this.icon = "fa-eye-slash";
        }
      }
    },
    //   changetype1() {
    // if(!this.transition)
    // {
    //   this.$emit("update:inputType", "text");
    //   this.transition = true
    // }
    // else {
    //   this.$emit("update:inputType", "password");
    //   this.transition = false
    // }
    //   },
    Control() {
      this.$emit("eper", this.valeur);
      console.log(this.valeur);
      switch (this.type) {
        case "mail":
          return this.isValidEmail(this.valeur);
        case "number":
          return this.isValidNumber(this.valeur);
        case "text":
          return this.isValidText(this.valeur);
        case "password":
          return this.isValidPassword(this.valeur);
        // Ajoutez d'autres types de contrôle selon vos besoins
        default:
          return true; // Si le type n'est pas spécifié ou n'est pas reconnu, on considère que le contrôle est réussi
      }
    },

    isValidEmail(email) {
      var mail = email.trim();
      if (mail.length <= 0) {
        console.log("ddddddd");
        this.classeName = "text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = "Veuillez remplir le champ";
        this.cla = "focus:border-red-500";
        this.isEmailValid = false; /* true si le contenu est valide, sinon false */
        this.$emit("EmailValidation", this.isEmailValid);
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)
      ) {
        this.classeName = "text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = "Saisie incorrecte! Veuillez entrez un mail valide";
        this.cla = "focus:border-red-500";
        this.isEmailValid = false; /* true si le contenu est valide, sinon false */
        this.$emit("EmailValidation", this.isEmailValid);
      } else {
        this.classeName = "hidden";
        this.content1 = "";
        this.cla = "focus:border-[#30C1BA]";
        this.isEmailValid = true; /* true si le contenu est valide, sinon false */
        this.$emit("EmailValidation", this.isEmailValid);
      }
    },
    isValidText(text) {
      var texte = text.trim();
      if (texte.length <= 0) {
        this.classeName = "text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = "Veuillez remplir le champ";
        this.cla = "focus:border-red-500";
        this.isTextValid = false; /* true si le contenu est valide, sinon false */
        this.$emit("TextValidation", this.isTextValid);
      } else if (!/^(.*[a-zA-Z].*){2,}$/u.test(texte)) {
        this.classeName = " text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = " Cette chaîne doit etre d'au moins 2 caractères";
        this.cla = "focus:border-red-500";
        this.isTextValid = false; /* true si le contenu est valide, sinon false */
        this.$emit("TextValidation", this.isTextValid);
      } else {
        this.classeName = "hidden";
        this.content1 = "";
        this.cla = "focus:border-[#30C1BA]";
        this.isTextValid = true; /* true si le contenu est valide, sinon false */
        this.$emit("TextValidation", this.isTextValid);
      }
    },
    isValidPassword(password) {
      var pass = password.trim();
      if (pass.length < 8 || pass.length > 15) {
        this.classeName = "text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = "Le mot de passe doit contenir entre 8 et 15 caractères";
        this.cla = "focus:border-red-500";
        this.isPasswordValid = false;
        this.$emit("PasswordValidation", this.isPasswordValid);
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.,\/])[a-zA-Z\d@.,\/]{8,15}$/.test(pass)) {
        this.classeName = " text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 =
          " Cette chaîne doit être d'au moins 8 caractères contenant au moins une majuscule, une minuscule, un chiffre et un des caractères suivants : . , @ /";
        this.cla = "focus:border-red-500";
        this.isPasswordValid = false;
        this.$emit("PasswordValidation", this.isPasswordValid);
      } else {
        this.classeName = "hidden";
        this.content1 = "";
        this.cla = "focus:border-[#30C1BA]";
        this.isPasswordValid = true;
        this.$emit("PasswordValidation", this.isPasswordValid);
      }
    },

    isValidNumber(numero) {
      var num = numero;
      if (num <= 0) {
        this.classeName = "text-red-500 text-[.65rem] mt-1 font-semibold";
        this.content1 = "Veuillez remplir le champ";
        this.cla = "focus:border-red-500";
        this.isNumberValid = false; /* true si le contenu est valide, sinon false */
        this.$emit("NumberValidation", this.isNumberValid);
      } else {
        this.classeName = "hidden";
        this.content1 = "";
        this.cla = "focus:border-[#30C1BA]";
        this.isNumberValid = true; /* £
         true si le contenu est valide, sinon false */
        this.$emit("NumberValidation", this.isNumberValid);
      }
    },
    mounted() {
      // Appeler fonc1() au chargement initial de la page
      this.fonc1();
    },
  },
};
</script>

<style scoped>
input[type="number"] {
  appearance: textfield;
  /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
