<template>
    <div class="flex  ">
      <!-- Partie du formulaire -->
      <div class="flex m-auto items-center justify-center w-1/2">
        <div class="max-w-md w-full ">
          
            <h2 class=" text-center text-[50px] font-extrabold text-gray-900">Welcome Back</h2>
          
          <div>
            <h2 class=" mb-3 text-center text-xs text-gray-900">Lorem ipsum dolor sit amet. Eos similique </h2>
          </div>
          <form class="mt-8 space-y-6" @submit.prevent="submitForm">
            <!-- Les champs du formulaire ici -->
            <div>
              <label for="username" class="sr-only">Nom d'utilisateur</label>
              <input v-model="username" id="username" name="username" type="text" autocomplete="username" required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom d'utilisateur">
            </div>
            <div>
              <label for="email" class="sr-only">Adresse e-mail</label>
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse e-mail">
            </div>

            <div class="flex justify-between items-center mt-4">
          <div>
            <input type="checkbox" id="rememberMe" class="mr-2">
            <label for="rememberMe">Souvenez-vous de moi</label>
          </div>
          <div>
            <a href="#" class="text-sm text-blue-500 hover:underline">Mot de passe oublié?</a>
          </div>
        </div>
  
            <div class="text-center">
                <button class="w-1/2 bg-[#329993] rounded-xl text-white py-2 hover:scale-105 duration-300">S'inscrire</button>
            </div>
            
            
          </form>
        </div>
      </div>
  
      <!-- Partie de l'image -->
      <div class="mt-20 p-10 flex flex-col items-center h-screen ml-4">
        <img class="" src="@/assets/images/Message sent.png" alt="Background">
        <h2 class="text-3xl">GlowChat</h2>
        <p class="text-center text-base text-slate-400">Un projet Web Avancé réalisé en groupe par les <b>étudiants en Master 1 IFRI UAC 2023-2024</b>.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const username = ref('');
  const email = ref('');
  
  const submitForm = () => {
    // Logique de soumission du formulaire ici
    console.log('Formulaire soumis avec succès');
    // Rediriger vers une autre page après l'inscription
    router.push({ name: 'home' });
  };
  </script>
  
  <style scoped>
  
  </style>
  