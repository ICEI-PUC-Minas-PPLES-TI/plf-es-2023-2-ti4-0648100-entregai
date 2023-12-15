# Entregaí
![Entregaí Logo](/Codigo/entregai/src/styles/img/entregai_logo_white_shadow.png)

Uma aplicação web que tem como objetivo relacionar a realização de pedidos de delivery ao gerenciamento de produtos e entregas de diversas unidades de uma rede de supermercados.

## Problema e contextualização

O cliente do projeto atua na administração de diversos setores da rede de supermercados “Preço Baixo”, na cidade de Salvador - BA. 

Atualmente, a empresa possui três unidades físicas, nas quais se tem percebido uma crescente demanda por delivery de produtos para residentes de suas respectivas regiões. Visando atender essa urgência e aprimorar o desempenho do negócio, o cliente relatou a necessidade de uma ferramenta que permitisse, sobretudo de forma simples, o contato dos clientes com a empresa e a subsequente realização de pedidos, permitindo gerenciamento eficiente e automatizado das solicitações de entrega de mercadorias.

Contudo, as ferramentas existentes no mercado apresentam soluções muito abrangentes, acentuando a necessidade do cliente de uma plataforma especializada em suas necessidades e regras de negócio. Além disso, o cliente ressaltou a importância da simplicidade e facilidade de uso da plataforma desejada, visto que esta deverá se alinhar ao público-alvo do negócio, o qual não apresenta, de forma geral, alta literacia digital.


## Proposta de solução
A solução proposta pela equipe é desenvolver um sistema para gerenciamento de solicitações de entregas de um supermercado, informatizando o recebimento de pedidos de delivery e implementando uma visão de sistema contendo o estoque dos produtos disponíveis nas unidades de supermercado.


## Alunos integrantes da equipe

* André Rodrigues de Freitas 
* Carlos Emanuel Silva e Melo
* Gustavo Andrade Alves
* Letícia Teixeira Lott Carvalho
* Yan Rodrigues Nalon


## Professores responsáveis

* Profa. Lucila Ishitani
* Profa. Soraia Lúcia da Silva


## Instruções de utilização

Você pode acessar o Entregaí a partir do link https://entregai.vercel.app. Para acessar o painel de administração contate um dos contribuidores do repositório.

Se preferir executar a aplicação localmente, siga os seguintes passos:

1. **Pré-requisitos**
    - Certifique-se de que você possui o [Node.js](https://nodejs.org/en) em sua versão mais estável e o [Git](https://git-scm.com/) instalados em sua máquina.
    - Esse projeto faz uso das plataformas [Firebase](https://firebase.google.com/?hl=pt) e [GCP](https://developers.google.com/maps?hl=pt-br). Portanto, será necessário que você possua uma conta Google com acesso a essas ferramentas.

2. **Clone o repositório**
    - Abra um terminal e execute o seguinte comando para clonar o repositório:
      ```bash
        git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2023-2-ti4-0648100-entregai
      ```
   - Alternativamente, você pode fazer download do projeto na página deste repositório no GitHub. Para isso, clique em `Code > Download ZIP`
   
3. **Navegue até a raiz da pasta do projeto**
    - Vá para o diretório da aplicação usando o comando:
      ```bash
        cd Codigo/entregai
      ```

4. **Instale as dependências**
    - Instale as dependências necessárias para execução do projeto utilizando o comando:
      ```bash
        npm i
      ```

5. **Configure as variaveis de ambiente**
    - Com os acessos ao Firebase e GCP, agora será necessário que você configure as variaveis de ambiente do projeto.
    - No arquivo `Codigo/entregai/.env.example` você encontrará a estrutura padrão das variaveis, mas antes será necessário que você remova o `.example` do nome do arquivo.
    - Em seguida, insira nos campos vazios as URLs de conexão, chaves privadas de API e IDs correspondentes ao seu projeto no Firebase / GCP.
    - **Atenção:** O campo `URL` deve ser preenchido com a URL do ambiente atual de execução (localhost). Por exemplo, no caso do deploy na Vercel, esse campo foi alterado para ```https://entregai.vercel.app```.
    - Os campos sob **Master Credentials** devem ser preenchidos tendo em mente que o usuário criado com essas credenciais será o Administrador Master da aplicação que receberá todos os acessos e permissões.

5. **Execute a aplicação**
    - Após a conclusão da instalação de dependências e configuração das variaveis de ambinete, inicie o aplicativo com o seguinte comando:
      ```bash
        npm run dev
      ```

6. **Crie o Administrador Master**
    - Esse passo só deverá ser executado uma vez em todo o ciclo de vida da aplicação.
    - Após a inicialização do aplicativo, no seu terminal de preferência execute o seguinte comando substituindo os campos `{{URL}}`, `{{ADMIN_EMAIL}}` e `{{ADMIN_PASSWORD}}` pelos campos correspondentes ao arquivo de variaveis de ambiente:
    ```bash
      curl --location --request PUT {{URL}}/api/user/handler?email={{ADMIN_EMAIL}}&password={{ADMIN_PASSWORD}}
    ```
    - **Atenção:** 
      - Os campos ADMIN_EMAIL e ADMIN_PASSWORD são sensiveis e devem ser idênticos ao que foi configurado anteriormente.
      - O campo ADMIN_EMAIL não aceita '@', portanto substitua-o por '%40'.
      - O campo ADMIN_PASSWORD deve possuir no minimo 6 caracteres.

6. **Acesse a aplicação:**
    - Após a aplicação ser iniciada com sucesso, abra um navegador web e acesse a URL:
      ```http://localhost:3000```
    - Certifique-se de que a aplicação esteja em execução enquanto você a utiliza.
    - Para o primeiro login, utilize as credenciais de administrador criadas nos passos anteriores.



