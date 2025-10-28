<template>
  <div class="skill-equipment bg-white rounded p-3">
    <h3 class="text-sm font-medium mb-2">功法&装备</h3>
    
    <!-- 8个按钮在同一行,中间有间隔 -->
    <div class="flex gap-3">
      <!-- 功法4个按钮 -->
      <div class="grid grid-cols-4 gap-1.5 flex-1">
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>修炼</span>
          <span>功法</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>本命</span>
          <span>功法</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>自创</span>
          <span>功法</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>功法</span>
          <span>列表</span>
        </button>
      </div>

      <!-- 装备4个按钮 -->
      <div class="grid grid-cols-4 gap-1.5 flex-1">
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>佩戴</span>
          <span>装备</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>本命</span>
          <span>法宝</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>炼制</span>
          <span>法宝</span>
        </button>
        <button class="bg-gray-800 text-white rounded py-2 text-xs hover:bg-gray-700 flex flex-col items-center justify-center leading-tight">
          <span>装备</span>
          <span>列表</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
