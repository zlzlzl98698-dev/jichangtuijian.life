---
title: "iOS 与 Android 移动端分流配置与电量优化全攻略"
date: 2026-11-09T23:00:00+08:00
slug: "mobile"
description: "针对 iPhone 与安卓手机的 Shadowrocket 小火箭、v2rayNG 优化教程，合理配置规则减少电量损耗与后台被杀。"
---

## 1. iOS 端：小火箭 (Shadowrocket) 最佳实践

在美区 App Store 购买安装 Shadowrocket（售价 2.99 美元）后：
1. 复制机场提供的专属订阅链接（如 [光速云](/brands/guangsu/) 后台一键复制）；
2. 打开小火箭，点击右上角 `+` ➔ 类型选择 `Subscribe` ➔ 粘贴 URL 并保存；
3. 全局路由模式务必选择 **配置 (Rule)**，避免选择“代理 (Proxy)”导致访问国内应用（微信、美团）浪费专线流量。

## 2. Android 端：解决后台被系统杀死的技巧

在小米 MIUI/HyperOS、华为 HarmonyOS 或 OPPO/VIVO 设备上使用 v2rayNG 时：
- 进入系统「设置」➔「应用管理」➔ 找到 v2rayNG；
- 将省电策略设为「无限制」；
- 在多任务卡片界面将应用上锁，防止后台切出时连接断开。
