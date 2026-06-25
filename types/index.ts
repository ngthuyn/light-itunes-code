export interface Claim {
  id: number;
  fandom: string;
  email: string;
  code: string;
  time: string;
}

export interface Stats {
  total: number;
  claimed: number;
  remaining: number;
}

export interface ClaimResponse {
  success: boolean;
  code?: string;
  message?: string;
}