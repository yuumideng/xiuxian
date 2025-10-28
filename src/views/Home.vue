<template>
  <div class="home-page min-h-screen bg-gray-100 pb-24">
    <!-- 顶部资源栏 -->
    <div class="p-2 space-y-1">
      <TopBar />
    </div>

    <!-- 主要内容区 -->
    <div class="px-2 space-y-2">
      <!-- 历练信息卡片(包含操作按钮) -->
      <PlayerCard />

      <!-- 天赋&灵根 -->
      <TalentSection />

      <!-- 战斗数据 -->
      <BattleStats />

      <!-- 功法&装备 -->
      <SkillEquipment />

      <!-- 更多功能 -->
      <MoreFeatures />
    </div>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
import PlayerCard from '@/components/PlayerCard.vue'
import TalentSection from '@/components/TalentSection.vue'
import BattleStats from '@/components/BattleStats.vue'
import SkillEquipment from '@/components/SkillEquipment.vue'
import MoreFeatures from '@/components/MoreFeatures.vue'
</script>

<style scoped></style>
