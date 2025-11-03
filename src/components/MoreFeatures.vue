<template>
  <div class="more-features bg-white rounded p-3">
    <h3 class="text-sm font-medium mb-2">更多功能</h3>

    <div class="space-y-1.5">
      <!-- 第一行：8个单字按钮 -->
      <div class="grid grid-cols-8 gap-1.5">
        <GameButton color="dark" custom-class="flex-col">
          <span>背包</span>
          <span>系统</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>仙战</span>
          <span>榜单</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>抢夺</span>
          <span>灵脉</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>试炼</span>
          <span>塔</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>宗门</span>
          <span>系统</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>世界</span>
          <span>Boss</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>收服</span>
          <span>灵兽</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>征战</span>
          <span>事件</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>天骄</span>
          <span>战</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>仙魔</span>
          <span>入侵</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>星罗</span>
          <span>棋道阵</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>阵法</span>
          <span>系统</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>仙缘</span>
          <span>秘境</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>洞府</span>
          <span>系统</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>九霄</span>
          <span>通天塔</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>玩家</span>
          <span>排名</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>奇遇</span>
          <span>系统</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>遗忘</span>
          <span>之虚</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>轮回</span>
          <span>洞天</span>
        </GameButton>
      </div>

    </div>
  </div>

  <!-- 底部固定按钮区块 -->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
    <!-- 6个按钮同一行 -->
    <div class="grid grid-cols-6 gap-1.5 mb-3">
      <GameButton color="dark" custom-class="flex-col">
        <span>坊市</span>
        <span>系统</span>
      </GameButton>
      <GameButton color="dark" custom-class="flex-col">
        <span>离线</span>
        <span>挂机</span>
      </GameButton>
      <GameButton color="dark" custom-class="flex-col">
        <span>轮回</span>
        <span>重修</span>
      </GameButton>
      <GameButton color="dark" custom-class="flex-col">
        <span>成就</span>
        <span>系统</span>
      </GameButton>
      <GameButton color="dark" custom-class="flex-col" @click="openSettings">
        <span>游戏</span>
        <span>设置</span>
      </GameButton>
      <GameButton color="red" custom-class="flex-col">
        <span>购买</span>
        <span>资源</span>
      </GameButton>
    </div>

    <!-- 底部版本信息 -->
    <div class="flex items-center justify-between text-xs text-gray-400">
      <span>AD2F39_2E9605_7A60EF</span>
      <span>9.23 Fates</span>
      <span>ios VIP v10.24(3)</span>
    </div>
  </div>
  
  <!-- 游戏设置弹窗 -->
  <SettingsModal v-model="showSettingsModal" />
</template>

<script setup>
import { ref } from 'vue'
import GameButton from './common/GameButton.vue'
import SettingsModal from './SettingsModal.vue'

// 控制设置弹窗显示
const showSettingsModal = ref(false)

// 打开设置
const openSettings = () => {
  showSettingsModal.value = true
}
</script>

<style scoped></style>
