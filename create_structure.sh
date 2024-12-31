#!/usr/bin/env bash

# ------------------------------------
# Script para criar um projeto Node.js + TypeScript com a seguinte hierarquia:
#
#   my-typescript-project/
#   ├── package.json
#   ├── tsconfig.json
#   ├── src/
#   │   ├── config/
#   │   │   └── database.ts
#   │   ├── controllers/
#   │   │   └── customer.controller.ts
#   │   ├── data/
#   │   │   └── customer.repository.ts
#   │   ├── routes/
#   │   │   └── customer.routes.ts
#   │   ├── services/
#   │   │   ├── customer.service.ts
#   │   │   └── __tests__/
#   │   │       └── customer.service.spec.ts
#   │   ├── app.ts
#   │   └── server.ts
#
# E também faz:
#   - npm init -y
#   - npm install --save-dev typescript jest @types/jest ts-jest
#   - npx tsc --init  (gera tsconfig.json)
#   - npx ts-jest config:init (gera jest.config.js)
# ------------------------------------

# Nome do diretório do projeto
PROJECT_NAME="my-typescript-project"

# 1. Criar diretório do projeto e entrar nele
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# 2. Inicializar o projeto Node.js
echo "Inicializando projeto Node.js..."
npm init -y

# 3. Instalar TypeScript e Jest (com suas tipagens e ts-jest)
echo "Instalando TypeScript, Jest e tipos..."
npm install --save-dev typescript jest @types/jest ts-jest

# 4. (Opcional) Instalar @types/node caso queira suporte completo a tipagens do Node.js
# echo "Instalando definições de tipo para Node.js..."
# npm install --save-dev @types/node

# 5. Gerar tsconfig.json
echo "Gerando tsconfig.json..."
npx tsc --init

# 6. Gerar arquivo de configuração do Jest
echo "Gerando jest.config.js com ts-jest..."
npx ts-jest config:init

# 7. Criar estrutura de pastas e arquivos
echo "Criando estrutura de diretórios e arquivos..."

# Define o diretório base
BASE_DIR="src"

# Cria os diretórios
mkdir -p "${BASE_DIR}/config"
mkdir -p "${BASE_DIR}/controllers"
mkdir -p "${BASE_DIR}/data"
mkdir -p "${BASE_DIR}/routes"
mkdir -p "${BASE_DIR}/services/__tests__"  # Pasta de testes específica para "services"

# Cria arquivos dentro dos diretórios
touch "${BASE_DIR}/config/database.ts"
touch "${BASE_DIR}/controllers/customer.controller.ts"
touch "${BASE_DIR}/data/customer.repository.ts"
touch "${BASE_DIR}/routes/customer.routes.ts"
touch "${BASE_DIR}/services/customer.service.ts"

# Cria um arquivo de teste para a camada de service
cat <<EOF > "${BASE_DIR}/services/__tests__/customer.service.spec.ts"
// Exemplo básico de teste unitário Jest para CustomerService

describe('CustomerService', () => {
  it('deve rodar um teste simples de exemplo', () => {
    expect(true).toBe(true);
  });
});
EOF

# Cria arquivos na raiz de src
touch "${BASE_DIR}/app.ts"
touch "${BASE_DIR}/server.ts"

# 8. Mensagem final e listagem
echo "Estrutura de projeto criada com sucesso!"
echo
tree "${BASE_DIR}" || ls -R "${BASE_DIR}"

echo
echo "Para continuar, você pode:"
echo "  1. Abrir o diretório '${PROJECT_NAME}' em seu editor/IDE preferido."
echo "  2. Customizar o tsconfig.json e jest.config.js, se necessário."
echo "  3. Instalar outras dependências como express, mongodb, etc."
echo "  4. Rodar os testes com: npm test (você pode ajustar seu script de teste no package.json)."
echo
echo "Exemplo:"
echo "  cd ${PROJECT_NAME}"
echo "  npm install express @types/express"
echo
echo "Bom desenvolvimento!"
