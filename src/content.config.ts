// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // 최신 방식은 glob 로더를 사용합니다.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://glacks06.github.io', // 본인의 깃허브 페이지 주소
  base: '/ChanPage', // 저장소 이름 (예: 저장소 이름이 my-website라면 '/my-website')
});

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  date: z.date().optional(),
});

// const algorithm = defineCollection({
//   // 중요: loader의 base 경로가 실제 파일 위치와 일치해야 합니다.
//   loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/algorithm" }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     category: z.enum(['implementation', 'bruteforce', 'binary-search', 'recursion', 'greedy']),
//     date: z.date().optional(),
//   }),
// });

const algorithm = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/algorithm' }),
  schema: postSchema,
});

const techLog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/tech-log' }),
  schema: postSchema,
});

const insights = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/insights' }),
  schema: postSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: postSchema,
});

export const collections = { algorithm, techLog, insights, projects };