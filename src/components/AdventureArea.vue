<template>
  <div class="adventure-area bg-white rounded shadow-sm">
    <!-- 标题 -->
    <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200">
      <span class="text-sm font-medium">历练</span>
      <button class="text-xs text-blue-600">切换地图</button>
    </div>

    <!-- 内容 -->
    <div class="p-3 space-y-2">
      <div class="text-xs space-y-1">
        <div class="text-gray-600">当前位置: <span class="text-purple-600 font-medium">九天玄境</span></div>
        <div class="text-gray-600">历练进度: <span class="font-medium">85%</span></div>
      </div>

      <!-- 进度条 -->
      <div class="w-full bg-gray-200 rounded-full h-1.5">
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style="width: 85%"></div>
      </div>

      <!-- 按钮 -->
      <div class="flex gap-2">
        <button class="flex-1 bg-green-500 text-white rounded py-1.5 text-xs font-medium">开始历练</button>
        <button class="flex-1 bg-gray-800 text-white rounded py-1.5 text-xs font-medium">停止历练</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
