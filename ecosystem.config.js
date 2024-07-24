module.exports = {
    apps: [
      {
        name: 'nguyenngocbao.info', // Tên của ứng dụng
        script: 'node_modules/.bin/next', // Đường dẫn đến script Next.js
        args: 'start -p 4000', // Các tham số để chạy ứng dụng, thay đổi cổng nếu cần
        cwd: './', // Thư mục làm việc của ứng dụng
        env: {
          NODE_ENV: 'production', // Môi trường làm việc
        },
      },
    ],
  };
  