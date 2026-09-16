import type {
  Claim,
  Stats,
  ClaimResponse,
} from "@/types";

const API = process.env.NEXT_PUBLIC_API!;

export async function getStats(): Promise<Stats> {
  const res = await fetch(`${API}?action=stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể lấy thống kê.");
  }

  return await res.json();
}

export async function getClaims(): Promise<Claim[]> {
  const res = await fetch(`${API}?action=claims`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách claims.");
  }

  return await res.json();
}

export async function login(password: string) {
  const res = await fetch(
    `${API}?action=login&password=${encodeURIComponent(password)}`
  );

  if (!res.ok) {
    throw new Error("Đăng nhập thất bại.");
  }

  return await res.json();
}

export async function claimCode(
  fandom: string
): Promise<ClaimResponse> {
  const normalizedFandom = fandom.trim();

  const res = await fetch(
    `${API}?action=claim&fandom=${encodeURIComponent(
      normalizedFandom
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Không thể nhận code.");
  }

  return await res.json();
}