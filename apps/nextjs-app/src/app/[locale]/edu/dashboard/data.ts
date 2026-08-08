import { GradeSubject, NotificationItem, ScheduleItem } from './types';

export const notifications: NotificationItem[] = [
  {
    id: '1',
    sender: 'Cô Nguyễn Thị Mai',
    role: 'GVCN',
    title: 'Nhắc nhở họp phụ huynh & nộp bài tập Vật Lý',
    content:
      'Chào các em, tuần tới trường sẽ tổ chức họp phụ huynh giữa kỳ II. Các em nhớ hoàn thành bài tập Vật lý bài 14 trước 23:59 hôm nay nhé.',
    time: '10 phút trước',
    read: false,
  },
  {
    id: '2',
    sender: 'Ban Giám Hiệu',
    role: 'NhaTruong',
    title: 'Thông báo Lịch nghỉ lễ & Lịch thi Giữa kỳ II',
    content:
      'Nhà trường công bố lịch thi giữa kỳ II bắt đầu từ ngày 18/08. Học sinh theo dõi thời khóa biểu trên hệ thống Edu-AI-VN.',
    time: '2 giờ trước',
    read: false,
  },
  {
    id: '3',
    sender: 'Thầy Trần Văn Đức',
    role: 'GVBM',
    title: 'Cập nhật điểm kiểm tra 15 phút Tiếng Anh Unit 7',
    content:
      'Đã cập nhật bảng điểm 15p Tiếng Anh. Đa số các em làm bài tốt, em An đạt 8.5/10. Cần rèn luyện thêm phần ngữ pháp thì hiện tại hoàn thành.',
    time: '1 ngày trước',
    read: true,
  },
];

export const subjects: GradeSubject[] = [
  {
    id: 'math',
    name: 'Toán Học',
    code: 'TOAN',
    icon: 'mdi:calculator',
    score15m: [9.5, 9.0],
    score1Period: [9.0],
    midTerm: 9.2,
    avgScore: 9.2,
    teacherComment:
      'Tư duy logic rất xuất sắc, giải phương trình nhanh và chính xác.',
    trend: 'up',
  },
  {
    id: 'physics',
    name: 'Vật Lý',
    code: 'LY',
    icon: 'mdi:atom',
    score15m: [9.5, 9.0],
    score1Period: [8.5],
    midTerm: 9.0,
    avgScore: 9.0,
    teacherComment:
      'Nắm vững lý thuyết định luật Ôm, làm bài tập thực hành nghiêm túc.',
    trend: 'up',
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    code: 'ENG',
    icon: 'mdi:translate',
    score15m: [8.5, 8.5],
    score1Period: [8.5],
    midTerm: 9.0,
    avgScore: 8.8,
    teacherComment:
      'Kỹ năng nghe đọc rất tốt. Cần bổ sung thêm vốn từ vựng nâng cao Unit 8.',
    trend: 'stable',
  },
  {
    id: 'literature',
    name: 'Ngữ Văn',
    code: 'VAN',
    icon: 'mdi:book-open-variant',
    score15m: [8.0, 8.5],
    score1Period: [8.5],
    midTerm: 8.8,
    avgScore: 8.5,
    teacherComment:
      'Diễn đạt lưu loát, bài văn phân tích nhân vật có chiều sâu cảm xúc.',
    trend: 'up',
  },
  {
    id: 'chemistry',
    name: 'Hóa Học',
    code: 'HOA',
    icon: 'mdi:flask',
    score15m: [8.5, 8.0],
    score1Period: [8.0],
    midTerm: 8.5,
    avgScore: 8.3,
    teacherComment:
      'Cần chú ý viết đúng phương trình phản ứng hóa học cân bằng ion.',
    trend: 'stable',
  },
  {
    id: 'history',
    name: 'Lịch Sử',
    code: 'SU',
    icon: 'mdi:history',
    score15m: [7.0, 8.0],
    score1Period: [8.0],
    midTerm: 8.2,
    avgScore: 8.0,
    teacherComment:
      'Cần ghi nhớ các mốc thời gian sự kiện lịch sử thế giới chương 3.',
    trend: 'down',
    warning: true,
  },
  {
    id: 'civics',
    name: 'GDCD',
    code: 'GDCD',
    icon: 'mdi:account-group',
    score15m: [9.5, 10.0],
    score1Period: [9.5],
    midTerm: 9.5,
    avgScore: 9.5,
    teacherComment:
      'Thái độ tôn trọng kỷ luật, liên hệ thực tế học bài rất hay.',
    trend: 'up',
  },
];

