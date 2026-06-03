# APETIFLOW

Sistema web para gestão de fluxo de pedidos de delivery em cozinha de salgados — inspirado em KDS (Kitchen Display System) do McDonald's e painéis do iFood.

## Stack

- **React** — interface
- **Vite** — build e dev server rápido
- **Tailwind CSS v4** — estilos
- **Firebase Realtime Database** — sincronização em tempo real entre Admin e TV

## Estrutura de pastas

```
apetiflow/
├── public/                 # Arquivos estáticos (favicon)
├── src/
│   ├── components/
│   │   ├── layout/         # Sidebar, banners
│   │   ├── orders/         # Cards, colunas, modal
│   │   └── ui/             # Badge plataforma, timer
│   ├── config/
│   │   └── firebase.ts     # Inicialização do Firebase
│   ├── context/
│   │   └── OrdersContext.tsx # Estado global + listeners
│   ├── hooks/
│   │   └── useTimer.ts     # Timer em tempo real
│   ├── pages/
│   │   ├── AdminPage.tsx   # Painel da cozinha
│   │   └── TVMotoboysPage.tsx # Tela fullscreen TV
│   ├── services/
│   │   └── ordersService.ts # CRUD no Realtime Database
│   ├── types/
│   │   └── order.ts        # Tipos TypeScript
│   ├── utils/
│   │   ├── constants.ts    # Plataformas, itens rápidos
│   │   └── format.ts       # Formatação de tempo
│   ├── App.tsx             # Rotas
│   ├── main.tsx            # Entrada React
│   └── index.css           # Tailwind + tema dark
├── .env.example            # Modelo das variáveis Firebase
├── vercel.json             # SPA redirect para deploy
└── vite.config.ts
```

## Passo a passo — criar o projeto do zero

Se você quiser refazer manualmente (aprendizado):

```bash
npm create vite@latest apetiflow -- --template react-ts
cd apetiflow
npm install
npm install firebase react-router-dom
npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react
```

Depois configure `vite.config.ts`, `index.css` com `@import "tailwindcss"` e as pastas acima.

## Configurar Firebase (Realtime Database)

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um projeto (ex: `apetiflow-prod`)
3. No menu lateral: **Build → Realtime Database → Criar banco**
   - Modo de teste para desenvolvimento (ajuste regras depois)
4. **Configurações do projeto → Seus apps → Web (`</>`)**
5. Copie as credenciais para um arquivo `.env` na raiz:

```bash
copy .env.example .env
```

Preencha todas as variáveis `VITE_*`.

### Regras sugeridas (desenvolvimento)

No Realtime Database → **Regras**:

```json
{
  "rules": {
    "orders": {
      ".read": true,
      ".write": true
    }
  }
}
```

> Em produção, use autenticação e regras restritivas.

### Estrutura dos dados no Firebase

```
orders/
  └── {idAuto}/
        orderNumber: "4521"
        platform: "ifood"
        items: ["Coxinha", "Pastel"]
        status: "preparing" | "frying" | "ready" | "delivered" | "cancelled"
        createdAt: 1717000000000
        updatedAt: 1717000000000
```

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

- **Admin:** http://localhost:5173/
- **TV Motoboys:** http://localhost:5173/tv

Na TV da garagem, abra `/tv` e pressione **F11** (fullscreen).

## Fluxo operacional

| Status      | Coluna TV | Ação no Admin        |
|------------|-----------|----------------------|
| preparing  | Amarelo   | Botão **Fritando**   |
| frying     | Laranja   | Botão **Pronto**     |
| ready      | Verde     | Botão **Entregue**   |
| delivered  | (some)    | —                    |
| cancelled  | (some)    | Botão **Cancelar**   |

## Publicar na Vercel

1. Suba o código para GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório
3. Framework: **Vite** (detectado automaticamente)
4. Em **Environment Variables**, adicione todas as `VITE_FIREBASE_*` do `.env`
5. Deploy

O arquivo `vercel.json` garante que rotas como `/tv` funcionem (SPA).

## Telas

### Painel Admin (`/`)

- Sidebar com navegação
- Botão **+ Novo Pedido**
- 3 colunas: Preparando, Fritando, Pronto
- 1 clique para mudar status

### TV Motoboys (`/tv`)

- Layout fullscreen dark premium
- Cards grandes com número, plataforma, itens e timer
- Atualização instantânea via Firebase

## Escalabilidade futura

- Adicionar login (Firebase Auth) no `OrdersContext`
- Histórico em `orders_archive/`
- Notificações sonoras quando status = `ready`
- PWA para instalar na TV
- Métricas de tempo médio por etapa

---

Desenvolvido para operação em horário de pico — poucos cliques, máxima legibilidade.
