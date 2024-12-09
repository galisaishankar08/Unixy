# Unixy-API Project

## Commands to Execute Unixy-API Project

1. **Clone the repository:**
    ```sh
    git clone https://github.com/BrahmaiahBachu/unixy-api.git
    cd unixy-db
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables.
    ```sh
    cp .env.example .env
    ```

    Example:
    ```
    NODE_ENV="development"
    SERVER_HOSTNAME="localhost"
    SERVER_PORT=3003

    SERVER_USERNAME=""
    SERVER_PASSWORD=""

    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    GOOGLE_CALLBACK_URL="http://localhost:3003/api/auth/google/callback"

    SESSION_SECRET="unixysecret"
    JWT_SECRET="unixyjwt"
    REFRESH_TOKEN_SECRET="unixyrefresh"
    RESET_PASSWORD_SECRET="unixyreset"

    EMAIL_USER="user@gmail.com"
    EMAIL_PASS=""
    FRONTEND_URL="http://localhost:3000"
    ```

5. **Link Package:**
    ```sh
    npm link unixy-db
    ```

6. **Run Server:**
    ```sh
    npm run dev
    ```
