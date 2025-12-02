import { Box } from '@/api/generated';

/**
 * Box numarasını yaş grubu display name'ine çevirir
 * @param boxNumber Box enum değeri (1, 2, veya 3)
 * @returns Yaş grubu string'i veya '-' eğer geçersizse
 */
export function getBoxDisplayName(boxNumber?: Box | number | null): string {
  if (boxNumber === null || boxNumber === undefined) {
    return '-';
  }
  
  switch (boxNumber) {
    case 1:
    case Box.NUMBER_1:
      return '0-2 Yaş';
    case 2:
    case Box.NUMBER_2:
      return '3-5 Yaş';
    case 3:
    case Box.NUMBER_3:
      return '6-8 Yaş';
    default:
      return '-';
  }
}

