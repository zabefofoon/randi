<template>
    <div>
        <slot
            name="title"
            :expand="expand"
            :is-expanded="isExpanded" />

        <Transition name="folderable">
            <div v-if="isExpanded">
                <div class="inner">
                    <slot
                        name="content"
                        :expand="expand"
                        :is-expanded="isExpanded" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    const isExpanded = defineModel<boolean>()
    const expand = (value?: boolean): void => {
        isExpanded.value = value == null ? !isExpanded.value : value
    }
</script>
