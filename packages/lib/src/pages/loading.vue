<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="loading">
    <div class="boxLoading" />
    <div class="textLoading">
      {{ t('pages.loading.title') }}
    </div>
  </div>
</template>
