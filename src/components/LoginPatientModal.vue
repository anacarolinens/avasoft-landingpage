<template>
  <div class="modal" v-if="isOpen" @click.self="close">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <div class="flex flex-col items-center">
        <img class="w-25 h-20" src="../assets/login-logo.png" alt="">
        <h1 class="mt-10 mb-10 rounded font-semibold">ÁREA DO PACIENTE</h1>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="flex flex-col">
          <label for="name">Usuário</label>
          <input type="text" id="name" v-model="userName" class="mt-2 mb-5 rounded border border-stone-700 p-2" placeholder="Digite seu usuário aqui..." required>

          <label for="pass">Senha</label>
          <input type="password" id="pass" v-model="password" class="mt-2 mb-5 rounded border border-stone-700 p-2" placeholder="Digite sua senha aqui..." required>
        </div>

        <p class="text-end text-sm cursor-pointer underline">
          <a @click="openPasswordResetModal">Esqueceu a senha?</a>
        </p>
        <div class="flex justify-center mt-10">
          <button type="submit" class="flex items-center bg-[#FF8139] px-12 py-3 text-white rounded-md hover:bg-[#FF5C00]">
            Entrar
          </button>
        </div>
      </form>
    </div>
    <!-- Modal de Recuperação de Senha -->
    <PasswordResetModal
        v-if="isPasswordResetModal"
        :isOpen="isPasswordResetModal"
        @close="closePasswordResetModal"
      />

  </div>
</template>

<script>
import axios from '../plugins/config';
import { useToast } from 'vue-toastification';
import PasswordResetModal from './PasswordResetModal.vue';

export default {
  components: {
    PasswordResetModal
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      userName: '',
      password: '',
      isPasswordResetModal: false
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    openPasswordResetModal() {
      this.isPasswordResetModal = true;
    },
    closePasswordResetModal() {
      this.isPasswordResetModal = false;
    },
    async handleLogin() {
      const toast = useToast();
      try {
        const {data:{data}} = await axios.post('/login', { 
          userName: this.userName,
          password: this.password,
        });                                                                                                                
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        this.$router.push('/homePatient');
        this.close();
      } catch (error) {
        if (error.response) {
          toast.error('Usuário ou senha incorretos. Tente novamente.');
          console.error('Erro ao fazer login:', error.response.data);
        } else if (error.request) {
          toast.error('Erro ao fazer login: Nenhuma resposta do servidor.');
          console.error('Erro ao fazer login: Nenhuma resposta do servidor');
        } else {
          toast.error('Erro ao fazer login.');
          console.error('Erro ao fazer login:', error.message);
        }
      }
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
  width: 800px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 40px;
  cursor: pointer;
}
</style>