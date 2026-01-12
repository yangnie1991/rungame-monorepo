#!/bin/bash
# 数据库诊断脚本 - 检查生产环境数据库连接和表结构

set -e

echo "=========================================="
echo "🔍 RunGame 数据库诊断工具"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必需的环境变量
check_env() {
    echo ""
    echo "📋 检查环境变量..."

    if [ -z "$DATABASE_URL" ]; then
        echo -e "${RED}❌ DATABASE_URL 未设置${NC}"
        return 1
    else
        echo -e "${GREEN}✅ DATABASE_URL 已设置${NC}"
        # 隐藏密码显示
        SAFE_URL=$(echo "$DATABASE_URL" | sed 's/:[^:@]*@/:****@/')
        echo "   $SAFE_URL"
    fi

    if [ -z "$CACHE_DATABASE_URL" ]; then
        echo -e "${RED}❌ CACHE_DATABASE_URL 未设置${NC}"
        return 1
    else
        echo -e "${GREEN}✅ CACHE_DATABASE_URL 已设置${NC}"
        SAFE_URL=$(echo "$CACHE_DATABASE_URL" | sed 's/:[^:@]*@/:****@/')
        echo "   $SAFE_URL"
    fi

    return 0
}

# 测试数据库连接
test_connection() {
    local DB_URL=$1
    local DB_NAME=$2

    echo ""
    echo "🔗 测试 $DB_NAME 数据库连接..."

    # 使用 psql 测试连接
    if PGPASSWORD=$(echo "$DB_URL" | sed 's/.*:\([^:]*\)@.*/\1/') psql "$DB_URL" -c "SELECT version();" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $DB_NAME 数据库连接成功${NC}"

        # 获取数据库版本
        PGPASSWORD=$(echo "$DB_URL" | sed 's/.*:\([^:]*\)@.*/\1/') psql "$DB_URL" -t -c "SELECT version();" | head -n 1
        return 0
    else
        echo -e "${RED}❌ $DB_NAME 数据库连接失败${NC}"
        return 1
    fi
}

# 检查表结构
check_tables() {
    local DB_URL=$1
    local DB_NAME=$2
    local TABLES=$3

    echo ""
    echo "📊 检查 $DB_NAME 数据库表结构..."

    IFS=',' read -ra TABLE_ARRAY <<< "$TABLES"
    for table in "${TABLE_ARRAY[@]}"; do
        if PGPASSWORD=$(echo "$DB_URL" | sed 's/.*:\([^:]*\)@.*/\1/') psql "$DB_URL" -c "\d $table" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ 表 $table 存在${NC}"

            # 显示表的行数
            ROW_COUNT=$(PGPASSWORD=$(echo "$DB_URL" | sed 's/.*:\([^:]*\)@.*/\1/') psql "$DB_URL" -t -c "SELECT COUNT(*) FROM $table;")
            echo "   行数: $ROW_COUNT"
        else
            echo -e "${RED}❌ 表 $table 不存在${NC}"
        fi
    done
}

# 主函数
main() {
    # 检查环境变量
    check_env
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}========================================${NC}"
        echo -e "${RED}❌ 环境变量检查失败，请确保已设置数据库连接字符串${NC}"
        echo -e "${RED}========================================${NC}"
        exit 1
    fi

    # 测试业务数据库连接
    test_connection "$DATABASE_URL" "业务数据库"
    DB1_STATUS=$?

    # 测试管理数据库连接
    test_connection "$CACHE_DATABASE_URL" "管理数据库"
    DB2_STATUS=$?

    # 如果连接成功，检查表结构
    if [ $DB1_STATUS -eq 0 ]; then
        check_tables "$DATABASE_URL" "业务数据库" "games,categories,tags,languages,page_types"
    fi

    if [ $DB2_STATUS -eq 0 ]; then
        check_tables "$CACHE_DATABASE_URL" "管理数据库" "admins,session,account,verification,ai_configs,external_api_configs,import_platforms,search_engine_configs,url_submissions,submission_batches,gamepix_games_cache,sync_logs,ai_chat_history"
    fi

    echo ""
    echo "=========================================="
    echo "📝 诊断建议"
    echo "=========================================="

    if [ $DB2_STATUS -ne 0 ]; then
        echo -e "${YELLOW}⚠️  管理数据库连接失败，可能的原因：${NC}"
        echo "1. SSL 配置不正确（已修复 SSL 连接配置）"
        echo "2. 数据库未创建或已删除"
        echo "3. 网络连接问题（防火墙、IP 白名单）"
        echo "4. 数据库凭据已更改"
        echo ""
        echo "🔧 解决方案："
        echo "1. 检查 Neon 控制台中的数据库状态"
        echo "2. 确认 IP 白名单设置（允许 VPS IP）"
        echo "3. 重新部署应用以使用修复后的 SSL 配置"
        echo "4. 如果数据库不存在，运行迁移创建表："
        echo "   pnpm db:push --schema=packages/database-admin/prisma/schema.prisma"
    else
        echo -e "${GREEN}✅ 所有数据库连接正常${NC}"
    fi

    echo ""
    echo "=========================================="
}

# 执行主函数
main
