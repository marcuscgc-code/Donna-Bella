# Como publicar o site Donna Bella (passo a passo)

Este guia é para quem nunca usou a Netlify. Siga na ordem — cada passo depende
do anterior.

## 0. Antes de começar

O código precisa estar em um repositório no **GitHub**. Se ainda não estiver:

1. Crie uma conta em [github.com](https://github.com) (se ainda não tiver).
2. Crie um repositório novo (pode ser privado).
3. Envie o código deste projeto para esse repositório (`git init`, `git add .`,
   `git commit`, `git remote add origin ...`, `git push`).

Se precisar de ajuda com esse envio inicial, peça para quem está te ajudando
com o projeto — esse passo só é feito uma vez.

## 1. Conectar o repositório à Netlify e fazer o primeiro deploy

1. Acesse [app.netlify.com](https://app.netlify.com) e crie uma conta (dá para
   entrar direto com sua conta do GitHub).
2. Clique em **"Add new site" → "Import an existing project"**.
3. Escolha **GitHub** e autorize o acesso quando pedido.
4. Selecione o repositório do projeto Donna Bella.
5. A Netlify já vai detectar as configurações de build automaticamente (elas
   estão no arquivo `netlify.toml` do projeto). Não precisa mudar nada — só
   confirmar clicando em **"Deploy site"**.
6. Aguarde alguns minutos. Quando o status mudar para **"Published"**, o site
   já está no ar em um endereço temporário tipo
   `nome-aleatorio-123.netlify.app`.

## 2. Habilitar "Identity"

O Identity é o sistema de login da Netlify — é ele que vai controlar quem
pode entrar no painel de administração do site.

1. Dentro do site na Netlify, vá em **"Site configuration" → "Identity"**.
2. Clique em **"Enable Identity"**.

## 3. Habilitar "Git Gateway" dentro de Identity

O Git Gateway é o que permite que o painel (Decap CMS) salve as alterações de
produtos diretamente no repositório do GitHub, sem que a lojista precise saber
o que é Git.

1. Ainda na seção **Identity**, role até **"Services" → "Git Gateway"**.
2. Clique em **"Enable Git Gateway"**.

## 4. Convidar a administradora e desabilitar cadastro público

Por segurança, o painel deve ter **apenas uma pessoa com acesso**: a
administradora da loja.

1. Em **Identity → Settings**, procure **"Registration"** e mude para
   **"Invite only"** (cadastro só por convite — ninguém consegue criar conta
   sozinho digitando a URL).
2. Vá na aba **"Identity" → "Invite users"**.
3. Digite o e-mail da administradora (Enedina) e envie o convite.
4. Ela vai receber um e-mail da Netlify com um link para criar a senha. Depois
   de definir a senha, o acesso já está liberado.

## 5. Acessar o painel do CMS

Depois de logada, a administradora acessa o painel em:

```
https://SEU-SITE.netlify.app/admin
```

(trocando `SEU-SITE` pelo endereço real do site, ou pelo domínio próprio, se
já tiver configurado — veja o próximo passo).

Lá ela vai ver três seções no menu lateral: **Produtos**, **Cores** e
**Configurações da Loja** — tudo em português, com campos simples (nome,
preço, foto, cor, tamanho primeiro).

## 6. Conectar um domínio próprio (quando tiver um)

Se no futuro vocês comprarem um domínio (ex.: `donnabella.com.br`):

1. No site da Netlify, vá em **"Domain management" → "Add a domain"**.
2. Digite o domínio comprado.
3. A Netlify vai mostrar os registros de DNS que precisam ser configurados
   onde o domínio foi comprado (Registro.br, GoDaddy, etc.) — geralmente um
   registro do tipo `A` ou `CNAME` apontando para a Netlify.
4. Depois de configurar no painel do registrador, pode levar algumas horas
   para o domínio começar a funcionar. A Netlify emite um certificado de
   segurança (HTTPS) automaticamente assim que detectar o domínio ativo.

---

# Checklist antes de convidar a administradora

Confira cada item manualmente antes de liberar o acesso para a Enedina:

- [ ] O site publicado abre normalmente em `https://SEU-SITE.netlify.app`
- [ ] Home, Catálogo, página de Produto, Carrinho e Contato carregam sem erro
- [ ] O botão "Finalizar no WhatsApp" abre a conversa com o número correto
- [ ] Identity está habilitado e o registro está em "Invite only"
- [ ] Git Gateway está habilitado
- [ ] Você mesmo(a) recebeu um convite de teste, criou senha e conseguiu
      logar em `/admin`
- [ ] Dentro do `/admin`, você conseguiu:
  - [ ] Editar um produto existente e salvar
  - [ ] Fazer upload de uma foto nova pelo celular (ou computador) e ver o
        preview aparecer
  - [ ] Criar uma cor nova em "Cores" e ela aparecer disponível ao editar um
        produto
  - [ ] Publicar a alteração e confirmar que ela aparece no site publicado
        (pode levar 1–2 minutos para o novo deploy terminar)
- [ ] Testou o fluxo em um celular real (tela pequena), já que é assim que a
      administradora vai usar no dia a dia
- [ ] Só depois de tudo isso, envie o convite oficial para o e-mail da
      administradora
