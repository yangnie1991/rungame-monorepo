import { z } from "zod"

// 创建分类的验证 Schema
export const categorySchema = z.object({
    slug: z.string().min(1, "标识符不能为空").regex(/^[a-z0-9-]+$/, "标识符只能包含小写字母、数字和连字符"),
    icon: z.string().optional(),
    sortOrder: z.coerce.number().int().min(0, "排序值不能为负数").default(0),
    // 主表字段（英文作为回退）
    name: z.string().min(1, "英文名称不能为空"),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional(),
    // 翻译数据（可以包含英文，用于覆盖主表）
    translations: z.array(
        z.object({
            locale: z.string(),
            name: z.string().min(1, "名称不能为空"),
            description: z.string().optional(),
            metaTitle: z.string().optional(),
            metaDescription: z.string().optional(),
            keywords: z.string().optional(),
        })
    ).default([])
})

export type CategoryFormData = z.infer<typeof categorySchema>
