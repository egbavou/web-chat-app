<template>
    <div>
        <!-- Bouton pour ouvrir le pop-up -->
        <button @click="showProfilePopup = true"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir le profil</button>

        <!-- Pop-up du profil -->
        <div v-if="showProfilePopup"
            class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <!-- Contenu du pop-up -->
            <div class="bg-white p-8 rounded-lg">
                <!-- Photo de profil -->
                <div @click="openFileUpload"
                    class="w-32 h-32 border-2 border-solid mx-auto mb-4 rounded-full overflow-hidden cursor-pointer">
                    <img :src="user.photoUrl || 'placeholder.jpg'" class="w-full h-full object-cover">
                </div>
                <!-- Champ de téléchargement pour changer l'image -->
                <input ref="fileInput" type="file" @change="handleFileUpload" class="hidden">

                <!-- Nom de l'utilisateur -->
                <div class="mb-4 border-b border-gray-300 pb-4">
                    <label for="firstname" class="block text-sm font-medium text-gray-400">Prénom</label>
                    <input v-model="user.firstname" type="text" id="firstname" placeholder="Prénom"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Nom de famille de l'utilisateur -->
                <div class="mb-4 border-b border-gray-300 pb-4">
                    <label for="lastname" class="block text-sm font-medium text-gray-400">Nom de famille</label>
                    <input v-model="user.lastname" type="text" id="lastname" placeholder="Nom de famille"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Email de l'utilisateur -->
                <div class="mb-4 border-b border-gray-300 pb-4">
                    <label for="email" class="block text-sm font-medium text-gray-400">Email</label>
                    <input v-model="user.email" type="email" id="email" placeholder="Email"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Numéro de téléphone de l'utilisateur -->
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-400">Téléphone</label>
                    <input v-model="user.phone" type="text" id="phone" placeholder="Numéro de téléphone"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Bouton pour sauvegarder les modifications -->
                <div class="flex justify-center">
                    <button @click="saveProfile"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Sauvegarder</button>

                    <!-- Bouton pour fermer le pop-up -->
                    <button @click="showProfilePopup = false"
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Fermer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from "@/views/Services/configs/apiService.js";

export default {
    data() {
        return {
            showProfilePopup: false,
            user: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                photoUrl: null
            }
        };
    },
    methods: {
        async fetchData() {
            const token = localStorage.getItem('accessToken');

            console.log(token);

            if (token) {
                try {
                    const response = await apiService.post('authentication', {
                        strategy: 'jwt',
                        accessToken: token
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(response.data.user);
                    const userData = response.data.user;

                    // Mettre à jour les données de l'utilisateur dans le formulaire
                    // this.user._id = userData._id;
                    this.user.firstname = userData.firstname;
                    this.user.lastname = userData.lastname;
                    this.user.email = userData.email;
                    this.user.phone = userData.phone;
                    this.user.photoUrl = userData.photoUrl;
                    // Vérifier s'il existe une URL de photo dans le localStorage
                    //const storedPhotoUrl = localStorage.getItem('userPhotoUrl');
                    // if (storedPhotoUrl) {
                    //     this.user.photoUrl = storedPhotoUrl;
                    // } else {
                    //     this.user.photoUrl = userData.photoUrl;
                    // }

                } catch (error) {
                    console.error('Erreur lors de la requête:', error);
                }
            } else {
                console.error('Aucun jeton JWT trouvé dans le stockage local');
            }
        },

        async saveProfile() {
            const token = localStorage.getItem('accessToken');

            if (token) {
                try {
                    const formData = new FormData();
                    formData.append('firstname', this.user.firstname);
                    formData.append('lastname', this.user.lastname);
                    formData.append('email', this.user.email);
                    formData.append('phone', this.user.phone);
                    formData.append('status', this.user.status);
                    formData.append('action', 'UPDATE_INFOS');
                    // Ajoutez la photo si elle est définie
                    if (this.user.photoUrl) {
                        formData.append('file', this.$refs.fileInput.files[0]);
                    }

                    const response = await apiService.patch('users', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    //localStorage.setItem('userPhotoUrl', this.user.photoUrl);
                    console.log(response.data);
                    // Mettre à jour les données de l'utilisateur si nécessaire
                    // Par exemple, si le backend renvoie les nouvelles informations de l'utilisateur
                    // Vous pouvez les mettre à jour comme ceci :
                    //this.user = response.data;
                    // Ou si vous avez besoin de recharger les données de l'utilisateur
                    // this.fetchData();

                    // Fermer le pop-up après avoir sauvegardé les modifications
                    this.showProfilePopup = false;

                } catch (error) {
                    console.error('Erreur lors de la requête:', error);
                }
            } else {
                console.error('Aucun jeton JWT trouvé dans le stockage local');
            }
        },

        openFileUpload() {
            // Simule un clic sur le champ de téléchargement de fichier
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.user.photoUrl = reader.result;
            };

            reader.readAsDataURL(file);
        },
        // logout() {
        //     // Supprimer l'utilisateur du localStorage
        //     localStorage.removeItem('accessToken')

        //     // Rediriger vers la page de démarrage
        //     this.$router.push({ name: 'demarrage' })
        // }

    },
    mounted() {
        this.fetchData();
        // this.logout();

    },
};
</script>
