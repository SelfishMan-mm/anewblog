// 占位图片生成工具

export function generatePlaceholderImage(
  width: number = 400,
  height: number = 300,
  text?: string,
  bgColor: string = '1f2937',
  textColor: string = 'ffffff'
): string {
  const displayText = text || `${width}×${height}`;
  
  // 使用 SVG 数据 URI 替代外部服务
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${bgColor}dd;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#${textColor}" text-anchor="middle" dy=".3em">
        ${displayText}
      </text>
    </svg>
  `)}`;
}

export function generateGradientPlaceholder(
  width: number = 400,
  height: number = 300,
  text?: string
): string {
  const colors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-red-600',
    'from-indigo-500 to-purple-600',
    'from-pink-500 to-rose-600'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">
        ${text || `${width}×${height}`}
      </text>
    </svg>
  `)}`;
}

// 为项目生成占位图片
export function getProjectPlaceholder(projectName: string, index: number): string {
  const width = 800;
  const height = 600;
  
  // 根据项目类型选择不同的颜色
  const colorMap: Record<string, string> = {
    'cpp-chatroom': '2563eb', // 蓝色
    'CryptoDash': '7c3aed', // 紫色
    '数据爬虫工具': '059669', // 绿色
    'AI智能助手': 'dc2626', // 红色
    'DeFi数据分析平台': 'ea580c', // 橙色
    '个人网站': '0891b2' // 青色
  };
  
  const bgColor = colorMap[projectName] || '374151';
  
  return generatePlaceholderImage(width, height, projectName, bgColor);
}

// 为头像生成占位图片
export function getAvatarPlaceholder(name: string, size: number = 128): string {
  const initial = name.charAt(0).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50%" cy="50%" r="50%" fill="url(#avatarGrad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">
        ${initial}
      </text>
    </svg>
  `)}`;
}

// 为技能生成图标占位符
export function getSkillIconPlaceholder(skillName: string, size: number = 48): string {
  const initial = skillName.charAt(0).toUpperCase();
  
  // 根据技能类型选择颜色
  const colorMap: Record<string, string[]> = {
    'Python': ['#3776ab', '#ffd43b'],
    'C++': ['#00599c', '#004482'],
    'JavaScript': ['#f7df1e', '#000000'],
    'TypeScript': ['#3178c6', '#ffffff'],
    'React': ['#61dafb', '#20232a'],
    'Next.js': ['#000000', '#ffffff'],
    'Node.js': ['#339933', '#ffffff'],
    'MongoDB': ['#47a248', '#ffffff'],
    'MySQL': ['#4479a1', '#ffffff'],
    'PyTorch': ['#ee4c2c', '#ffffff'],
    'TensorFlow': ['#ff6f00', '#ffffff'],
    'Scrapy': ['#60a839', '#ffffff'],
    'Pandas': ['#150458', '#ffffff'],
    'NumPy': ['#013243', '#ffffff'],
    'Web3.js': ['#f16822', '#ffffff'],
    'Solidity': ['#363636', '#ffffff']
  };
  
  const colors = colorMap[skillName] || ['#6b7280', '#ffffff'];
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[1] || colors[0]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="8" fill="url(#skillGrad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">
        ${initial}
      </text>
    </svg>
  `)}`;
}