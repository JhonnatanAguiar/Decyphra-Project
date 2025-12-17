# Instruções: Adicionar GitHub Actions Secrets

Este documento descreve como adicionar os *repository secrets* necessários para o workflow CI do projeto.

Secrets exigidos pelo workflow (recomendados):
- `DATABASE_URL` — URL de conexão com o PostgreSQL (Neon).
- `RESEND_API_KEY` — chave da API Resend (opcional; só necessária para enviar e-mails reais).
- `EMAIL_FROM` — endereço remetente (ex.: noreply@decyphra.com.br).
- `EMAIL_TO` — endereço que receberá notificações de contato (ex.: seu e-mail).

ATENÇÃO: não compartilhe esses valores publicamente. Use segredos do GitHub ou um gerenciador seguro.

---

## 1) Método recomendado: GitHub Web UI (passo a passo)

1. Acesse o repositório no GitHub.
2. Vá em `Settings` -> `Secrets and variables` -> `Actions`.
3. Clique em `New repository secret`.
4. Em `Name` coloque o nome do secret (ex.: `DATABASE_URL`).
5. Em `Value` cole o valor (ex.: a URL do Neon). Clique em `Add secret`.
6. Repita para `RESEND_API_KEY`, `EMAIL_FROM` e `EMAIL_TO`.

Observações:
- Secrets adicionados aqui ficam disponíveis para os workflows de Actions como `${{ secrets.DATABASE_URL }}`.
- Apenas contas com permissão de administrador do repositório podem adicionar secrets.

---

## 2) Método via `gh` CLI (linha de comando)

Pré-requisitos:
- `gh` CLI instalado e autenticado com uma conta que tenha permissão `repo`/admin no repositório.

Exemplos práticos:

1) Adicionar `DATABASE_URL` lendo de `.env.local` (evita imprimir o segredo no terminal):

```bash
VAL=$(sed -n 's/^DATABASE_URL=//p' .env.local | sed 's/^"//;s/"$//')
echo "$VAL" | gh secret set DATABASE_URL --repo OWNER/REPO -b -
```

Substitua `OWNER/REPO` pelo caminho do seu repositório (ex.: `JhonnatanAguiar/Decyphra-Project`).

2) Adicionar os demais secrets (substitua os valores):

```bash
echo "your-resend-api-key" | gh secret set RESEND_API_KEY --repo OWNER/REPO -b -
echo "noreply@decyphra.com.br" | gh secret set EMAIL_FROM --repo OWNER/REPO -b -
echo "you@example.com" | gh secret set EMAIL_TO --repo OWNER/REPO -b -
```

3) Verificar os secrets configurados (lista nomes, não valores):

```bash
gh secret list --repo OWNER/REPO
```

4) Remover um secret:

```bash
gh secret remove DATABASE_URL --repo OWNER/REPO
```

Observações sobre permissões e erros comuns:
- Se receber erro `Resource not accessible by integration` ou `403`, verifique se o `gh` está autenticado com uma conta que tenha permissão de administrador no repositório e se o token tem o escopo correto. Rode `gh auth status` para checar.
- Se preferir evitar CLI, use o método Web UI descrito acima.

---

## 3) Recomendações de segurança e práticas

- Use chaves de ambiente de staging (não a chave de produção) para testes automatizados.
- Nunca comite chaves em arquivos `.env` no repositório público.
- Limite o uso de secrets no workflow (só exponha o que for necessário).

---

## 4) Como os workflows usam os secrets

No workflow (ex.: `.github/workflows/ci.yml`) os secrets são referenciados assim:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

Os steps do workflow podem usar essas variáveis de ambiente normalmente.

---

## 5) Precisa de ajuda?

Se quiser, eu posso:
- gerar um script com os comandos `gh secret set` prontos para você executar localmente (não irei executar sem sua confirmação), ou
- tentar executar os comandos daqui se você der permissão de acesso (não recomendado fornecer tokens abertamente). 

Fim.

***
Arquivo gerado por automação em 17/12/2025 para instruir sobre adição de secrets no repositório.
