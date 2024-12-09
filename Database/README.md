# Unixy-DB Package

## Commands to Execute Unixy-DB Package

1. **Clone the repository:**
    ```sh
    git clone https://github.com/BrahmaiahBachu/unixy-db.git
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
    DATABASE_URL="mysql://root:<password>@localhost:3306/unixy_db"
    ```

4. **Run database migrations:**
    ```sh
    npm run migrate
    ```

5. **Build the project:**
    ```sh
    npm run build
    ```

6. **Link Package:**
    ```sh
    npm link
    ```
