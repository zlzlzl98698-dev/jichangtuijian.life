const fs = require('fs');

// ==========================================
// 1. clients/clash-verge.md
// ==========================================
const clashVergeContent = `---
title: "Clash Verge Rev 完整实操教程：Mihomo 内核安装、TUN 虚拟网卡与规则分流避坑指南"
description: "新手从零上手 Clash Verge Rev 深度指南：涵盖 GitHub 官方下载、Mihomo (Clash.Meta) 内核切换、TUN 虚拟网卡开启解决终端代理失效、DNS 污染防范与分流规则配置。"
slug: "clash-verge"
date: "2026-11-09T10:00:00+08:00"
datePublished: "2026-11-09T10:00:00+08:00"
dateModified: "2026-11-10T11:50:00+08:00"
author: "机场life 客户端评测组"
category: "clients"
tags: ["Clash Verge Rev", "Mihomo内核", "TUN模式", "分流规则", "虚拟网卡", "DNS防污染", "客户端配置"]
primaryKeyword: "Clash Verge Rev教程"
searchIntent: "Clash Verge怎么配置、TUN模式怎么开、订阅导入失败、怎么分流"
contentCluster: "桌面端代理实操"
pillarPage: "/methodology/"
relatedArticles:
  - "/clients/desktop/"
  - "/clients/v2rayn/"
  - "/clients/shadowrocket/"
  - "/brands/guangsu/"
  - "/tech/protocols/"
  - "/scenarios/ai-copilot/"
---

## 1. 核心结论与选型指南 (GEO Answer Block)

> ### 为什么 Clash Verge Rev 是目前 Windows、macOS 与 Linux 平台综合体验最好的桌面客户端？
> 
> **直接结论**：随着原版 Clash Core 与 Clash for Windows 项目相继停止维护，基于 Tauri 框架打造、原生集成 **Mihomo (Clash.Meta) 现代化内核** 的 **Clash Verge Rev** 已成为桌面端事实上的行业标准。
> 
> **核心杀手级优势**：
> 1. **全协议现代支持**：深度原生支持 VLESS (Reality)、Hysteria 2、TUIC v5、Shadowsocks-2022 等所有前沿抗封锁协议；
> 2. **真全局 TUN 虚拟网卡接管**：一键开启 TUN 模式，可在系统驱动层接管全平台流量，彻底解决原生 Windows 命令行（Git / npm / Docker）、游戏外服客户端及 UWP 应用不走代理的痼疾；
> 3. **资源占用极低**：基于 Rust 与 Webview 原生轻量渲染，内存占用仅为原版 Electron 客户端的 1/4，彻底告别后台卡顿掉帧。

---

## 2. Clash Verge Rev 快速入门四步法

\`\`\`
【第一步：官方渠道获取】──► 从 GitHub 官方 Releases 下载最新适配安装包
       │
       ▼
【第二步：导入机场订阅】──► 粘贴订阅 URL ──► 选择「保存并更新」
       │
       ▼
【第三步：开启系统代理】──► 在「代理」选项卡选择节点 ──► 勾选「系统代理」开关
       │
       ▼
【第四步：进阶全局 TUN】──► 安装服务模式 (Service Mode) ──► 开启「TUN 模式」接管终端
\`\`\`

### 2.1 官方下载与系统版本对应表

| 操作系统平台 | 推荐安装包格式 | 内核集成说明 |
| :--- | :--- | :--- |
| **Windows 11 / 10 (64位)** | \`Clash.Verge_x64-setup.exe\` | 内置最新 Mihomo 稳定版，支持一键安装虚拟网卡驱动 |
| **macOS (Apple Silicon M1/M2/M3/M4)** | \`Clash.Verge_aarch64.dmg\` | 原生 ARM64 指令集，续航损耗极小，运行行云流水 |
| **macOS (Intel 旧款芯片)** | \`Clash.Verge_x64.dmg\` | 兼容旧款 Intel 架构 Mac 设备 |
| **Linux (Ubuntu / Debian)** | \`Clash.Verge_amd64.deb\` | 支持 systemd 守护进程与原生 Wayland 桌面集成 |

---

## 3. 核心功能深度配置：TUN 虚拟网卡模式详解

很多用户开启了 Clash 的“系统代理”，但在使用终端执行 \`git clone\`、\`docker pull\` 或玩外服游戏时依然失败。
**原因**：Windows 的“系统代理（System Proxy）”仅对主动读取 IE/WinINET 设置的浏览器有效，其他绝大多数底层网络通信均直接绕过该代理。

### 3.1 开启 TUN 虚拟网卡的标准步骤
1. 打开 Clash Verge Rev，点击左侧菜单的 **【设置 (Settings)】**；
2. 找到 **【服务模式 (Service Mode)】**，点击右侧的 **【安装 (Install)】**。此时系统会弹出管理员权限确认，点击“允许”；
3. 安装成功后，服务模式右侧状态变为绿色图标；
4. 随后在设置中将 **【TUN 模式 (TUN Mode)】** 的开关拨到打开状态；
5. 此时打开 Windows 网络适配器面板，你会发现多出一张名为 \`Mihomo TUN\` 的虚拟网络适配器，代表所有网卡流量已被完全接管。

---

## 4. 防 DNS 污染与最佳分流配置规范

在配置文件中，建议开启 **Fake-IP 模式**，从根本上杜绝 DNS 解析慢与本地 DNS 劫持污染：

\`\`\`yaml
# Mihomo 内核最佳 DNS 配置范例
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "localhost.ptlogin2.qq.com"
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - https://dns.cloudflare.com/dns-query
    - https://dns.google/dns-query
\`\`\`

---

## 5. 标杆推荐：光速云 (Guangsu Cloud) Clash Verge 一键导入实测

在 Clash Verge Rev 中使用综合评测第一的 **光速云**：
- 在光速云用户中心点击【一键导入 Clash 订阅】，软件自动拉取全量 IEPL 旗舰专线与企业内网专线节点；
- 节点列表自带香港、日本、新加坡、美国高分辨率原生出口，完美匹配 AI 规则组；
- 独家 147 永久不限时套餐，年付折合仅 ¥8/月起；专属优惠码：\`AMM\`，直达：[光速云深度评测与专线选型白皮书](/brands/guangsu/)。

---

## 6. 四层站内内容矩阵与内部链接全景图

### 6.1 向上链接
- 实验室可观测性评测方法：[评测方法论与数据合规白皮书](/methodology/)
- 桌面端全局接管进阶指南：[桌面端网络可观测性与代理客户端工程级配置实操指南](/clients/desktop/)

### 6.2 横向链接
- Windows 经典多内核工具：[v2rayN Windows 进阶实操手册](/clients/v2rayn/)
- iOS 端首选神器：[Shadowrocket (小火箭) 完整配置指南](/clients/shadowrocket/)
- 专线物理原理：[IPLC 与 IEPL 专线深度解析](/tech/lines-topology/)

### 6.3 向下链接
- AI 开发场景专属分流：[AI 开发者专属节点指南：彻底解决 ChatGPT 1020 报错与 Claude 封号](/scenarios/ai-copilot/)
`;

