# Whatsapp Chat BOT (bisa connect dengan Chatgpt)

by :
Kevin Kenardi

with [Node JS](https://nodejs.org/en/download/)

## Installasi

- Buka CMD atau Terminal

- Clone aplikasi dari github
    ```bash
    git clone https://github.com/KevinKenardi/CS-chatbot.git
    ```

- Masuk ke directory
    ```bash
    cd CS-chatbot
    ```

- Install package
    ```bash
    npm install
    ```

- Copy file .env.example dan rename menjadi .env
    ```bash
    cp .env.example .env
    ```

- Jika ingin menggambungkan dengan API Chat GPT,
  isi API KEY dari [OpenAI](https://beta.openai.com/account/api-keys)

  `OPENAI_API_KEY=PASTE_API_KEY_DISINI`
    
## Cara Menggunakan

- Masuk ke directory atau folder aplikasi
- Buka CMD atau terminal pada directory atau folder tersebut
- Run aplikasi
    ```bash
    npm run start
    ```
- Buka WhatsApp dan buka menu linked devices lalu scan barcode yang muncul pada CMD atau terminal
- Lakukan Chat sesuai dengan menu yang telah di generate oleh bot

note :
- Dalam Case ini, BOT digunakan sebagai Customer Service sebuah perusahaan ISP
- Anda bisa mengganti logika dalam kode sesuai dengan kebutuhan Anda
- Jika Ingin menggunakan CHATGPT, Anda bisa meng-aktifkan logika kode chatgpt pada apps.js dan juga mengisi .env dengan API key Anda
