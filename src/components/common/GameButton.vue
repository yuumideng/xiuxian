<template>
  <button
    :class="[
      'rounded h-10 text-xs flex items-center justify-center leading-none transition-colors',
      colorClass,
      customClass
    ]"
    :disabled="disabled"
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
    default: 'dark' // dark, red, gray, disabled
  },
  customClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const colorClass = computed(() => {
  if (props.disabled) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
  }
  
  const colors = {
    dark: 'bg-gray-800 text-white hover:bg-gray-700',
    red: 'bg-red-500 text-white hover:bg-red-600',
    gray: 'bg-gray-400 text-gray-100 hover:bg-gray-500'
  }
  return colors[props.color] || colors.dark
})
</script>
