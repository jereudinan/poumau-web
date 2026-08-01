interface Env { DB:D1Database }
export default {
  async scheduled(_controller:ScheduledController,env:Env):Promise<void>{
    const expired=await env.DB.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE status='completed' AND completed_at < datetime('now','-3 years')").first<{count:number}>();
    const count=expired?.count??0;
    if(count>0){
      await env.DB.batch([
        env.DB.prepare("DELETE FROM inquiries WHERE status='completed' AND completed_at < datetime('now','-3 years')"),
        env.DB.prepare('INSERT INTO retention_logs(deleted_count) VALUES(?)').bind(count),
      ]);
    }
  }
};
