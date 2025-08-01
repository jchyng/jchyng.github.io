---
title: "Supabase와 Next.js SSR을 활용한 Google OAuth 연동 가이드"
date: "2025-08-01"
excerpt: "Supabase와 Next.js의 서버 사이드 렌더링(SSR)을 활용하여 Google OAuth를 연동하는 방법을 다룹니다."
tags: ["Supabase", "Next.js", "Google OAuth", "SSR"]
thumbnail: "/images/posts/Features/supabase-google-oauth/thumbnail.png"
---

## Supabase와 Next.js SSR로 Google OAuth 연동하기

### 1. Supabase Google OAuth 활성화

1.  supabase 프로젝트 생성 후 `dashboard > Authentication > Sign In / Providers`에서 Google을 선택하고 `Enable` 한다.
2.  Google API 설정을 통해 생성한 클라이언트 ID와 Secret(보안 비밀번호) 입력

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; align-items: center;">
  <img src="/images/posts/Features/supabase-google-oauth/supa1.png" style="height: 400px; width: auto;" />
  <img src="/images/posts/Features/supabase-google-oauth/supa2.png" style="height: 400px; width: auto;" />
  <img src="/images/posts/Features/supabase-google-oauth/supa3.png" style="height: 400px; width: auto;" />
</div>

<br/>

### 2. Google API 자격 증명 설정

1. **Google Cloud Console**로 이동하여 새 프로젝트를 생성
2. **API 및 서비스 > 사용자 인증 정보** 탭에서 `사용자 인증 정보 만들기 > OAuth 클라이언트 ID`를 선택
3. 애플리케이션 유형을 `웹 애플리케이션`으로 설정
4. **승인된 리디렉션 URI**에 Supabase 프로젝트의 콜백 URL을 추가
   - (일반적으로 `https://<내-프로젝트-ref>.supabase.co/auth/v1/callback` 형식)

<div style="display: flex; justify-content: space-around; flex-wrap: wrap; align-items: center;">
  <img src="/images/posts/Features/supabase-google-oauth/gc1.png" style="height: 300px; width: auto;" />
  <img src="/images/posts/Features/supabase-google-oauth/gc2.png" style="height: 300px; width: auto;" />
</div>
<img src="/images/posts/Features/supabase-google-oauth/gc3.png" style="height: 500px; width: auto;" />

<br/>

### 3. Next.js SSR 환경에서 Google 로그인 구현

[Supabase Auth docs](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
<br/>

#### supabase 라이브러리 설치

```bash
npm install @supabase/ssr @supabase/supabase-js
```

#### .env.local 설정

Key 정보는 Supabase Dashboard > Project Settings > General의 Project ID / API Key의 ANON_KEY

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

<br/>

#### supabase client server

`utils/supabase/client.ts`

```ts
import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

`utils/supabase/server.ts`

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

<br/>

#### middleware

`middleware.ts`

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

`utils/supabase/middleware.ts`

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
```

> 문서의 주의사항으로는 반드시 supabase.auth.getSession()이 아닌 supabase.auth.getUser()를 사용하라고 한다.

<br/>

#### login page

`app/login/page.tsx`

```ts
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
```

`app/login/actions.ts`

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
```

<br/>

#### login confirm route

`app/auth/confirm/route.ts`

```ts
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
```
