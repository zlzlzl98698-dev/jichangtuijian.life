const fs = require('fs');

// 1. Expand scenarios/ai-copilot.md
const expandAiCopilot = () => {
  const file = 'content/scenarios/ai-copilot.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 7. AI 开发者 API 自动化重试与高可用熔断工程实战 (Python / Node.js)

面向调用 OpenAI API（GPT-4o、o1）或 Anthropic API（Claude 3.5 Sonnet）的生产系统，单一节点故障会导致服务全局瘫痪。生产级系统必须引入代理池自动熔断机制：

\`\`\`python
import time
import httpx
from openai import OpenAI

# 配置多节点高可用网关轮询
PROXIES = [
    "http://127.0.0.1:7897",  # 本地 Clash 专线代理端口
    "http://127.0.0.1:10809", # 备用 v2rayN 专线代理端口
]

def create_resilient_client():
    for proxy in PROXIES:
        try:
            http_client = httpx.Client(
                proxy=proxy,
                timeout=httpx.Timeout(30.0, connect=5.0)
            )
            client = OpenAI(
                api_key="sk-your-valid-api-key",
                http_client=http_client
            )
            # 发起轻量健康探测
            res = client.models.list()
            print(f"[健康检查成功] 节点网关 {proxy} 握手正常")
            return client
        except Exception as e:
            print(f"[警告] 节点网关 {proxy} 握手失败: {e}，自动降级至备用链路...")
            continue
    raise RuntimeError("所有可用专线网关均异常，请检查机场订阅状态！")
\`\`\`

---

## 8. 指纹浏览器与住宅 IP 深度防关联全流程

对于使用 Web 网页端登录 ChatGPT Plus 或 Claude 3.5 的开发者，必须建立严格的**环境隔离物理墙**：
1. **浏览器隔离**：使用开源指纹浏览器（如 Brave 隐私增强模式或专业防关联浏览器），禁用一切带有中国大陆 IP 缓存的扩展插件；
2. **WebRTC 物理熔断**：在浏览器地址栏输入 \`about:config\` 或在插件中开启 **WebRTC Leak Prevent**，将模式设置为 \`Disable non-proxied UDP (force proxy)\`；
3. **时区与系统语言对齐**：使用美国节点时，将本地系统时区手动调整为 \`UTC-5 (New York)\` 或 \`UTC-8 (Los Angeles)\`，并将首选语言设置为 \`en-US\`；
4. **底层标杆线路保证**：配合 [光速云原生住宅广播专线](/brands/guangsu/)，彻底消除风控告警。
`;

  if (!c.includes('## 7. AI 开发者 API 自动化重试与高可用熔断工程实战')) {
    c = c.replace('## 5. 标杆推荐：光速云', addText + '\n## 9. 标杆推荐：光速云');
    c = c.replace('## 6. 四层站内内容矩阵与内部链接全景图', '## 10. 四层站内内容矩阵与内部链接全景图');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded ai-copilot.md');
  }
};

// 2. Expand scenarios/ecommerce-streaming.md
const expandEcommerce = () => {
  const file = 'content/scenarios/ecommerce-streaming.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 7. TikTok 跨境直播间 OBS 高清推流避坑手册

跨境直播带货与国内直播最大的不同，在于数据流需要经过跨国公网或专线传输。任何卡顿、掉帧都会直接导致直播间被官方算法判定为“低画质违规”并限流。

### 7.1 OBS Studio 黄金配置实战参数
1. **视频编码器设置**：首选 **NVIDIA NVENC H.264 (硬件编码器)**，避免 CPU 占用过高导致本地掉帧；
2. **码率控制方式**：必须选择 **CBR (恒定码率)**，严禁选择 VBR 动态码率，防止网络瞬时波动触发推流重连；
3. **关键帧间隔 (Keyframe Interval)**：手动强制锁定为 **2 秒**（TikTok 官方标准，设为 0 自动会导致画质模糊）；
4. **网络绑定设置**：在 OBS 高级设置中，将“网络绑定 IP”设置为运行了 TUN 虚拟网卡的本地物理 IP。

---

## 8. Apple TV 与家庭软路由大屏 4K 播放无损配置

为了在客厅 75 寸以上 4K/8K 电视或 Apple TV 4K 上享受 Netflix 杜比视界（Dolby Vision）与杜比全景声（Dolby Atmos）：
- 在软路由（如 iStoreOS、OpenWrt）中部署 **OpenClash** 或 **PassWall**；
- 开启 **Fake-IP 混合模式**，并在 DNS 分流中将 \`netflix.com\` 与 \`nflxvideo.net\` 指定走 [光速云 IEPL 专线](/brands/guangsu/)；
- 实测下行吞吐稳定在 500Mbps 以上，影片缓冲时间小于 0.5 秒，彻底告别降分辨率至 1080p 的尴尬局面。
`;

  if (!c.includes('## 7. TikTok 跨境直播间 OBS 高清推流避坑手册')) {
    c = c.replace('## 5. 标杆推荐：光速云', addText + '\n## 9. 标杆推荐：光速云');
    c = c.replace('## 6. 四层站内内容矩阵与内部链接全景图', '## 10. 四层站内内容矩阵与内部链接全景图');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded ecommerce-streaming.md');
  }
};

// 3. Expand clients/clash-verge.md
const expandClashVerge = () => {
  const file = 'content/clients/clash-verge.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 7. Clash Verge Rev 高级特性：Script 扩展与规则集自动更新

对于高阶用户，Clash Verge Rev 允许使用 JavaScript 扩展脚本对下载的机场订阅进行**无感热修改**：

\`\`\`javascript
// Clash Verge Rev 订阅扩展脚本示例：自动注入 AI 专属策略组与优选 DNS
function main(config) {
  // 注入顶级公共 DoH 服务器
  config['dns']['nameserver'] = [
    '223.5.5.5',
    '119.29.29.29',
    'https://dns.alidns.com/dns-query'
  ];

  // 为光速云专线节点注入高优先级
  if (!config['proxy-groups']) config['proxy-groups'] = [];
  config['proxy-groups'].unshift({
    name: '🚀 极速专线优选',
    type: 'url-test',
    url: 'http://www.gstatic.com/generate_204',
    interval: 300,
    tolerance: 50,
    proxies: config['proxies'].map(p => p.name)
  });

  return config;
}
\`\`\`

---

## 8. Windows 常见故障排查：从旧版 CFW 平滑迁移指南
- **卸载残留清理**：若此前安装过旧版 Clash for Windows，必须先在原软件中关闭“系统代理”并彻底退出，避免注册表端口 7890 冲突占用；
- **端口冲突修复**：Clash Verge Rev 默认混合端口为 **7897**，若需兼容旧脚本，可在【设置 - 外部控制】中修改为 7890。
`;

  if (!c.includes('## 7. Clash Verge Rev 高级特性：Script 扩展与规则集自动更新')) {
    c = c.replace('## 5. 标杆推荐：光速云', addText + '\n## 9. 标杆推荐：光速云');
    c = c.replace('## 6. 四层站内内容矩阵与内部链接全景图', '## 10. 四层站内内容矩阵与内部链接全景图');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded clash-verge.md');
  }
};

expandAiCopilot();
expandEcommerce();
expandClashVerge();
