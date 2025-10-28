<template>
  <button 
    :class="[
      'rounded h-10 text-xs flex items-center justify-center leading-none transition-colors',
      colorClass,
      customClass
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'dark' // dark, red, gray
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const colorClass = computed(() => {
  const colors = {
    dark: 'bg-gray-800 text-white hover:bg-gray-700',
    red: 'bg-red-500 text-white hover:bg-red-600',
    gray: 'bg-gray-700 text-white hover:bg-gray-600'
  }
  return colors[props.color] || colors.dark
})
</script>
