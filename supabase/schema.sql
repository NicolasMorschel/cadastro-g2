create table if not exists public.curriculos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text,
  email text not null,
  endereco_web text,
  experiencia text not null,
  criado_em timestamptz not null default now(),
  constraint curriculos_nome_obrigatorio check (length(trim(nome)) > 0),
  constraint curriculos_email_obrigatorio check (length(trim(email)) > 0),
  constraint curriculos_experiencia_obrigatoria check (length(trim(experiencia)) > 0),
  constraint curriculos_nome_tamanho check (char_length(nome) <= 120),
  constraint curriculos_telefone_tamanho check (telefone is null or char_length(telefone) <= 30),
  constraint curriculos_email_tamanho check (char_length(email) <= 160),
  constraint curriculos_url_tamanho check (endereco_web is null or char_length(endereco_web) <= 200),
  constraint curriculos_experiencia_tamanho check (char_length(experiencia) <= 2000),
  constraint curriculos_email_formato check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint curriculos_url_segura check (
    endereco_web is null
    or endereco_web like 'http://%'
    or endereco_web like 'https://%'
  )
);

alter table public.curriculos enable row level security;

grant select, insert on public.curriculos to anon;
revoke update, delete on public.curriculos from anon;

do $$
begin
  if exists (
    select 1
    from pg_proc
    join pg_namespace on pg_namespace.oid = pg_proc.pronamespace
    where pg_namespace.nspname = 'public'
      and pg_proc.proname = 'rls_auto_enable'
      and pg_get_function_identity_arguments(pg_proc.oid) = ''
  ) then
    revoke execute on function public.rls_auto_enable() from anon, authenticated, public;
  end if;
end
$$;

drop policy if exists "Permitir leitura publica dos curriculos" on public.curriculos;
create policy "Permitir leitura publica dos curriculos"
on public.curriculos
for select
to anon
using (true);

drop policy if exists "Permitir cadastro publico de curriculos" on public.curriculos;
create policy "Permitir cadastro publico de curriculos"
on public.curriculos
for insert
to anon
with check (
  length(trim(nome)) > 0
  and length(trim(email)) > 0
  and length(trim(experiencia)) > 0
  and char_length(nome) <= 120
  and (telefone is null or char_length(telefone) <= 30)
  and char_length(email) <= 160
  and (endereco_web is null or char_length(endereco_web) <= 200)
  and char_length(experiencia) <= 2000
  and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  and (
    endereco_web is null
    or endereco_web like 'http://%'
    or endereco_web like 'https://%'
  )
);

create index if not exists curriculos_criado_em_idx
on public.curriculos (criado_em desc);
