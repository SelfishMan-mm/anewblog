'use client';

import { motion } from 'motion/react';
import { ComponentErrorBoundary } from '@/components/error-boundary';
import { Boxes } from '@/components/ui/background-boxes';

export function DoingSection() {
  return (
    <ComponentErrorBoundary componentName="DoingSection">
      <section className="min-h-screen py-20 px-8 relative overflow-hidden bg-background">
         {/* 背景装饰 */}
        <div className="absolute inset-0 w-full h-full bg-background flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
        </div>

        <div className="max-w-4xl mx-auto relative z-30 pt-10">
          {/* Notion-like Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">我正在做什么</h1>
            <p className="text-muted-foreground text-lg">Now / What I'm Doing</p>
          </motion.div>

          {/* Content Blocks */}
          <div className="space-y-6">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group bg-card/40 border border-border/50 rounded-xl p-6 backdrop-blur-sm hover:bg-card/60 transition-all hover:border-border"
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl mt-1 bg-muted/50 p-2 rounded-lg group-hover:scale-110 transition-transform">💻</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Web3 探索与黑客松</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    学习 Web3 知识，学习的过程中我参加了 <span className="text-primary font-medium bg-primary/10 px-1 rounded">x402 黑客松</span>。
                    尽管我对 x402 协议知之甚少，但跨出第一步永远是最正确的。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group bg-card/40 border border-border/50 rounded-xl p-6 backdrop-blur-sm hover:bg-card/60 transition-all hover:border-border"
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl mt-1 bg-muted/50 p-2 rounded-lg group-hover:scale-110 transition-transform">🔍</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">寻找 Web3 机遇</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    我正在寻求一份有关 Web3 的工作。为此我在不断开辟道路，不断学习，
                    致力于在这个充满潜力的领域找到自己的位置。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group bg-card/40 border border-border/50 rounded-xl p-6 backdrop-blur-sm hover:bg-card/60 transition-all hover:border-border"
            >
              <div className="flex items-start gap-5">
                <span className="text-3xl mt-1 bg-muted/50 p-2 rounded-lg group-hover:scale-110 transition-transform">📚</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">投资英语</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    持续投入时间精力提升英语能力，打破语言障碍，以便更好地获取全球前沿信息并与国际社区交流。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer Quote or Status */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="mt-12 pt-8 border-t border-border text-muted-foreground text-sm flex justify-between items-center"
          >
            <span className="italic">"Keep pushing forward."</span>
            <span>Last updated: 2025-12-12</span>
          </motion.div>
        </div>
      </section>
    </ComponentErrorBoundary>
  );
}
