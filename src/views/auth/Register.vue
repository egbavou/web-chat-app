<template>
    <div class="flex">
        <!-- Partie du formulaire -->
        <div class="flex m-auto  items-center justify-center w-1/2">
            <div class="max-w-md w-full my-[10px]">
                <h2 class="text-center text-[40px] font-extrabold text-gray-900">
                    Welcome Back
                </h2>

                <div>
                    <h2 class="mb- text-center text-xs text-gray-900">
                        Lorem ipsum dolor sit amet. Eos similique
                    </h2>
                </div>
                <form class="space-y-[15px]" @submit.prevent="submitForm">
                    <!-- Les champs du formulaire ici -->
                    <div class="text-[14px] text-red-500">{{ errorMessage }}</div>
                    <div>
                        <Input type="mail" texte="Email" v-model="email" @eper="traiterEmail"
                            @EmailValidation="emailValid = $event" />
                    </div>
                    <div>
                        <Input type="text" texte="Nom" v-model="nom" @eper="traiterNom"
                            @TextValidation="textValid = $event" />
                    </div>
                    <div>
                        <Input type="text" texte="Prénom" v-model="prenom" @eper="traiterPrenom"
                            @TextValidation="textValid = $event" />
                    </div>

                    <div>
                        <Input type="password" texte="Mot de passe" v-model="password" @eper="traiterPassword"
                            @PasswordValidation="passwordValid = $event" />
                    </div>

                    <div>
                        <Input clas="" type="password" texte="Confirmer le mot de passe" v-model="confirmpassword"
                            @eper="traiterPasswordConfirm" @PasswordValidation="passwordValid = $event" />
                    </div>
                    <div class="text-xs text-red-500">{{ errorPassword }}</div>

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
                        <button :disabled="loading" @click="CreateAccount()"
                            class="w-1/2 bg-[#329993] rounded-xl text-white py-2 hover:scale-105 duration-300">
                            <span v-if="loading">Chargement en cours...</span>
                            <span v-else>Créer un compte </span>
                        </button>
                    </div>
                    <div class="text-center mt-2 text-sm text-gray-600">
                        Avez-vous un compte ?
                        <router-link to="/login" class="text-sm text-blue-500 font-extrabold">Se connecter</router-link>

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
            email: '',
            adresse: '',
            nom: '',
            prenom: '',
            password: '',
            confirmpassword: '',
            errorPassword: '',
            errorMessage: '',
            loading: false,
            textValid: false,
            emailValid: false,
            passwordValid: false,
        };
    },

    methods: {
        traiterEmail(val) {
            this.email = val;
        },
        traiterNom(val) {
            this.nom = val;
        },
        traiterPrenom(val) {
            this.prenom = val;
        },
        traiterPassword(val) {
            this.password = val;
        },
        traiterPasswordConfirm(val) {
            this.confirmpassword = val;
        },

        async CreateAccount() {
            // console.log(this.email);
            // console.log(this.nom);
            // console.log(this.prenom);
            // console.log(this.password);
            this.loading = true;

            // Vérifier la disponibilité de la connexion Internet
            if (!navigator.onLine) {
                this.errorMessage = `Vous n'êtes pas connecté à Internet.
                 Veuillez vérifier votre connexion et réessayer.`;
                return;
            }
            // Vérification des champs requis
            else if (!this.email ||
                !this.nom ||
                !this.prenom ||
                !this.password ||
                !this.textValid ||
                !this.emailValid ||
                !this.passwordValid ||
                !this.confirmpassword

            ) {
                // console.log("Tous les champs doivent être remplis.");
                this.errorMessage = "Tous les champs doivent être remplis"
                this.loading = false;
                this.textValid = true;
                this.emailValid = true;
                this.passwordValid = true;
                return;
            }
            else if (this.password != this.confirmpassword) {
                this.errorPassword = "La confirmation de mot de passe ne correspond pas"
                this.loading = false;
                return;
            }
            else {
                this.errorMessage = "";
                const dataInscription = {
                    lastname: this.nom,
                    firstname: this.prenom,
                    email: this.email,
                    password: this.password,
                };

                try {
                    const response = await apiService.post("users", dataInscription);

                    const dataResponse = response.status;

                    if (dataResponse === 201) {
                        this.$router.push("/login");
                        // this.$router.push("/login");
                        // console.log(dataResponse);
                    };
                } catch (error) {
                    const dataError = error.response.status;
                    if (dataError === 400) {
                        // console.error(dataError);
                        this.errorMessage = "l'adresse email existe déjà"
                    }
                    else if (dataError === 401) {
                        this.errorMessage = `Une erreur est survenue lors de l'inscription. 
                    Il semble que la connexion avec notre serveur ait pris trop de temps pour répondre. 
                    Veuillez réessayer ultérieurement. 
                    Si le problème persiste, veuillez contacter le support technique pour obtenir de l'aide`
                    }
                    else if (dataError === 500) {
                        this.errorMessage = `Désolé, une erreur est survenue lors du traitement de votre inscription. 
                    Veuillez réessayer ultérieurement. 
                    Si le problème persiste, veuillez contacter le support technique pour obtenir de l'aide.`
                    }
                    else if (dataError === 502) {
                        this.errorMessage = `Désolé, une erreur s'est produite lors du traitement de votre inscription
                     en raison d'un problème avec notre serveur. Veuillez réessayer ultérieurement. 
                     Si le problème persiste, veuillez contacter le support technique pour obtenir de l'aide.`
                    }
                    else if (dataError === 503) {
                        this.errorMessage = `Désolé, notre service d'inscription est actuellement indisponible en 
                    raison d'une surcharge ou de travaux de maintenance. Veuillez réessayer ultérieurement. 
                    Si le problème persiste, veuillez contacter le support technique pour obtenir de l'aide`
                    }


                } finally {
                    this.loading = false;
                    this.errorPassword = "";
                    this.email = "";
                    this.nom = "";
                    this.prenom = "";
                    this.password = "";
                    this.confirmpassword = "";
                }
            }


        },
    },
};
</script>

<style scoped></style>
