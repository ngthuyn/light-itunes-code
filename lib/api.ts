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

  return await res.json();
}

export async function getClaims(): Promise<Claim[]> {
  const res = await fetch(`${API}?action=claims`, {
    cache: "no-store",
  });

  return await res.json();
}

export async function login(password:string){

    const res=
    await fetch(

        `${API}?action=login&password=${encodeURIComponent(password)}`

    );

    return await res.json();

}
export async function claimCode(
    fandom:string,
    email:string
){

    const res=
    await fetch(

`${API}?action=claim&fandom=${encodeURIComponent(fandom)}&email=${encodeURIComponent(email)}`

    );

    return await res.json();

}