import { createRemoteJWKSet, jwtVerify } from 'jose';

export async function requireAdmin(request:Request,env:RuntimeEnv){
  const url=new URL(request.url);
  if(env.DEV_ADMIN_BYPASS==='true'&&(url.hostname==='localhost'||url.hostname==='127.0.0.1')) return {email:'local-admin'};
  if(!env.TEAM_DOMAIN||!env.POLICY_AUD) throw new Response('Cloudflare Access 설정이 필요합니다.',{status:403});
  const token=request.headers.get('cf-access-jwt-assertion');
  if(!token) throw new Response('관리자 인증이 필요합니다.',{status:403});
  try{const jwks=createRemoteJWKSet(new URL(`${env.TEAM_DOMAIN}/cdn-cgi/access/certs`));const {payload}=await jwtVerify(token,jwks,{issuer:env.TEAM_DOMAIN,audience:env.POLICY_AUD});return {email:String(payload.email??'access-user')}}catch{throw new Response('유효하지 않은 관리자 인증입니다.',{status:403})}
}

export async function audit(env:RuntimeEnv,actor:string,action:string,resourceType:string,resourceId:string|null,details?:unknown){
  await env.DB.prepare('INSERT INTO audit_logs(actor,action,resource_type,resource_id,details) VALUES(?,?,?,?,?)').bind(actor,action,resourceType,resourceId,details?JSON.stringify(details):null).run();
}
