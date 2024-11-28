# designogkonstruktion-backend
Express and sequelize based back-end API code to communicate with the Database


1.
```
npm install
```

2.
Rename `.env.sample` to `.env` and fill out the credentials for the database.

3.
```
node server.js
```


Dummy data for the users table:
```
INSERT INTO `user` (`user_id`, `user_fullname`, `user_mail`, `user_password`, `user_img`, `user_admin`, `user_created`, `user_updated`) VALUES
(2, 'Jonas', 'jon@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', NULL, 1, NOW(), NOW()),
(3, 'Jacob', 'jac@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', NULL, 1, NOW(), NOW()),
(4, 'David', 'dav@vfl.dk', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', NULL, 1, NOW(), NOW()),
(5, 'Eivind', 'eivind@example.com', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', NULL, 0, NOW(), NOW()),
(6, 'Karen', 'karen@example.com', '$2b$10$AiLDjp3e4arhAcN.KVCSlekUdkm4BB2IsUi.QkKojvY1jEeTujwlK', NULL, 0, NOW(), NOW());
```
