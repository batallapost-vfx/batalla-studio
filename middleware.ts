import { NextRequest, NextResponse } from "next/server";

// pantalla en mantenimiento: pide usuario/contraseña mientras se termina de armar el sitio.
// si no hay credenciales configuradas (ej. en local), no bloquea nada.
export function middleware(request: NextRequest) {
  const user = process.env.SITE_USER;
  const pass = process.env.SITE_PASSWORD;
  if (!user || !pass) return NextResponse.next();

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const [u, p] = Buffer.from(auth.slice(6), "base64").toString().split(":");
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Batalla Studio"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
