<template>
  <article class="max-w-[calc(100%-32px)] lg:max-w-[800px] mx-auto">
    <UIMarkupRenderer :md-file="PrivacyContent" />
  </article>
</template>

<script setup lang="ts">
import PrivacyContent from "~/assets/mds/privacy.md"
</script>