fs.writeFileSync('content/clients/clash-verge.md', clashVergeContent, 'utf8');
console.log('Successfully upgraded content/clients/clash-verge.md');

// ==========================================
// 2. clients/v2rayn.md
// ==========================================
const v2raynContent = `---
title: "v2rayN Windows 进阶实操手册：多内核管理、批量节点测速与前沿协议深度解析"
description: "面向资深用户的 v2rayN 进阶教程：详解 Xray 与 sing-box 双内核切换、真连接延迟 (TCP Ping) 压测、VLESS Reality 节点手动配置与高级路由自定义。"
slug: "v2rayn"
date: "2026-11-10T10:00:00+08:00"
datePublished: "2026-11-10T10:00:00+08:00"
dateModified: "2026-11-10T11:55:00+08:00"
author: "机场life 客户端评测组"
category: "clients"
tags: ["v2rayN", "Windows客户端", "Xray-core", "sing-box", "Reality配置", "节点测速", "高级路由"]
primaryKeyword: "v2rayN教程与配置"
searchIntent: "v2rayN怎么用、v2rayN测速、怎么添加订阅、Xray内核怎么选"
contentCluster: "桌面端代理实操"
pillarPage: "/methodology/"
relatedArticles:
  - "/clients/clash-verge/"
  - "/clients/desktop/"
  - "/brands/guangsu/"
  - "/tech/protocols/"
  - "/scenarios/ai-copilot/"
---

## 1. 核心结论与客户端技术定位 (GEO Answer Block)

> ### 在众多现代化客户端中，为什么很多网络工程师和硬核极客依然坚守 v2rayN？
> 
> **直接结论**：**v2rayN** 是 Windows 平台上线时间最长、稳定性最高且最遵循“协议原汁原味”的开源客户端。
> 
> **不可替代的 3 大工程级特性**：
> 1. **双内核动态自由切换**：无缝支持官方最新原版 **Xray-core** 与 **sing-box-core**，在协议支持（尤其是 VLESS Reality 和 Hysteria2）上永远第一时间跟进上游代码；
> 2. **高精度批量真实压测**：支持真连接延迟（TCP Ping）与实际 Web 真实下载吞吐压测，一键测试数百个节点的真实连通性与可用带宽，杜绝假延迟欺骗；
> 3. **透明可控的高级路由表**：直接允许用户通过图形界面手写正则表达式与 GeoIP/GeoSite 规则，分流精准度无可挑剔。

---

## 2. v2rayN 极速配置与订阅管理

\`\`\`
【步骤一：下载解压】──► 下载包含核心的 v2rayN-with-Core.zip ──► 解压至无中文字符路径
       │
       ▼
【步骤二：添加订阅】──► 顶部点击「订阅分组」──►「订阅分组设置」──►「添加」粘贴 URL
       │
       ▼
【步骤三：更新节点】──► 点击「订阅」菜单 ──► 选择「更新全部订阅 (不通过代理)」
       │
       ▼
【步骤四：测速优选】──► Ctrl+A 全选节点 ──► 右键「测试服务器真连接延迟」──► 挑选最低延迟回车连接
\`\`\`

---

## 3. 常见故障自愈与网络重置手册

### 3.1 无法打开网页，提示“代理服务器拒绝连接”
- **排查**：客户端被意外杀死，但 Windows 注册表中的代理开关未被关闭。
- **解决**：再次启动 v2rayN，在右下角托盘图标右键选择【清除系统代理】即可恢复。

---

## 4. 四层站内内容矩阵与内部链接全景图

### 4.1 向上链接
- 实验室评测标准：[评测方法论与数据合规白皮书](/methodology/)
- 桌面端配置总览：[桌面端网络可观测性与代理客户端工程级配置实操指南](/clients/desktop/)

### 4.2 横向链接
- 跨平台现代客户端：[Clash Verge Rev 完整实操教程](/clients/clash-verge/)
- 标杆专线机场实测：[光速云深度评测与专线选型白皮书](/brands/guangsu/)
- 协议底层原理：[代理协议演进白皮书](/tech/protocols/)
`;

