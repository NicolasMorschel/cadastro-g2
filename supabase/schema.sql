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
  constraint curriculos_email_normalizado check (email = lower(trim(email))),
  constraint curriculos_experiencia_obrigatoria check (length(trim(experiencia)) > 0),
  constraint curriculos_nome_formato check (
    char_length(trim(nome)) >= 2
    and nome !~ '[<>]'
  ),
  constraint curriculos_nome_tamanho check (char_length(nome) <= 120),
  constraint curriculos_telefone_tamanho check (telefone is null or char_length(telefone) <= 30),
  constraint curriculos_telefone_formato check (
    telefone is null
    or (
      telefone ~ '^[0-9]+$'
      and length(telefone) in (10, 11)
    )
  ),
  constraint curriculos_email_tamanho check (char_length(email) <= 160),
  constraint curriculos_url_tamanho check (endereco_web is null or char_length(endereco_web) <= 200),
  constraint curriculos_experiencia_tamanho check (char_length(experiencia) <= 2000),
  constraint curriculos_email_formato check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint curriculos_url_segura check (
    endereco_web is null
    or endereco_web ~* '^https?://[A-Z0-9.-]+\.[A-Z]{2,}(:[0-9]{1,5})?(/[^\s<>"'']*)?$'
  )
);

create or replace function public.normalizar_curriculo()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.nome = trim(new.nome);
  new.email = lower(trim(new.email));
  new.endereco_web = nullif(trim(coalesce(new.endereco_web, '')), '');
  new.experiencia = trim(new.experiencia);

  if new.telefone is not null and trim(new.telefone) <> '' then
    if new.telefone !~ '^[0-9()+\-\s]+$' then
      raise exception 'Telefone invalido.';
    end if;

    new.telefone = regexp_replace(new.telefone, '\D', '', 'g');

    if length(new.telefone) not in (10, 11) then
      raise exception 'Telefone invalido.';
    end if;
  else
    new.telefone = null;
  end if;

  return new;
end;
$$;

revoke execute on function public.normalizar_curriculo() from anon, authenticated, public;

drop trigger if exists normalizar_curriculo_before_write on public.curriculos;
create trigger normalizar_curriculo_before_write
before insert or update on public.curriculos
for each row
execute function public.normalizar_curriculo();

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
  and char_length(trim(nome)) >= 2
  and nome !~ '[<>]'
  and length(trim(email)) > 0
  and length(trim(experiencia)) > 0
  and char_length(nome) <= 120
  and (telefone is null or char_length(telefone) <= 30)
  and (
    telefone is null
    or (
      telefone ~ '^[0-9]+$'
      and length(telefone) in (10, 11)
    )
  )
  and char_length(email) <= 160
  and email = lower(trim(email))
  and (endereco_web is null or char_length(endereco_web) <= 200)
  and char_length(experiencia) <= 2000
  and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  and (
    endereco_web is null
    or endereco_web ~* '^https?://[A-Z0-9.-]+\.[A-Z]{2,}(:[0-9]{1,5})?(/[^\s<>"'']*)?$'
  )
);

create index if not exists curriculos_criado_em_idx
on public.curriculos (criado_em desc);

create unique index if not exists curriculos_email_unico_idx
on public.curriculos (lower(email));

create unique index if not exists curriculos_telefone_unico_idx
on public.curriculos ((regexp_replace(telefone, '[^0-9]', '', 'g')))
where telefone is not null;
