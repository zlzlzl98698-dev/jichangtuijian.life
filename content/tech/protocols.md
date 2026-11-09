---
title: "代理协议演进史：从 Shadowsocks 到 VLESS Reality 与 Hysteria2"
date: 2026-11-09T23:00:00+08:00
slug: "protocols"
description: "系统梳理 SS、VMess、Trojan、VLESS Reality 及 Hysteria2 (QUIC) 协议的技术原理、握手特征与抗审查能力。"
---

## 1. 代理协议的三代演进

网络代理协议在过去十余年中经历了从“简单对称加密”到“高仿真 TLS 伪装”，再到“基于 UDP 的魔改拥塞控制”三次重大代际跃迁：

1. **第一代：Shadowsocks / SSR** —— 基于 AEAD 密码原语的对称加密流。优点是轻量高效、服务器开销极小，目前依然广泛部署在专线机场（如 [二猫云](/brands/ermao/)、[唯兔云](/brands/weitu/)）内部，因为专线本身不经公网审查。
2. **第二代：Trojan / VLESS + TLS** —— 完全模拟正常 HTTPS 流量。客户端与服务端通过标准 TLS 1.3 握手，外部防火墙只能观察到合法的 SNI 域名握手数据。
3. **第三代：VLESS Reality & Hysteria2** —— Reality 实现了“借用他人合法证书”伪装，彻底杜绝了自签证书特征；而 Hysteria2 则基于 QUIC (UDP) 协议，在恶劣丢包环境下能暴力压榨带宽。

## 2. 协议特性全景对比

| 协议名称 | 底层传输 | 握手伪装度 | 协议特征识别率 | CPU 运算开销 | 最佳使用场景 |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Shadowsocks (AEAD)** | TCP | 基础加密 | 中等 (公网易受阻) | 极低 | 纯内网专线 (IEPL/IPLC) |
| **VLESS + TLS** | TCP / gRPC | 极高 (真实证书) | 极低 | 中等 | [光速云](/brands/guangsu/) 旗舰综合型 |
| **Trojan** | TCP | 极高 (伪装网站) | 极低 | 中等 | 商务级抗封锁通道 |
| **Hysteria2 (QUIC)** | UDP | 伪装 HTTP/3 | 极低 | 中高 | 弱网、高丢包跨境环境 |