export const upcomingTasks: ScheduleItem[] = [
  {
    id: 't1',
    title: 'Kiểm tra 1 tiết Toán Học (Chương 4: Phương trình)',
    subject: 'Toán Học',
    type: 'test',
    dueDate: 'Thứ 5, 12/08/2026',
    timeLeft: 'Còn 4 ngày',
    urgent: true,
  },
  {
    id: 't2',
    title: 'Nộp Bài tập về nhà Vật Lý Bài 14 (Định luật Ôm)',
    subject: 'Vật Lý',
    type: 'assignment',
    dueDate: 'Hôm nay, 23:59',
    timeLeft: 'Còn 5 giờ',
    urgent: true,
  },
  {
    id: 't3',
    title: 'Kiểm tra Giữa kỳ Tiếng Anh (Listening & Grammar)',
    subject: 'Tiếng Anh',
    type: 'test',
    dueDate: 'Thứ 6, 13/08/2026',
    timeLeft: 'Còn 5 ngày',
    urgent: false,
  },
  {
    id: 't4',
    title: 'Ngày hội Khoa Học STEM Edu-AI 2026',
    subject: 'Hoạt động trường',
    type: 'event',
    dueDate: 'Thứ 7, 14/08/2026',
    timeLeft: 'Còn 6 ngày',
    urgent: false,
  },
];

export const achievements = [
  {
    title: 'Học sinh Giỏi Học kỳ I',
    desc: 'Đạt ĐTB 8.5+ tất cả các môn',
    icon: 'mdi:certificate',
    date: 'Tháng 01/2026',
  },
  {
    title: 'Giải Nhì HSG Toán Cấp Trường',
    desc: 'Đạt 18.5/20 kỳ thi HSG khối 7',
    icon: 'mdi:medal',
    date: 'Tháng 04/2026',
  },
  {
    title: 'Chăm Chỉ 30 Ngày Tích Cực',
    desc: 'Đăng nhập & nộp bài đúng hạn 30 ngày',
    icon: 'mdi:fire',
    date: 'Tháng 05/2026',
  },
  {
    title: 'Vua Toán Học Edu-AI',
    desc: 'Đạt điểm tối đa trong 5 bài kiểm tra Toán',
    icon: 'mdi:calculator-variant',
    date: 'Tháng 06/2026',
  },
  {
    title: 'Gia Sư AI Master',
    desc: 'Thực hành 50 câu hỏi tư duy cùng AI',
    icon: 'mdi:robot-happy',
    date: 'Tháng 07/2026',
  },
  {
    title: 'Top 3 Học Sinh Xuất Sắc',
    desc: 'Duy trì top 3 liên tục 2 học kỳ',
    icon: 'mdi:star-decagram',
    date: 'HK I & HK II',
  },
];

export const badges = [
  { title: 'Vua Toán', icon: 'mdi:calculator-variant', color: 'text-cyan-400' },
  { title: 'Chăm Chỉ', icon: 'mdi:fire', color: 'text-amber-400' },
  { title: 'AI Master', icon: 'mdi:robot-happy', color: 'text-emerald-400' },
  { title: 'Điểm 10', icon: 'mdi:star-four-points', color: 'text-purple-400' },
];

export const scheduleDays = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

export const aiQuickPrompts = [
  'Giải thích Toán phương trình',
  'Gợi ý ôn thi Tiếng Anh Unit 8',
  'Sơ đồ tư duy Lịch sử chương 3',
];
