<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading" />
  </div>
</template>

<script>

export default {
  name: 'callback',
  async created () {
    // await this.$store.dispatch('authentication/handleLogin')
    //   .then(() => this.$router.replace('/'))
    //   .catch((err) => {
    //     console.log('Error loging in: ', err);
    //     this.$router.replace('/login-error');
    //   });
    try {
      await this.$store.dispatch('authentication/handleLogin');
      console.log('Got a result from action');
      this.$router.replace('/');
    } catch (e) {
      console.log('Error loging in: ', e);
      this.$router.replace('/login-error');
    }
  }
};
</script>

<style>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
