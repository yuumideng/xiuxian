<template>
  <Teleport to="body">
    <Transition :name="position === 'bottom' ? 'modal-bottom' : 'modal'">
      <div v-if="modelValue" class="modal-overlay" :class="{ 'modal-overlay-bottom': position === 'bottom' }" @click="handleOverlayClick">
        <div class="modal-container" :class="{ 'modal-container-bottom': position === 'bottom' }" :style="width ? { maxWidth: `${width}px` } : {}" @click.stop>
          <!-- 装饰性背景 -->
          <div class="modal-decoration"></div>
          
          <!-- 头部 -->
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" @click="close">
              <span class="text-xl leading-none">×</span>
            </button>
          </div>
          
          <!-- 内容 -->
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <!-- 底部（可选） -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '提示'
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'center', // 'center' 或 'bottom'
    validator: (value) => ['center', 'bottom'].includes(value)
  },
  width: {
    type: Number,
    default: null // 默认不设置，使用100%
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOutside) {
    close()
  }
}

// 监听弹窗状态，控制body滚动
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 
    0 0 0 1px rgba(148, 163, 184, 0.1),
    0 20px 25px -5px rgba(0, 0, 0, 0.2),
    0 10px 10px -5px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* 纹理背景层 */
.modal-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
  background-image: 
    /* 细密网格纹理 */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(148, 163, 184, 0.03) 2px,
      rgba(148, 163, 184, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(148, 163, 184, 0.03) 2px,
      rgba(148, 163, 184, 0.03) 4px
    ),
    /* 对角线纹理 */
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(148, 163, 184, 0.02) 10px,
      rgba(148, 163, 184, 0.02) 20px
    ),
    /* 渐变底色 */
    linear-gradient(
      135deg,
      rgba(241, 245, 249, 0.5) 0%,
      rgba(248, 250, 252, 0.3) 50%,
      rgba(241, 245, 249, 0.5) 100%
    );
}

/* 装饰光晕 */
.modal-decoration::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(148, 163, 184, 0.08) 0%,
    rgba(148, 163, 184, 0.04) 40%,
    transparent 70%
  );
  border-radius: 50%;
}

.modal-decoration::after {
  content: '';
  position: absolute;
  bottom: -15%;
  left: -8%;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle,
    rgba(203, 213, 225, 0.06) 0%,
    rgba(203, 213, 225, 0.03) 40%,
    transparent 70%
  );
  border-radius: 50%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 252, 0.8) 0%,
    rgba(255, 255, 255, 0.6) 100%
  );
}

.modal-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  letter-spacing: 0.01em;
}

.modal-close {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(148, 163, 184, 0.1);
  color: #64748b;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.15s ease;
  padding: 0;
}

.modal-close:hover {
  background: rgba(148, 163, 184, 0.2);
  color: #334155;
}

.modal-close:active {
  transform: translateY(1px);
  background: rgba(148, 163, 184, 0.25);
}

.modal-body {
  padding: 0.75rem;
  overflow-y: auto;
  flex: 1;
  position: relative;
  z-index: 1;
}

.modal-footer {
  padding: 0.625rem 0.875rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(248, 250, 252, 0.8) 100%
  );
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}

/* 滚动条样式 */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #cbd5e0 0%, #94a3b8 100%);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
}

/* 底部弹出样式 */
.modal-overlay-bottom {
  align-items: flex-end;
  padding: 0;
}

.modal-container-bottom {
  max-width: 100%;
  width: 100%;
  max-height: 70vh;
  border-radius: 1rem 1rem 0 0;
  margin: 0;
}

/* 底部弹出动画 */
.modal-bottom-enter-active,
.modal-bottom-leave-active {
  transition: opacity 0.25s ease;
}

.modal-bottom-enter-active .modal-container,
.modal-bottom-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-bottom-enter-from,
.modal-bottom-leave-to {
  opacity: 0;
}

.modal-bottom-enter-from .modal-container,
.modal-bottom-leave-to .modal-container {
  transform: translateY(100%);
}

/* 响应式 */
@media (min-width: 640px) {
  .modal-container:not(.modal-container-bottom) {
    max-width: 600px;
  }
}

@media (min-width: 768px) {
  .modal-container:not(.modal-container-bottom) {
    max-width: 700px;
  }
}
</style>
