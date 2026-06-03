export function FirebaseBanner() {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200">
      <strong>Firebase não configurado.</strong> Copie{' '}
      <code className="rounded bg-black/30 px-1">.env.example</code> para{' '}
      <code className="rounded bg-black/30 px-1">.env</code> e preencha as
      credenciais do Realtime Database.
    </div>
  )
}
