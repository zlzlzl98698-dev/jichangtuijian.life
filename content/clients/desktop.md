---
title: "Windows 与 macOS 桌面端代理客户端深度配置与 TUN 模式详解"
date: 2026-11-09T23:00:00+08:00
slug: "desktop"
description: "全面讲解电脑端 Clash Verge Rev、v2rayN 的配置流程，开启 TUN 虚拟网卡解决游戏与终端命令行代理难题。"
---

## 1. 桌面端的核心痛点：系统代理与终端失效

很多用户在电脑上开启代理软件后，发现浏览器能打开网页，但 Git 命令行、Python 包下载、Docker 容器或 Steam 游戏却依然无法联网。这是因为传统“系统代理”仅对支持 HTTP 代理的浏览器生效。

## 2. 终极解决方案：开启 TUN 模式 (虚拟网卡)

**TUN (Network Tunnel) 模式** 会在操作系统中虚拟一张网卡，在网络层（L3）接管整台电脑的全部 IP 数据包。
- 在 **Clash Verge Rev** 中：进入「设置」➔ 找到「TUN 模式」➔ 点击安装服务模式 (Service Mode) ➔ 授权后开启 TUN 即可！
- 此时终端无需配置任何 `export http_proxy`，所有本地程序自动享受智能分流加速。
