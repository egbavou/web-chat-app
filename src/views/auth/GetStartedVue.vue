<template>
    <div class="flex">
      <!-- Partie de l'image -->
      <div class="flex flex-col items-center justify-center mx-auto mt-10">
        <img class="" src="@/assets/images/Message sent.png" alt="Background" />
        <h2 class=" mt-5 text-3xl">GlowChat</h2>
        <p class="text-center mt-3 text-base text-slate-400">
          Lorem ipsum dolor sit amet. Eos similique alias est voluptas galisum in
          eligendi
        </p>
        <div class=" w-1/3 px-2 py-1 rounded text-center font- mt-8 text-[#FFFFFF] bg-[#329993] hover:scale-105 duration-300">
            <router-link to="/login" class="">Get Started</router-link>

        </div>
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
        
      };
    },
  
    
  };
  </script>
  
  <style scoped></style>
  