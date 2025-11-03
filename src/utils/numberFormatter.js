/**
 * 中文数值格式化工具
 * 按照中文计数习惯格式化数字
 * 
 * 规则：
 * - 低于亿：直接显示完整数字
 * - 亿以上：使用亿、亿亿、亿亿亿等单位，保留两位有效数字
 */

/**
 * 格式化数字为中文计数方式
 * 规则：
 * - 亿 (1e8)
 * - 万亿 (1e12)
 * - 亿亿 (1e16)
 * - 万亿亿 (1e20)
 * - 亿亿亿 (1e24)
 * - 万亿亿亿 (1e28)
 * - 亿亿亿亿 (1e32)
 * - 万亿亿亿亿 (1e36)
 * - 亿⁵ (1e40) - 当亿的数量超过5个时使用角标
 * - 万亿⁵ (1e44)
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export function formatChineseNumber(num) {
  if (num === 0) return '0'
  if (num < 0) return '-' + formatChineseNumber(-num)
  
  // 低于亿的数值，直接展示完整数字
  if (num < 100000000) { // 1亿 = 100,000,000
    return Math.floor(num).toString()
  }
  
  // 亿以上，使用完整的单位体系：万、亿、万亿、亿亿、万亿亿...
  // 计算是第几个"级别"（每4位数一个级别）
  const level = Math.floor(Math.log10(num) / 4);
  
  // 判断是"万"系列还是"亿"系列
  // level: 2=亿(1e8), 3=万亿(1e12), 4=亿亿(1e16), 5=万亿亿(1e20)...
  const yiCount = Math.floor(level / 2); // 有多少个"亿"
  const hasWan = level % 2 === 1; // 是否有"万"前缀
  
  const divisor = Math.pow(10, level * 4);
  const value = num / divisor;
  
  // 构建单位
  let unit = '';
  if (yiCount <= 5) {
    // 5个亿及以下：直接重复"亿"
    if (hasWan) unit = '万';
    unit += '亿'.repeat(yiCount);
  } else {
    // 超过5个亿：使用角标
    if (hasWan) unit = '万';
    unit += '亿' + toSuperscript(yiCount);
  }
  
  return formatTwoSignificantDigits(value) + unit;
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