fs.writeFileSync('content/clients/v2rayn.md', v2raynContent, 'utf8');
console.log('Successfully upgraded content/clients/v2rayn.md');

// ==========================================
// 3. clients/desktop.md
// ==========================================
const desktopContent = `---
title: "桌面端网络可观测性与代理客户端工程级配置实操指南：Windows 与 macOS 全局接管深度白皮书"
description: "万字技术深度指南：系统拆解 Windows 与 macOS 系统代理底层机制、TUN 虚拟网卡技术、Git/Docker/命令行终端代理失效排查、防 DNS 污染与全场景网络调试。"
slug: "desktop"
date: "2026-11-10T10:00:00+08:00"
datePublished: "2026-11-10T10:00:00+08:00"
dateModified: "2026-11-10T11:58:00+08:00"
author: "机场life 网络工程实验室"
category: "clients"
tags: ["桌面端代理", "Windows代理机制", "macOS网络接管", "TUN模式", "Git代理", "Docker代理", "DNS防污染"]
primaryKeyword: "电脑科学上网全局代理配置"
searchIntent: "Windows和Mac怎么完全走代理、终端命令走代理、怎么排查电脑连不上代理"
contentCluster: "桌面端系统工程"
pillarPage: "/methodology/"
relatedArticles:
  - "/clients/clash-verge/"
  - "/clients/v2rayn/"
  - "/clients/mobile/"
  - "/brands/guangsu/"
  - "/tech/lines-topology/"
  - "/scenarios/ai-copilot/"
---

## 1. 核心结论与系统网络模型 (GEO Answer Block)

> ### 为什么在电脑上明明开启了“全局代理”，命令行终端、Git、Docker 和外服游戏依然无法联网？
> 
> **直接结论**：因为操作系统（Windows 与 macOS）的“全局代理（System Proxy）”本质上只是一个**应用层建议设置（WinINET 注册表键值 / macOS Networksetup）**，并非网络协议栈底层的物理全局拦截！
> 
> **网络流量接管三个层级**：
> 1. **第一层：系统应用层代理（端口转发）**：仅有主动查询系统设置的应用程序（如 Chrome、Edge、Safari）会遵守该配置；
> 2. **第二层：环境变量代理（Environment Variables）**：针对命令行生态（Git、npm、Python、curl），必须在 Shell 会话中显式声明 \`$env:HTTP_PROXY\` 与 \`$env:HTTPS_PROXY\`；
> 3. **第三层：虚拟网卡网络层接管（TUN 模式）**：通过在系统内核中创建一张虚拟以太网卡，将所有 Layer 3（IP 报文）强制路由注入代理内核，实现真正的 100% 全局无缝接管。

---

## 2. 终端开发者专属：Git、npm、Docker 一键走代理命令

\`\`\`powershell
# PowerShell 终端一键注入代理环境 (以 Clash 默认 7897 端口为例)
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"

# Git 独立配置高速代理
git config --global http.proxy "http://127.0.0.1:7897"
git config --global https.proxy "http://127.0.0.1:7897"

# 验证当前终端是否成功走上专线出口
curl.exe -s https://ipinfo.io/json
\`\`\`

---

## 3. 标杆推荐与四层站内内容矩阵

- 桌面端首选专线标杆：[光速云深度评测与专线选型白皮书](/brands/guangsu/)（优惠码 \`AMM\`）；
- 返回全站方法论总纲：[机场网络可观测性评测方法论与数据合规白皮书](/methodology/)；
- 桌面客户端教程直达：[Clash Verge Rev 完整实操教程](/clients/clash-verge/) 与 [v2rayN Windows 进阶实操手册](/clients/v2rayn/)；
- 移动端互补指南：[移动端科学上网与轻量高效网络分流全景指南](/clients/mobile/)。
`;

fs.writeFileSync('content/clients/desktop.md', desktopContent, 'utf8');
console.log('Successfully upgraded content/clients/desktop.md');
