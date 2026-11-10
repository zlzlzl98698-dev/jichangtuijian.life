const fs = require('fs');

const file = 'content/clients/_index.md';
let content = fs.readFileSync(file, 'utf8');

const evenMoreSections = [
'',
'---',
'',
'## 23. 客户端安全防护与官方安装包 SHA-256 哈希防投毒校验指南',
'',
'在科学上网领域，“搜索引擎黑帽 SEO 钓鱼投放”与“假冒客户端挂马”是黑客组织窃取个人信息最猖獗的手段。大量搜索“Clash 下载”或“v2rayN 下载”的用户，误入山寨网站下载了被黑客植入后门木马的客户端，导致 Telegram 账号被盗用、加密货币钱包被盗刷。',
'',
'### 23.1 官方开源发布渠道白名单',
'',
'| 客户端项目名称 | 官方唯一 GitHub 仓库组织与地址 | 常见假冒李鬼钓鱼域名特征 | 实验室安全防范准则 |
| :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | `clash-verge-rev/clash-verge-rev` | 带有 `clashverge.com`、`clash-download.cn` 等独立域名并投放百度广告 | 认准 GitHub 原厂 Releases 页面，绝对不从第三方网盘或不知名博客下载 |
| **v2rayN** | `2dust/v2rayN` | 界面带有第三方博彩弹窗或强制修改浏览器首页导航 | 官方发布包体积紧凑，不带任何强制流氓广告弹窗 |
| **Shadowrocket** | App Store (开发者：Shadow Launch Technology) | 国区 App Store 里所有名字带有“小火箭”、“暗影火箭”的软件全部是山寨李鬼 | 必须登录外区（美区/日区）App Store，认准官方 $2.99 买断应用 |
| **v2rayNG** | `2dust/v2rayNG` | Google Play 外部被篡改的 APK 破解版 | 优先从 Google Play 或官方 GitHub Releases 下载安装包 |

### 23.2 Windows PowerShell 一键哈希校验实操
下载安装包后，在终端执行以下命令，计算文件的唯一数字指纹：
```powershell
# 计算安装包的 SHA-256 哈希值
Get-FileHash -Algorithm SHA256 .\\Clash.Verge_1.7.7_x64-setup.exe
```
将计算出的哈希字符串与官方 GitHub Release 页面公布的 `sha256sum.txt` 进行逐字比对，一旦发现字符不匹配，说明文件在传输过程中被篡改或劫持，必须立即永久删除！

---

## 24. 现代化规则集编写进阶：电商外贸与多场景专用策略组

对于外贸业务员、海外电商卖家和全栈开发者，单一的“国内直连 + 国外代理”分流已经远远无法满足复杂的生产业务。必须引入**多维度细分策略组**：

```yaml
# 生产级多业务场景精细化策略组配置模板 (Mihomo 规范)
proxy-groups:
  # 顶级优选组：按延迟自动优选健康专线
  - name: 🚀 专线自动优选
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
      - 🇭🇰 香港 IEPL 专线
      - 🇯🇵 日本 IEPL 专线
      - 🇸🇬 新加坡 IEPL 专线

  # AI 独立策略组：严禁使用香港出口
  - name: 🤖 AI 专属通道
    type: select
    proxies:
      - 🇯🇵 日本 IEPL 专线
      - 🇸🇬 新加坡 IEPL 专线
      - 🇺🇸 美国原生住宅专线

  # 跨境电商独立策略组：固定单一出口防止多店铺关联
  - name: 🛍️ 跨境电商固定出口
    type: select
    proxies:
      - 🇺🇸 美国原生住宅专线
      - 🇬🇧 英国伦敦专线

  # 4K 全球流媒体专属组
  - name: 🎬 全球流媒体影音
    type: select
    proxies:
      - 🇭🇰 香港 IEPL 专线
      - 🇹🇼 台湾原生广播专线
      - 🇯🇵 日本 IEPL 专线
```

配合 [光速云 IEPL 专线](/brands/guangsu/) 的丰富原生住宅落地出口，能够将 ChatGPT 流量、亚马逊店铺流量与日常工作流量精准隔离，从根本上杜绝任何风控关联。

---

## 25. 多网卡与双宽带聚合：Wi-Fi 与手机热点协同出海实战

很多高阶用户在办公室或出差酒店，同时连接了酒店的宽带 Wi-Fi 与自己的 5G 手机热点。如何利用客户端实现双网卡智能调度？
1. **网络跃点（Interface Metric）手动优化**：
   - 打开 Windows 网络连接属性，将有线千兆网卡的跃点数设置为 `10`（最高优先级，承载 4K 流媒体大流量）；
   - 将 Wi-Fi 无线网卡的跃点数设置为 `20`（备用容灾）；
2. **客户端 Fallback 故障倒换**：
   - 当主干有线网络发生断纤或故障时，内核在毫秒级无感将数据流转移至备用热点网卡，确保外贸跨境直播推流与 Zoom 国际会议绝不中断掉线。

---

## 26. 真实环境网络泄漏排查瑞士军刀：DNS 泄漏与 WebRTC 穿透检测

你在上网时，是否真的做到了“完全隐私出海”？很多用户以为挂上了代理就万事大吉，实则个人真实 IP 早已暴露在目标网站的防作弊系统中。

### 26.1 本地端到端排查三步法
1. **第一步：DNS 泄漏测试 (DNS Leak Test)**：
   - 打开测试站点：\`https://browserleaks.com/dns\`；
   - 观察查询出来的 DNS 服务器 IP 归属地。如果你连接的是香港节点，但 DNS 服务器却显示中国电信、中国联通或阿里巴巴，说明发生了严重的 **DNS 泄漏**！
   - **修复**：立即在客户端中开启 **Fake-IP 模式**，并将 nameserver 更改为远程加密 DNS。
2. **第二步：WebRTC 本地真实局域网穿透测试**：
   - 打开测试站点：\`https://browserleaks.com/webrtc\`；
   - 检查 `Public IP Address` 与 `Local IP Address` 是否暴露出你的国内真实公网 IP 或 `192.168.x.x` 内网地址；
   - **修复**：在浏览器扩展中安装 **WebRTC Control**，强制将其设置为完全禁用。
3. **第三步：底层专线纯净度校验**：
   - 使用 [光速云原生住宅专线](/brands/guangsu/)，打开 `https://scamalytics.com/ip` 查验出口欺诈分，确保 Fraud Score 稳定在 0-10 分的极佳安全区间。
`].join('\n');

// Append right before section 23
content = content.replace('## 23. 真实且相关的转化卡片与标杆专线推荐', evenMoreSections + '\n\n## 27. 真实且相关的转化卡片与标杆专线推荐');
content = content.replace('## 24. 四层站内内容矩阵与内部链接全景图', '## 28. 四层站内内容矩阵与内部链接全景图');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully pushed content/clients/_index.md to mega monograph scale!');
