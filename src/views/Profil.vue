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
                    <img :src="user.photo" alt="Photo de profil" class="w-full h-full object-cover">
                </div>
                <!-- Champ de téléchargement pour changer l'image -->
                <input ref="fileInput" type="file" @change="handleFileUpload" class="hidden">

                <!-- Nom de l'utilisateur -->
                <div class="mb-4 border-b border-gray-300 pb-4">
                    <label for="name" class="block text-sm font-medium text-gray-400">Nom</label>
                    <input v-model="user.name" type="text" id="name" placeholder="Nom"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Profession de l'utilisateur -->
                <div class="mb-4 border-b border-gray-300 pb-4">
                    <label for="profession" class="block text-sm font-medium text-gray-400">Info</label>
                    <input v-model="user.profession" type="text" id="profession" placeholder="Profession"
                        class="mt-1 px-4 py-2 rounded-lg w-full">
                </div>

                <!-- Numéro de l'utilisateur -->
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
                name: "John Doe",
                profession: "Développeur",
                phone: "0123456789",
                photo: "/src/assets/images/Message sent.png"
            }
        };
    },
    methods: {
        async saveProfile() {
            // Ici vous pouvez implémenter la logique pour sauvegarder les modifications
            //console.log("Profil sauvegardé :", this.user);
            // Par exemple, vous pouvez envoyer les données à un serveur via une requête HTTP

            const dataConnexion = {
                strategy: "jwt",
            };
            //console.log(token);
            const token = localStorage.getItem('accessToken');
            console.log(token);
            const response = await apiService.post("authentication", {
                strategy: "jwt",
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);

        },
        openFileUpload() {
            // Simule un clic sur le champ de téléchargement de fichier
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.user.photo = reader.result;
            };

            reader.readAsDataURL(file);
        }
    }
};
</script>
  
<style scoped></style>
  