<template>
    <div class="container-reset flex flex-col items-center max-w-full pt-1">
        
      <!-- Logo da Avasoft -->
      <img src="../assets/login-logo.png" alt="Logo Avasoft" class="w-25 h-20 mt-10" />
  
      <!-- Título de redefinição de senha -->
      <h1 class="mt-4 mb-10 text-xl font-semibold">REDEFINIÇÃO DE SENHA</h1>
  
      <!-- Formulário de redefinição de senha -->
      <form action="" class="w-full max-w-md">
        <div class="flex flex-col">
          <label for="newPassword">Nova Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha aqui..."
            class="mt-2 mb-5 rounded border border-stone-700 p-2"
            v-model="newPassword"
          />
  
          <label for="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Digite a senha novamente..."
            class="mt-2 mb-5 rounded border border-stone-700 p-2"
            v-model="confirmPassword"
          />
        </div>
  
        <div class="flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            class="flex items-center bg-[#FF8139] px-12 py-3 rounded-md text-white hover:bg-[#FF5C00]"
            @click="handlePasswordReset"
          >
            Redefinir
          </button>
          <router-link to="/" class="text-black cursor-pointer underline">Fazer Login</router-link>
        </div>
      </form>
    </div>
</template>

<script>
import axios from '../plugins/config'
import { useToast } from 'vue-toastification'

export default {
    data() {
        return {
            resetToken: this.$route.params.resetToken,
            newPassword: '',
            confirmPassword: '',
        }
    },
    methods: {
        async handlePasswordReset() {
            const toast = useToast();
            if (this.newPassword !== this.confirmPassword) {
                toast.error('As senhas não coincidem!');
                return;
            }

            try {
                const response = await axios.post(`/reset-password-confirm/${resetToken}`, {
                    resetToken: this.resetToken,
                    newPassword: this.newPassword,
                    confirmPassword:this.confirmPassword
                });
                toast.success('Senha redefinida com sucesso!');
                console.log(response);
            } catch (error) {
                console.log(error);
                toast.error('Erro ao redefinir a senha!');
            }
        },
    },
};
</script>

<style scoped>


</style>