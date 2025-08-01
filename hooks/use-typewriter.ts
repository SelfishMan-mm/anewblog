'use client';

import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
}

export function useTypewriter(
  strings: string[],
  options: UseTypewriterOptions = {}
) {
  const {
    typeSpeed = 150,
    backSpeed = 80,
    backDelay = 4000,
    startDelay = 800,
    loop = true
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!strings.length) return;

    const currentString = strings[currentStringIndex];
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        // 删除字符
        if (currentCharIndex > 0) {
          setDisplayText(currentString.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          // 删除完成，切换到下一个字符串
          setIsDeleting(false);
          setCurrentStringIndex(prev => 
            loop ? (prev + 1) % strings.length : Math.min(prev + 1, strings.length - 1)
          );
        }
      } else {
        // 添加字符
        if (currentCharIndex < currentString.length) {
          setDisplayText(currentString.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // 输入完成，准备删除（如果是循环模式）
          if (loop && strings.length > 1) {
            setTimeout(() => {
              setIsDeleting(true);
            }, backDelay);
          }
          setIsTyping(false);
        }
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [
    strings,
    currentStringIndex,
    currentCharIndex,
    isDeleting,
    typeSpeed,
    backSpeed,
    backDelay,
    loop
  ]);

  // 初始延迟
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [startDelay]);

  return {
    displayText,
    isTyping,
    currentStringIndex
  };
}
