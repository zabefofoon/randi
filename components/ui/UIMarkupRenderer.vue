<template>
  <div class="markdown-body">
    <span v-html="renderedHTML"></span>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it"
import "~/assets/styles/markdown.css"

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mdFile?: any
  content?: string
}>()

const renderedHTML = ref<string>("")

onMounted(() => {
  loadMarkdown()
})

const loadMarkdown = async () => {
  const md = new MarkdownIt({
    html: true,
  })

  let resStr = ""

  if ((props.mdFile ?? "") != "") {
    const res = await $fetch<string>(props.mdFile)
    resStr = res
  } else {
    resStr = props.content ?? ""
  }

  renderedHTML.value = md.render(resStr)
}
</script>
