<template>
  <article class="max-w-[calc(100%-32px)] lg:max-w-[800px] mx-auto">
    <UIMarkupRenderer :md-file="TermsContent" />
  </article>
</template>

<script setup lang="ts">
import TermsContent from "~/assets/mds/terms.md"
</script>
