const fs = require('fs');

// 1. clients/v2rayn.md
const expandV2rayn = () => {
  const file = 'content/clients/v2rayn.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 5. v2rayN 高级核心切换与真连接测速技巧

### 5.1 Xray-core vs sing-box 双内核选择标准
- **选用 Xray-core**：当你主力使用 VLESS Reality、Trojan 或传统 VMess 协议时，Xray 官方内核兼容性最好，路由规则更新最及时；
- **选用 sing-box-core**：当你需要运行 Hysteria 2、TUIC v5 或追求极限内存节省时，sing-box 能够带来更低的 CPU 开销。

### 5.2 真连接延迟 (TCP Ping) 与普通 Ping 的区别
在 v2rayN 中按下 \`Ctrl + O\` 测试的是 **真连接延迟**（即向海外目标网站发起真实的 HTTP/TLS 握手返回时间），它完全排除了本地到代理服务器之间的假延迟，能够最真实反映晚高峰节点的可用性。
配合 [光速云 IEPL 专线](/brands/guangsu/)，真连接延迟稳定在 25ms 左右，是竞技游戏与外贸办公的不二法宝。
`;

  if (!c.includes('## 5. v2rayN 高级核心切换与真连接测速技巧')) {
    c = c.replace('## 4. 四层站内内容矩阵与内部链接全景图', addText + '\n## 6. 四层站内内容矩阵与内部链接全景图');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded v2rayn.md');
  }
};

// 2. clients/desktop.md
const expandDesktop = () => {
  const file = 'content/clients/desktop.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 4. macOS 平台网络代理命令行自动化脚本 (networksetup)

在 macOS 终端中，工程师可以使用原生的 \`networksetup\` 快速开关 Wi-Fi 代理，无需打开繁琐的系统设置界面：

\`\`\`bash
# 开启 macOS Wi-Fi 网页代理 (以端口 7897 为例)
networksetup -setwebproxy "Wi-Fi" 127.0.0.1 7897
networksetup -setsecurewebproxy "Wi-Fi" 127.0.0.1 7897

# 一键关闭代理恢复直连
networksetup -setwebproxystate "Wi-Fi" off
networksetup -setsecurewebproxystate "Wi-Fi" off
\`\`\`

---

## 5. Docker 容器构建与守护进程专属出海加速
配置 \`~/.docker/config.json\`，让 Docker 构建镜像时自动通过专线加速：

\`\`\`json
{
  "proxies": {
    "default": {
      "httpProxy": "http://127.0.0.1:7897",
      "httpsProxy": "http://127.0.0.1:7897"
    }
  }
}
\`\`\`
搭配 [光速云](/brands/guangsu/) 500M+ 专线下行，海量海外 Docker 基础镜像秒级拉取。
`;

  if (!c.includes('## 4. macOS 平台网络代理命令行自动化脚本')) {
    c = c.replace('## 3. 标杆推荐与四层站内内容矩阵', addText + '\n## 6. 标杆推荐与四层站内内容矩阵');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded desktop.md');
  }
};

// 3. clients/shadowrocket.md
const expandShadowrocket = () => {
  const file = 'content/clients/shadowrocket.md';
  let c = fs.readFileSync(file, 'utf8');
  const addText = `

---

## 5. 小火箭进阶：HTTPS 解密 (MitM) 与规则集去广告实战

Shadowrocket 不仅是科学上网神器，还是强大的网络调试抓包工具：
1. **生成 CA 证书**：在【配置】中点击默认规则右侧的感叹号，选择【HTTPS 解密】，点击【生成新的 CA 证书】；
2. **安装并信任证书**：进入 iOS【系统设置】→【已下载描述文件】安装；随后在【通用】→【关于本机】→【证书信任设置】中勾选完全信任；
3. **效果**：不仅能过滤全网各大 App 开屏广告，还能针对海外流媒体进行更深度的本地分流重写。
配合 [光速云](/brands/guangsu/) 极低抖动专线，全天候在 iPhone 上获得丝滑出海体验。
`;

  if (!c.includes('## 5. 小火箭进阶：HTTPS 解密 (MitM) 与规则集去广告实战')) {
    c = c.replace('## 4. 四层站内内容矩阵与内部链接全景图', addText + '\n## 6. 四层站内内容矩阵与内部链接全景图');
    fs.writeFileSync(file, c, 'utf8');
    console.log('Successfully expanded shadowrocket.md');
  }
};

expandV2rayn();
expandDesktop();
expandShadowrocket();
