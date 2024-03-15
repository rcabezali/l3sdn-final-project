<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6" style="text-align: center">Page de Profil</div>
        <div style="margin-top: 20px">
          <p>ID Utilisateur : {{ userId }}</p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userId: 'user_id_ici'
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
