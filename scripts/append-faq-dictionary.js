const fs = require('fs');

const file = 'content/faq/_index.md';
let content = fs.readFileSync(file, 'utf8');

const dictionarySection = `

---

## 9. 附录：出海网络工程常用术语英汉对照与速查辞典

为方便读者在阅读各类技术文档、日志报错和客户端配置时快速查阅，实验室特整理了出海网络工程领域最核心的 25 个专业术语深度对照表：

| 术语英文缩写 | 英文全称 | 中文标准译名 | 底层技术内涵与工程用途说明 |
| :--- | :--- | :--- | :--- |
| **RTT** | Round-Trip Time | 往返时延 | 数据包从本地发送到接收端、再由接收端返回确认报文所消耗的总物理毫秒数，是衡量延迟的基础指标。 |
| **Jitter** | Network Jitter | 网络抖动 | 连续数据包之间时延变化的绝对差值。抖动越小代表链路越稳定；大于 15ms 会引起语音通话严重卡顿。 |
| **Packet Loss** | Packet Loss Rate | 网络丢包率 | 发送的数据包未能成功到达目标服务器的百分比。丢包会导致 TCP 频繁触发慢启动重传，是降速的第一元凶。 |
| **IPLC** | International Private Leased Circuit | 国际私有租用线路 | 运营商点对点物理内网专纤，全程不经公网和防火墙，晚高峰丢包恒定为 0。 |
| **IEPL** | International Ethernet Private Line | 国际以太网专线 | 基于现代 OTN 与以太网构建的高性能专线，支持毫秒级多路径故障自动倒换。 |
| **BGP** | Border Gateway Protocol | 边界网关协议 | 互联网核心路由协议，能够实现电信、联通、移动多线智能调度与 Anycast 任播。 |
| **ASN** | Autonomous System Number | 自治系统编号 | 全球大型独立网络的唯一身份代码，常用于审计节点出口属于机房还是住宅家庭宽带。 |
| **NAT** | Network Address Translation | 网络地址转换 | 将局域网私有 IP 转换为公网 IP 的技术。运营商层面的大内网 NAT444 会增加网络开销。 |
| **SLA** | Service Level Agreement | 服务级别协议 | 运营商向企业客户承诺的网络可用率与故障抢修时效标准（如 99.9% 在线承诺）。 |
| **QoS** | Quality of Service | 服务质量控制 | 交换机在网络拥塞时采取的丢包优先级调度。公网在晚高峰时会对代理流量执行惩罚性降速。 |
| **DPI** | Deep Packet Inspection | 深度包检测 | 防火墙深入分析数据包 Payload 应用层内容的技术，用于识别非标准加密特征。 |
| **Fake-IP** | Fake IP Address Mapping | 虚假 IP 映射 | 客户端在收到 DNS 请求时瞬间返回保留虚假 IP，将真实域名交由海外落地解析，耗时 0ms。 |
| **DoH** | DNS over HTTPS | 加密 DNS 协议 | 通过标准的 HTTPS (端口 443) 发起域名解析请求，彻底杜绝本地运营商的 DNS 劫持与污染。 |
| **DoT** | DNS over TLS | TLS 加密 DNS | 通过专用的 TLS 端口 (853) 发起加密 DNS 解析，具有严密的数字证书安全校验。 |
| **TUN** | Network TUN Device | 虚拟网络适配器 | 操作系统底层的虚拟网卡驱动，工作在 Layer 3 网络层，用于实现游戏与命令行的全量接管。 |
| **TAP** | Network TAP Device | 虚拟以太网设备 | 工作在 Layer 2 数据链路层的虚拟网卡，能截获完整的以太网帧，常用于企业内网桥接。 |
| **0-RTT** | Zero Round-Trip Time | 零往返握手 | TLS 1.3 与 QUIC 协议特有的预协商机制，在发送第一个数据包时即可携带密文，握手无感知。 |
| **SNI** | Server Name Indication | 服务器名称指示 | HTTPS 握手时客户端向服务器告知目标域名的字段。传统明文 SNI 极易遭遇阻断。 |
| **ECH** | Encrypted Client Hello | 加密客户端问候 | 下一代 TLS 扩展标准，将 SNI 字段在客户端直接二次加密，彻底消除域名嗅探特征。 |
| **Mathis Formula**| Mathis Throughput Formula | 马蒂斯吞吐公式 | 经典计算机网络理论公式，证明了 TCP 吞吐量与丢包率的平方根成反比。 |
| **Overbooking** | Overbooking Ratio | 带宽超售比 | 机场卖给用户的总标称带宽与真实采购物理专线带宽的比值。超售严重会导致晚高峰卡顿。 |
| **Goodput** | Application-level Goodput | 有效负载吞吐量 | 剔除了重传报文、加密头部开销后，用户应用实际接收到的净有效数据速率。 |
| **Fast Reroute** | Fast Reroute (FRR) | 快速重路由 | 现代专线网络的核心自愈技术，主缆断纤时能在 50 毫秒内自动切换备用物理路由。 |
| **Residential IP**| Residential Broadcast IP | 住宅原生广播 IP | 本地电信运营商分配给家庭用户的原生 IP，在 AI 和流媒体风控引擎中享有最高信任度。 |
| **Hosting IP** | Datacenter Hosting IP | 机房数据中心 IP | 云厂商服务器机房广播的公网 IP，在风控系统中往往被判定为高风险爬虫温床。 |

---

## 10. 全书结语与出海工程选型最终结论

科学上网与跨境外贸网络从来不是靠玄学，而是严格遵循计算机网络底层物理规律的严密工程学。

1. **原理优于迷信**：明白了光速在二氧化硅光纤中的传播物理极限，就不会轻信虚假的“跨洋 5ms 超低延迟”宣传；明白了 Mathis 吞吐公式，就不会盲目追逐虚标的千兆大公网带宽；
2. **架构决定体验**：内网专线（IEPL）保障了晚高峰的下限，开源内核（Mihomo / Xray）拓展了客户端的上限，二者结合方能获得真正的行云流水体验；
3. **长期主义胜利**：避开那些昙花一现的“永久无限量资金盘”，选择拥有 4 年以上长效实测背书的标杆机构（如 [光速云](/brands/guangsu/)），才能为你的学术科研、外贸出海与 AI 生产力保驾护航！
`;

if (!content.includes('## 9. 附录：出海网络工程常用术语英汉对照与速查辞典')) {
  content = content.replace('## 7. 真实且相关的转化卡片与标杆专线推荐', dictionarySection + '\n\n## 11. 真实且相关的转化卡片与标杆专线推荐');
  content = content.replace('## 8. 四层站内内容矩阵与内部链接全景图', '## 12. 四层站内内容矩阵与内部链接全景图');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully appended technical dictionary to content/faq/_index.md');
}
