import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server';

export async function GET() {
  const supabase = await createClient();
  
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  const { data: memberId } = await supabase.rpc('get_my_member_id');
  
  return NextResponse.json({
    user: user ? { id: user.id, email: user.email } : null,
    userError: userErr?.message ?? null,
    memberId,
  });
}
