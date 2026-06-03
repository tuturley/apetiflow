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

## Telas


### Painel Admin (`/`)

- Sidebar com navegação
- Botão **+ Novo Pedido**
- 3 colunas: Preparando, Fritando, Pronto
- 1 clique para mudar status

### TV Motoboys (`/tv`)

- Layout fullscreen dark
- Cards grandes com número, plataforma, itens e timer
- Atualização instantânea via Firebase

## Mudanças futuras

- Adicionar login (Firebase Auth) no `OrdersContext`
- Histórico em `orders_archive/`
- Notificações sonoras quando status = `ready`
- PWA para instalar na TV
- Métricas de tempo médio por etapa

---

Desenvolvido para operação em horário de pico — poucos cliques, máxima legibilidade.
=======
# apetiflow
Kitchen Display System (KDS) para deliverys e cozinhas operacionais.
