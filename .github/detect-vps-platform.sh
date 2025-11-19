#!/bin/bash
# VPS 平台检测脚本
# 用于在 GitHub Actions 中检测 VPS 平台和 OpenSSL 版本
# 输出格式: rhel-openssl-1.1.x

set -e

# 🔍 检测操作系统
OS_ID="unknown"
if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS_ID="$ID"
elif [ -f /etc/redhat-release ]; then
  if grep -qi "centos" /etc/redhat-release; then
    OS_ID="centos"
  elif grep -qi "alibaba" /etc/redhat-release; then
    OS_ID="alinux"
  else
    OS_ID="rhel"
  fi
fi

# 如果仍未识别，通过包管理器判断
if [ "$OS_ID" = "unknown" ]; then
  if command -v rpm &> /dev/null; then
    OS_ID="rhel"
  elif command -v dpkg &> /dev/null; then
    OS_ID="debian"
  elif command -v apk &> /dev/null; then
    OS_ID="alpine"
  fi
fi

# 🔍 检测 OpenSSL 版本
OPENSSL_VERSION=$(openssl version | grep -oP 'OpenSSL \K[0-9]+\.[0-9]+' || echo "1.1")

# 🎯 确定平台
if [[ "$OS_ID" == "debian" || "$OS_ID" == "ubuntu" ]]; then
  BASE_PLATFORM="debian-openssl"
elif [[ "$OS_ID" == "rhel" || "$OS_ID" == "centos" || "$OS_ID" == "alinux" || "$OS_ID" == "rocky" || "$OS_ID" == "almalinux" ]]; then
  BASE_PLATFORM="rhel-openssl"
elif [[ "$OS_ID" == "alpine" ]]; then
  BASE_PLATFORM="linux-musl-openssl"
elif command -v rpm &> /dev/null; then
  BASE_PLATFORM="rhel-openssl"
else
  BASE_PLATFORM="debian-openssl"
fi

# 确定 OpenSSL 版本后缀
if [[ "$OPENSSL_VERSION" == "1.1"* ]]; then
  OPENSSL_SUFFIX="1.1.x"
elif [[ "$OPENSSL_VERSION" == "1.0"* ]]; then
  OPENSSL_SUFFIX="1.0.x"
elif [[ "$OPENSSL_VERSION" == "3"* ]]; then
  OPENSSL_SUFFIX="3.0.x"
else
  OPENSSL_SUFFIX="1.1.x"
fi

# 输出结果（只输出最终值，便于提取）
echo "${BASE_PLATFORM}-${OPENSSL_SUFFIX}"
