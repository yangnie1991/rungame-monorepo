/**
 * 从 GamePix URL 中移除 w= 参数，获取原图
 * 
 * @param url GamePix 图片 URL
 * @returns 原图 URL
 */
export function removeWidthParameter(url: string | null | undefined): string {
    if (!url) return ''

    try {
        const urlObj = new URL(url)
        // 删除 w 参数
        urlObj.searchParams.delete('w')
        urlObj.searchParams.delete('W')
        return urlObj.toString()
    } catch (error) {
        // console.error('解析 URL 失败:', error)
        return url
    }
}
