export const Status = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REPROVED: 'reproved',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface CandidateStatus {
  fileName: string;
  documentWords: string[];
  searchWords: string[];
  wordsCount: number;
  foundWords: string[];
  percent: number;
  status: Status;
}

export type CandidateStatusList = CandidateStatus[];
