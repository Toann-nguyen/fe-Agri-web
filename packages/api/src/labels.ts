/**
 * Label map tiếng Việt cho enum từ OpenAPI specs.
 *
 * LƯU Ý: openapi-typescript chỉ sinh union type (không có runtime value),
 * nên label phải viết tay. Không đặt trong src/generated/ (sẽ bị xoá khi regen).
 *
 * Cách dùng:
 *   import { conductGradeTextLabels, paymentMethodLabels } from '@repo/api/labels';
 */

export const conductGradeTextLabels: Record<string, string> = {
  'Xuất sắc': 'Xuất sắc',
  Tốt: 'Tốt',
  'Trung bình': 'Trung bình',
  Yếu: 'Yếu',
  'Chưa xếp loại': 'Chưa xếp loại',
};

export const disciplineStatusLabels: Record<string, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Bị từ chối',
};

export const gradeTypeLabels: Record<string, string> = {
  quiz: 'Kiểm tra nhanh',
  '15min': 'Kiểm tra 15 phút',
  midterm: 'Giữa kỳ',
  final: 'Cuối kỳ',
};

export const semesterLabels: Record<string, string> = {
  '1': 'Học kỳ 1',
  '2': 'Học kỳ 2',
};

export const paymentMethodLabels: Record<string, string> = {
  cash: 'Tiền mặt',
  bank_transfer: 'Chuyển khoản',
  vnpay: 'VNPay',
};

export const invoiceStatusLabels: Record<string, string> = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  overdue: 'Quá hạn',
  cancelled: 'Đã hủy',
};
