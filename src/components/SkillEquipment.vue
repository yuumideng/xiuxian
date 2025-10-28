<template>
  <div class="skill-equipment bg-white rounded p-3">
    <h3 class="text-sm font-medium mb-2">功法&装备</h3>
    
    <!-- 8个按钮在同一行,中间有间隔 -->
    <div class="flex gap-3">
      <!-- 功法4个按钮 -->
      <div class="grid grid-cols-4 gap-1.5 flex-1">
        <GameButton color="dark" custom-class="flex-col">
          <span>修炼</span>
          <span>功法</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>本命</span>
          <span>功法</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>自创</span>
          <span>功法</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>功法</span>
          <span>列表</span>
        </GameButton>
      </div>

      <!-- 装备4个按钮 -->
      <div class="grid grid-cols-4 gap-1.5 flex-1">
        <GameButton color="dark" custom-class="flex-col">
          <span>佩戴</span>
          <span>装备</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>本命</span>
          <span>法宝</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>炼制</span>
          <span>法宝</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>装备</span>
          <span>列表</span>
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import GameButton from './common/GameButton.vue'
</script>

<style scoped>
</style>
