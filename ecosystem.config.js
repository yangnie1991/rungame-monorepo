/**
 * PM2 进程管理配置文件
 * 用于管理 RunGame Monorepo 的所有应用
 *
 * 使用方法：
 * - 启动所有应用：pm2 start ecosystem.config.js
 * - 启动单个应用：pm2 start ecosystem.config.js --only rungame-admin
 * - 重启：pm2 restart ecosystem.config.js
 * - 停止：pm2 stop ecosystem.config.js
 * - 查看日志：pm2 logs
 * - 监控：pm2 monit
 */

module.exports = {
  apps: [
    // ============================================
    // Admin 应用 - 管理后台（Standalone 模式）
    // ============================================
    {
      name: 'rungame-admin',
      cwd: './',                                                        // Monorepo 根目录
      script: 'apps/admin/.next/standalone/apps/admin/server.js',      // Standalone server 完整路径
      interpreter: 'node',                                              // 使用 node 解释器

      // 进程配置
      instances: 1,           // 管理后台使用单实例即可
      exec_mode: 'fork',      // fork 模式，适合单实例

      // 环境变量
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        HOSTNAME: '0.0.0.0',
      },

      // 自动重启配置
      max_memory_restart: '500M',     // 内存超过 500MB 自动重启
      min_uptime: '10s',               // 最小运行时间，避免频繁重启
      max_restarts: 10,                // 最大重启次数
      restart_delay: 4000,             // 重启延迟（毫秒）

      // 日志配置
      error_file: './logs/admin-error.log',
      out_file: './logs/admin-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // 监控配置
      watch: false,                    // 生产环境不启用文件监控
      ignore_watch: ['node_modules', 'logs', '.next/cache'],

      // 其他配置
      autorestart: true,               // 自动重启
      kill_timeout: 5000,              // 优雅关闭超时时间
    },

    // ============================================
    // Website 应用 - 用户端网站
    // ============================================
    {
      name: 'rungame-website',
      cwd: './apps/website',
      script: 'npm',
      args: 'run start -- -p 3000',

      // 进程配置（集群模式，充分利用 CPU）
      instances: 'max',       // 使用所有 CPU 核心（或指定数字，如 2）
      exec_mode: 'cluster',   // 集群模式，自动负载均衡

      // 环境变量
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // 自动重启配置
      max_memory_restart: '600M',     // 网站流量大，允许更多内存
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,

      // 日志配置
      error_file: './logs/website-error.log',
      out_file: './logs/website-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // 监控配置
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.next/cache'],

      // 其他配置
      autorestart: true,
      kill_timeout: 5000,
    },
  ],

  // ============================================
  // PM2 部署配置（可选）
  // ============================================
  deploy: {
    production: {
      user: 'root',
      host: ['your-server-ip'],        // 替换为你的服务器 IP
      ref: 'origin/main',
      repo: 'git@github.com:your-username/rungame-monorepo.git',  // 替换为你的仓库
      path: '/www/wwwroot/rungame',
      'post-deploy': 'pnpm install && pnpm build && pm2 reload ecosystem.config.js --env production && pm2 save',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
