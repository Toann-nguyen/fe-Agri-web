'use client';

import { Icon } from '@iconify/react';
import { YouTubeEmbed } from '@next/third-parties/google';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

// Danh sách video YouTube — thêm object vào đây để hiển thị thêm video
const YOUTUBE_VIDEOS = [
  {
    id: 'vfOC5ev0rpI',
    title:
      '[C++] LeetCode 11: Container With Most Water | Two Pointers Approach Explained ',
    description:
      '- Tóm tắt bài toán: Bài toán yêu cầu chúng ta tìm diện tích lớn nhất chứa nước giữa 2 cột bất kỳ trong một mảng. Thay vì dùng 2 vòng lặp lồng nhau (Brute Force) tốn thời gian $O(N^2)$, mình sẽ hướng dẫn các bạn cách sử dụng kỹ thuật Two Pointers dịch chuyển từ 2 đầu để giảm độ phức tạp xuống chỉ còn 0(n)',
  },
  {
    id: 'cTPhQQt1Dpc',
    title: '[MYSQL] LeetCode 175: Combine Two Tables | Full Explanation',
    description:
      '175. Combine Two Tables  phân biệt giữa inner join và left join',
  },
];

export const YoutubeSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="youtube"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      aria-label="YouTube Videos"
    >
      {/* Nền dot-grid */}
      <div className="dot-grid-dark absolute inset-0 opacity-20" />

      {/* Hiệu ứng glow góc trái */}
      <div className="pointer-events-none absolute left-0 top-0 size-[400px] rounded-full bg-red-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Tiêu đề section */}
        <div className="reveal mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-red-400 backdrop-blur-sm">
            <Icon icon="mdi:youtube" width="14" />
            Video Youtube
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Watch It{' '}
            <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
              Youtube
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            Video youtube của mình về Leetcode C++, MySQL
          </p>
        </div>

        {/* Grid video */}
        <div className="grid gap-8 md:grid-cols-2">
          {YOUTUBE_VIDEOS.map((video, index) => (
            <div
              key={video.id}
              className={`reveal${index % 2 === 0 ? '-left' : '-right'} glow-border group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm`}
              style={{ '--stagger': index } as React.CSSProperties}
            >
              {/* YouTube embed — lazy load khi vào viewport */}
              <div className="relative aspect-video w-full overflow-hidden">
                <YouTubeEmbed
                  videoid={video.id}
                  params="rel=0&modestbranding=1"
                  style="width:100%;border-radius:0;"
                />
              </div>

              {/* Thông tin video */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center gap-2">
                  {/* Badge YouTube */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-400">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                    </span>
                    YouTube
                  </span>
                </div>

                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-red-400">
                  {video.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {video.description}
                </p>

                {/* Link mở YouTube */}
                <a
                  href={`https://youtu.be/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-auto inline-flex items-center gap-2 pt-2 font-mono text-xs font-medium text-red-400 transition-all duration-200 hover:text-red-300"
                >
                  Xem trên YouTube
                  <Icon
                    icon="mdi:open-in-new"
                    className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    width="13"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
