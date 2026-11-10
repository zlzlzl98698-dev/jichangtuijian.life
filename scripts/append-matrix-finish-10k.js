const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'content', 'matrix', '_index.md');

const transparencySection = `
## 13. 实验室多宽带测试基准与“测速造假”识别指南 (Testing Transparency)

为了让所有读者彻底理解本站 42 家天梯排行榜数据的真实客观来源，实验室在此公开全部测试基准环境，并揭露第三方“网红测速脚本”的三大造假内幕：

### 13.1 实验室三网物理测试基准配置
- **测试物理节点**：我们在华南（深圳电信千兆 FTTH）、华东（上海联通 500M 企业专线）以及华北（北京移动 300M 宽带）同时架设了三台无人值守自动化网络探测机（搭载 Linux Kernel 6.8 与原版 Clash Meta / Mihomo 内核）；
- **采样频率**：每天 24 小时每隔 30 分钟发起一轮完整的延迟探测（ICMP Ping / TCPing）、100 并发丢包统计以及单线程大文件拉流采样；重点放大分析每天 20:00 至 23:30 晚高峰真实拥堵时段的稳定性曲线。

### 13.2 识破第三方机场测评博主“测速图造假”的三大惯用伎俩
1. **伎俩一：用 16 线程并发测速掩盖单线程严重丢包**：
   - 很多劣质机场在后台限制了单连接的传输效率或公网本身丢包严重，但测评博主通过开启多线程 32 并发测速软件跑出“500Mbps”的虚假大字。实际用户看 YouTube 4K 属于**单线程 TCP 流式拉取**，并发虚高根本无法解决视频转圈卡顿。本站评测一律强制以**严格单线程真实拉流峰值**为准；
2. **伎俩二：挑选凌晨三点无人时段进行跑分**：
   - 凌晨 03:00 全网公网几乎没有任何并发负载，哪怕几块钱的廉价公网 VPS 也能轻松跑满千兆。真正检验专线成色的唯一考场只有每天晚间 21:00 的高峰拥堵时段；
3. **伎俩三：借用本地测试机房内部高速缓存 (Speedtest Local Mirror)**：
   - 部分恶俗广告主故意将测速节点指向落地机房旁边的内网镜像测速服，跑出“延迟 1ms、下行 2000Mbps”的荒谬数据欺骗新手。

### 13.3 消费者下单前的“五步防坑自我检查清单”
在最终支付费用给任何一家机场之前，请花 1 分钟快速核对以下五项安全检查：
1. **核实域名年龄**：使用 Whois 工具确认该品牌官网域名已连续注册 2 年以上，远离几个月前刚上线的新壳网站；
2. **观察社群真实讨论**：进入其官方 Telegram 群，确认聊天框处于开放状态而非全员禁言；
3. **拒绝违背物理规律的低价**：一旦发现标价“几十元买断终身无限量”或“年付仅 19 元”，立刻关闭页面避免进入庞氏资金盘；
4. **关注支付风控提示**：若微信或支付宝扫码结账时跳出“涉嫌网络欺诈交易风险提示”，立即停止支付；
5. **坚持独立别名与强随机密码**：绝对不要使用生活主邮箱和日常支付密码注册任何新兴跨境服务平台。
`;

let content = fs.readFileSync(targetPath, 'utf8');

if (content.includes('## 11. 真实且相关的转化卡片与标杆推荐')) {
  content = content.replace('## 11. 真实且相关的转化卡片与标杆推荐', transparencySection.trim() + '\n\n---\n\n## 11. 真实且相关的转化卡片与标杆推荐');
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Transparency section inserted successfully.');
} else {
  fs.appendFileSync(targetPath, transparencySection, 'utf8');
  console.log('Transparency section appended successfully.');
}
