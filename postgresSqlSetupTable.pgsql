
DROP TABLE IF EXISTS tb_user, tb_article;


-- CREATE TABLE "tb_user_login" (
--     "login_id" SERIAL PRIMARY KEY,
--     "user_id" int,
--     "login_time" varchar,
--     "expire_time" varchar
-- );

CREATE TABLE "tb_user" (
    "user_id" SERIAL PRIMARY KEY,
    "username" varchar,
    "password" varchar,
    "user_pic_path" varchar
);

CREATE TABLE "tb_article" (
    "article_id" SERIAL PRIMARY KEY,
    "user_id" int,
    "description" varchar,
    CONSTRAINT fk_tb_user_to_tb_article_key_user_id
    FOREIGN KEY(user_id) 
    REFERENCES tb_user(user_id)
);
