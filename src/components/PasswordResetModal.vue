<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50" v-if="isOpen" @click.self="close">
    <div class="relative w-full max-w-2xl bg-white border border-gray-300 rounded-md shadow-lg text-black mx-auto p-8">
      <span class="absolute top-2 right-4 text-3xl cursor-pointer" @click="close">&times;</span>

      <!-- Título -->
      <div class="flex flex-col items-center">
        <h1 class="mt-4 mb-8 font-semibold text-xl">RECUPERAÇÃO DE SENHA</h1>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleResetRequest" id="reset-form" class="w-full max-w-md mx-auto">
        <div class="flex flex-col mb-8">
          <p class="text-black mb-4 text-center">Digite aqui seu email para que possamos enviar a recuperação de senha para seu email.</p>
          <label for="email" class="text-black font-sans text-base mb-2">Email</label>
          <input type="email" id="email" placeholder="Digite seu email aqui..." v-model="email" class="w-full h-11 p-3 rounded border border-stone-700 shadow-md">
        </div>

        <!-- Botão de envio -->
        <div class="flex justify-center mt-6">
          <button type="submit" class="flex items-center bg-[#FF8139] px-12 py-3 text-white rounded-md hover:bg-[#FF5C00] transition-colors">
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/config'
import { useToast } from 'vue-toastification'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async handleResetRequest() {
      const toast = useToast();
      try {
        const response = await axios.post('/reset-password', {
          email: this.email,
        });

        console.log('Instruções enviadas:', response.data);
        this.close();
        toast.success('Instruções de recuperação de senha enviadas para seu email!');
      } catch (error) {
        console.error('Erro ao solicitar recuperação de senha:', error);
        toast.error('Erro ao solicitar recuperação de senha. Tente novamente mais tarde.');
      }
    },
  },
};
</script>

<style scoped>
#email:hover {
  box-shadow: 0px 0px 20px -17px;
}
</style>
