<template>
  <div class="top-bar space-y-1">
    <!-- 灵石和仙玉 -->
    <div class="bg-white rounded px-3 py-1.5 flex items-center justify-between text-xs">
      <div class="space-y-0.5">
        <div class="text-gray-700">
          灵石：<span class="font-medium">51.89万亿⁵</span>
          <span class="text-green-600">(+2409.11亿⁵/10天)</span>
        </div>
        <div class="text-gray-700">仙玉：<span class="font-medium">16,489,235</span></div>
      </div>
      <button
        class="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-xl text-gray-600"
      >
        +
      </button>
    </div>

    <!-- 游戏时间 -->
    <div class="bg-teal-100 rounded px-3 py-1.5 flex items-center justify-between text-xs">
      <div class="text-gray-700">
        第<span class="font-medium">39207399</span>80年
        <span class="text-gray-500">(4151520天/秒)</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="w-6 h-6 rounded-full border border-red-400 flex items-center justify-center">
          <span class="text-red-500 text-xs">已暂停</span>
        </button>
        <button
          class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
        >
          ▶
        </button>
        <button
          class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
        >
          ⚙
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
