/**
 * 中文数值格式化工具
 * 按照中文计数习惯格式化数字
 * 
 * 规则：
 * - 低于万：直接显示数字
 * - 万到亿：显示xxx万，保留两位有效数字
 * - 亿以上：使用亿、亿亿、亿亿亿等单位，保留两位有效数字
 */

/**
 * 格式化数字为中文计数方式
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function formatChineseNumber(num) {
  if (num === 0) return '0'
  if (num < 0) return '-' + formatChineseNumber(-num)
  
  // 低于万的数值，直接展示数字
  if (num < 10000) {
    return Math.floor(num).toLocaleString()
  }
  
  // 万到亿之间，展示xxx万
  if (num < 100000000) { // 1亿 = 100,000,000
    const wanValue = num / 10000
    return formatTwoSignificantDigits(wanValue) + '万'
  }
  
  // 亿到万亿之间，展示xxx亿
  if (num < 1000000000000) { // 1万亿 = 1,000,000,000,000
    const yiValue = num / 100000000
    return formatTwoSignificantDigits(yiValue) + '亿'
  }
  
  // 万亿到万万亿之间，展示xxx万亿
  if (num < 10000000000000000) { // 1万万亿 = 10^16
    const wanYiValue = num / 1000000000000
    return formatTwoSignificantDigits(wanYiValue) + '万亿'
  }
  
  // 万万亿以上，使用亿亿、亿亿亿等
  // 1亿亿 = 1亿 × 1亿 = 10^16
  if (num < 10000000000000000000000000) { // 小于10^24，显示为亿亿
    const yiYiValue = num / 10000000000000000 // 除以10^16
    return formatTwoSignificantDigits(yiYiValue) + '亿亿'
  } else if (num < 1000000000000000000000000000000000) { // 小于10^32，显示为亿亿亿
    const yiYiYiValue = num / 1000000000000000000000000 // 除以10^24
    return formatTwoSignificantDigits(yiYiYiValue) + '亿亿亿'
  } else if (num < 100000000000000000000000000000000000000000) { // 小于10^40，显示为亿亿亿亿
    const yiYiYiYiValue = num / 100000000000000000000000000000000 // 除以10^32
    return formatTwoSignificantDigits(yiYiYiYiValue) + '亿亿亿亿'
  } else {
    // 更大的数值，计算需要多少个亿
    let tempNum = num
    let yiCount = 0
    
    // 每次除以10^8 (1亿)，计算有多少个亿
    while (tempNum >= 100000000) {
      tempNum = tempNum / 100000000
      yiCount++
    }
    
    const formattedValue = formatTwoSignificantDigits(tempNum)
    
    // 生成单位
    let unit = ''
    if (yiCount >= 5) {
      unit = '亿' + toSuperscript(yiCount)
    } else {
      unit = '亿'.repeat(yiCount)
    }
    
    return formattedValue + unit
  }
}

/**
 * 保留两位有效数字，智能处理小数点显示
 * 规则：
 * - 100.00亿 → 100亿 (去掉无意义的.00)
 * - 100.10亿 → 100.1亿 (去掉末尾的0)
 * - 100.11亿 → 100.11亿 (保留有意义的两位小数)
 * - 100.01亿 → 100.01亿 (保留有意义的小数)
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
function formatTwoSignificantDigits(num) {
  // 先保留两位小数
  let result = num.toFixed(2)
  
  // 去掉末尾的0，但保留有意义的数字
  // 例如：100.00 -> 100, 100.10 -> 100.1, 100.01 -> 100.01, 100.11 -> 100.11
  result = result.replace(/\.?0+$/, '')
  
  return result
}

/**
 * 将数字转换为上角标
 * @param {number} num - 数字
 * @returns {string} 上角标字符串
 */
function toSuperscript(num) {
  const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
  }
  
  return num.toString().split('').map(digit => superscriptMap[digit] || digit).join('')
}

/**
 * 简化版格式化函数，用于替换现有的formatNumber函数
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num) {
  return formatChineseNumber(num)
}

// 导出默认函数
export default formatChineseNumber