# NextAuth 安全配置指南

## 📋 概述

本文档详细说明 Admin 应用的身份认证安全配置，包括 CSRF 保护、Cookie 安全、Session 管理等。

## 🔒 安全特性

### 1. NEXTAUTH_SECRET 强制检查

**配置位置**: [apps/admin/lib/auth.ts:12-18](../apps/admin/lib/auth.ts#L12-L18)

```typescript
// 生产环境必须配置 NEXTAUTH_SECRET
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  throw new Error('🚨 生产环境必须配置 NEXTAUTH_SECRET！')
}
```

**作用**：
- 防止在生产环境忘记配置密钥
- NEXTAUTH_SECRET 用于签名 JWT、加密 Cookies、生成 CSRF tokens

**生成方法**：
```bash
# 方法 1: 使用 OpenSSL
openssl rand -base64 32

# 方法 2: 使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Cookie 安全配置

**配置位置**: [apps/admin/lib/auth.ts:41-76](../apps/admin/lib/auth.ts#L41-L76)

#### 2.1 Session Token Cookie

```typescript
sessionToken: {
  name: process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'  // 生产环境使用 __Secure- 前缀
    : 'next-auth.session-token',
  options: {
    httpOnly: true,   // 防止 XSS 攻击访问 Cookie
    sameSite: 'lax',  // 防止 CSRF 攻击
    path: '/',
    secure: true,     // 生产环境强制 HTTPS
  },
}
```

**安全机制**：
- **`__Secure-` 前缀**：浏览器强制要求通过 HTTPS 传输
- **`httpOnly: true`**：JavaScript 无法访问，防止 XSS 窃取 Session
- **`sameSite: 'lax'`**：阻止跨站请求携带 Cookie（CSRF 保护）
- **`secure: true`**：仅通过 HTTPS 传输（生产环境）

#### 2.2 CSRF Token Cookie

```typescript
csrfToken: {
  name: process.env.NODE_ENV === 'production'
    ? '__Host-next-auth.csrf-token'  // 生产环境使用 __Host- 前缀
    : 'next-auth.csrf-token',
  options: {
    httpOnly: true,
    sameSite: 'lax',  // 🔑 关键：防止跨站请求携带 CSRF token
    path: '/',
    secure: true,
  },
}
```

**安全机制**：
- **`__Host-` 前缀**：更严格的限制（必须 secure、path=/、不能指定 domain）
- **双重 Token 模式**：
  1. Cookie 中存储一个 token（httpOnly，JavaScript 无法访问）
  2. 表单/请求中包含另一个 token
  3. 服务器验证两者是否匹配

### 3. trustHost 配置

**配置位置**: [apps/admin/lib/auth.ts:21-23](../apps/admin/lib/auth.ts#L21-L23)

```typescript
// 信任主机（生产环境/反向代理必需）
// 注意：启用此选项会降低 CSRF 保护，但对于反向代理是必需的
trustHost: true,
```

**为什么需要？**
- 应用运行在 Cloudflare + Nginx 反向代理后面
- NextAuth 需要根据请求头判断真实的访问 URL
- 没有 `trustHost: true` 会导致 CSRF 验证失败

**安全权衡**：
- ✅ 允许多域名访问（IP、域名）
- ⚠️ 降低了部分 CSRF 保护强度
- ✅ 通过 Cookie `sameSite: 'lax'` 弥补

### 4. Session 更新策略

**配置位置**: [apps/admin/lib/auth.ts:25-30](../apps/admin/lib/auth.ts#L25-L30)

```typescript
session: {
  strategy: "jwt",
  maxAge: 7 * 24 * 60 * 60,  // 7 天有效期
  updateAge: 24 * 60 * 60,   // 每 24 小时更新一次
},
```

**安全机制**：
- **JWT 策略**：无状态，无需数据库存储 Session
- **maxAge**：Session 最长有效期 7 天
- **updateAge**：活跃用户每 24 小时刷新一次 token（防止 token 被盗用后长期有效）

### 5. 重定向安全

**配置位置**: [apps/admin/lib/auth.ts:119-127](../apps/admin/lib/auth.ts#L119-L127)

```typescript
callbacks: {
  async redirect({ url, baseUrl }) {
    // 仅允许相对路径或同域重定向
    if (url.startsWith("/")) return url
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl  // 其他情况重定向到首页
  },
}
```

**防御**：
- 防止开放重定向漏洞（Open Redirect）
- 攻击者无法将用户重定向到钓鱼网站

## 🌍 Cloudflare + Nginx 环境配置

### 必需的 Nginx 反向代理头

**配置位置**: [docs/nginx-admin.conf:21-27](../docs/nginx-admin.conf#L21-L27)

```nginx
location / {
    proxy_pass http://127.0.0.1:4000;

    # 🔑 必需：传递真实 IP 和协议信息（NextAuth CSRF 验证必需）
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;
}
```

**为什么重要？**
- NextAuth 通过这些头判断真实访问 URL
- 用于 CSRF token 验证和 Cookie domain 设置
- 没有这些头会导致认证失败

### Cloudflare SSL 模式

| 模式 | Cloudflare → VPS | Cookie Secure 属性 | 推荐 |
|------|------------------|-------------------|------|
| 灵活（Flexible） | HTTP | ❌ false（不安全） | ⚠️ 快速部署 |
| **完全（Full）** | HTTPS | ✅ true | ✅ **推荐** |
| 完全(严格)（Full Strict） | HTTPS | ✅ true | ✅ 最安全 |

**生产环境强烈建议**：
1. 在 VPS 配置 SSL 证书（Let's Encrypt 免费）
2. 使用 Cloudflare "完全(严格)" 模式
3. 这样 Cookie 的 `secure: true` 才能正常工作

## 🛡️ 安全最佳实践

### 1. 生产环境检查清单

- [ ] ✅ 配置强随机的 `NEXTAUTH_SECRET`（至少 32 个字符）
- [ ] ✅ 使用 HTTPS（`NEXTAUTH_URL=https://...`）
- [ ] ✅ Cloudflare SSL 模式设为 "完全(严格)"
- [ ] ✅ VPS 安装 Let's Encrypt SSL 证书
- [ ] ✅ Nginx 正确配置反向代理头
- [ ] ✅ `.env` 文件不要提交到 Git（已在 `.gitignore`）
- [ ] ✅ 定期轮换 `NEXTAUTH_SECRET`（建议 3-6 个月）

### 2. VPS 环境变量配置

```bash
# SSH 连接到 VPS
cd /www/wwwroot/rungame

# 生成 NEXTAUTH_SECRET
openssl rand -base64 32

# 编辑 .env 文件
nano .env
```

在 `.env` 中配置：
```bash
# 必需配置
NODE_ENV=production
NEXTAUTH_SECRET="[刚才生成的随机字符串]"
NEXTAUTH_URL="https://gl.swhh.online"  # 必须使用 HTTPS

# 数据库连接
DATABASE_URL="postgresql://..."
CACHE_DATABASE_URL="postgresql://..."
```

保存后重启应用：
```bash
pm2 restart rungame-admin
pm2 logs rungame-admin --lines 20
```

### 3. 验证安全配置

#### 3.1 检查 Cookie 属性

在浏览器开发者工具（F12）→ Application → Cookies 中检查：

**Session Token Cookie**：
- Name: `__Secure-next-auth.session-token`（生产环境）
- HttpOnly: ✅
- Secure: ✅
- SameSite: `Lax`

**CSRF Token Cookie**：
- Name: `__Host-next-auth.csrf-token`（生产环境）
- HttpOnly: ✅
- Secure: ✅
- SameSite: `Lax`

#### 3.2 测试 CSRF 保护

尝试跨域请求：
```bash
# 从另一个域名发起请求（应该被拒绝）
curl -X POST https://gl.swhh.online/api/auth/signin \
  -H "Origin: https://evil-site.com" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# 应该返回 CSRF 错误
```

#### 3.3 检查 HTTPS 重定向

```bash
# 测试 HTTP 是否自动跳转到 HTTPS
curl -I http://gl.swhh.online

# 应该返回 301/302 重定向到 https://
```

## 🚨 常见安全问题

### 问题 1: CSRF Token Missing 错误

**原因**：
- NEXTAUTH_URL 配置错误（不匹配实际访问 URL）
- Nginx 未正确传递 `X-Forwarded-*` 头
- Cookie `secure: true` 但通过 HTTP 访问

**解决**：
1. 确保 `NEXTAUTH_URL` 与实际访问 URL 一致
2. 检查 Nginx 配置的反向代理头
3. 生产环境必须使用 HTTPS

### 问题 2: Session 无故过期

**原因**：
- `NEXTAUTH_SECRET` 不一致（重新部署时更改了）
- Cookie 被浏览器阻止（第三方 Cookie 限制）

**解决**：
1. 确保 `NEXTAUTH_SECRET` 在所有应用实例中一致
2. 不要使用浏览器隐私模式测试
3. 检查浏览器 Cookie 设置

### 问题 3: 多域名访问不一致

**原因**：
- Cookie domain 属性限制
- `trustHost: true` 但 NEXTAUTH_URL 固定

**解决**：
- 使用 `trustHost: true`（已配置）
- 确保所有域名都通过同一个 Cloudflare 账户
- Session 会在首次访问的域名上创建，切换域名需要重新登录

## 📚 参考文档

- [NextAuth.js 官方文档](https://next-auth.js.org/)
- [NextAuth.js 安全指南](https://next-auth.js.org/configuration/options#security)
- [OWASP CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Cookie 安全属性](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#security)
- [Cloudflare SSL 模式](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)

---

**最后更新**: 2025-11-20
**适用版本**: Next.js 15 + NextAuth v5
