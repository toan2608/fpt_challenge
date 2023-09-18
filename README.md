# fpt_challenge
Do bọn em chưa có server nên bọn em chỉ code ở local (SQL dùng XAMPP còn NoSQL dùng MongoDB). các bước để chạy project trên local:
1. clone code từ git về máy
2. tạo file env trong folder back_end và copy đoạn code sau vào file env{
      APP_HOST="localhost"
      APP_PORT = 9999
   // Database
      DB_CLIENT=mysql
      DB_HOST = "localhost"
      DB_USER = root
      DB_PASSWORD = ""
      DB_NAME = "fpt_chanllenge"
      JWT_KEY = "toandeptrai"
      JWT_REFRESH_KEY = "sapcony"
}
4. Mở folder mqtt dùng lệnh npm i (để cài đặt các thư viện sử dụng trong folder mqtt) sau đó dùng lệnh npm start (để chạy) để subscribe các bản tin được gửi từ sensor (folder mqtt_tool là cái để em fake dữ liệu và gửi chứ xong cần phải đợi phần cứng xong thì em mới làm)
5. Mở folder back_end và front_end dùng lệnh npm i (để cài đặt các thư viện sử dụng trong folder front_end và back_end) sau đó chạy dùng lệnh npm start.
6. Chiêm ngưỡng project.
