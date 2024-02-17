<template>
  <div class="flex">
    <!-- Partie du formulaire -->
    <div class="flex m-auto items-center justify-center w-1/2">
      <div class="max-w-md w-full">
        <h2 class="text-center text-[50px] font-extrabold text-gray-900">
          Welcome Back
        </h2>

        <div>
          <h2 class="mb-3 text-center text-xs text-gray-900">
            Lorem ipsum dolor sit amet. Eos similique
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="submitForm">
          <div class="text-red-500 text-[14px]">{{ errorMessage }}</div>
          <!-- Les champs du formulaire ici -->
          <div>
            <Input v-model="email" type="mail" texte="Email" @eper="traiterEmail"
              @EmailValidation="emailValid = $event" />
          </div>

          <div>
            <Input v-model="password" type="password" texte="Mot de passe" @eper="traiterPassword"
              @PasswordValidation="passwordValid = $event" />
          </div>

          <div class="flex justify-between items-center mt-4">
            <div>
              <input type="checkbox" id="rememberMe" class="mr-2" />
              <label for="rememberMe">Souvenez-vous de moi</label>
            </div>
            <div>
              <a href="#" class="text-sm text-blue-500 hover:underline">Mot de passe oublié?</a>
            </div>
          </div>

          <div class="text-center">
            <button @click="CreateAccount()" :disabled="loading"
              class="w-1/2 bg-[#329993] rounded-xl text-white py-2 hover:scale-105 duration-300">
              <span v-if="loading">Chargement en cours...</span>
              <span v-else>Se connecter</span>
            </button>
          </div>
          <div class="text-center mt-4 text-sm text-gray-600">
            Vous n'avez pas de compte ?

            <router-link to="/register" class="text-sm text-blue-500 font-extrabold">S'inscrire</router-link>

          </div>
        </form>
      </div>
    </div>

    <!-- Partie de l'image -->
    <div class="mt- p-10 flex flex-col items-center h-screen ml-4">
      <img class="" src="@/assets/images/Message sent.png" alt="Background" />
      <h2 class="text-3xl">GlowChat</h2>
      <p class="text-center mt-3 text-base text-slate-400">
        Un projet web Avancé réalisé en groupe par les <b>étudiant en Master 1 IFRI UAC 2023-2024</b>
      </p>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Form/index.vue";
import apiService from "@/views/Services/configs/apiService.js";

export default {
  components: {
    Input,
  },

  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
      emailValid: false,
      passwordValid: false,
    };
  },

  methods: {
    traiterEmail(val) {
      this.email = val;
    },

    traiterPassword(val) {
      this.password = val;
    },
    async submitForm() {

      this.loading = true;

      // Vérification des champs requis
      if (!this.email || !this.password || !this.emailValid || !this.passwordValid) {
        this.errorMessage = "Tous les champs doivent être remplis";
        this.emailValid = true;
        this.passwordValid = true;
        this.loading = false;
      } else {
        this.errorMessage = "";
        const dataConnexion = {
          strategy: "local",
          email: this.email,
          password: this.password,
        };

        try {
          const response = await apiService.post("authentication", dataConnexion, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const dataResponse = response.status;
          const datatoken = response.data;
          console.log(datatoken.accessToken);

          if (dataResponse === 200 || dataResponse === 201) {
            const token = datatoken.accessToken;
            localStorage.setItem('accessToken', token);
            this.$router.push("/profil");
            //console.log("connexion réussit");
          }
        } catch (error) {
          // Gérer les erreurs d'authentification
          console.log(error.response);
          if (error.response.status === 401) {
            this.errorMessage = "L'email ou le mot de passe est incorrect";
          } else {
            this.errorMessage = "Une erreur s'est produite lors de la connexion !!";
          }
        }
        finally {
          this.loading = false;
          this.errorPassword = "";
          this.email = "";
          this.password = "";
        }
      }
    }


  },
};
</script>

<style scoped></style>
