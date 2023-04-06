#!/bin/sh
CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"

$CMD_MYSQL -e "create table sample (
    id int(10)  AUTO_INCREMENT NOT NULL primary key,
    name varchar(50) NOT NULL
    );"

$CMD_MYSQL -e "create table mst_tooltip (
    id int  AUTO_INCREMENT NOT NULL primary key,
    word varchar(50) NOT NULL,
    description varchar(200) NOT NULL,
    asking varchar(50) NOT NULL,
    url varchar(200),
    image_url varchar(50),
    view_number int NOT NULL,
    login_type int NOT NULL
   );"

$CMD_MYSQL -e "create table trn_feedback (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tooltip_id int NOT NULL,
    user_id int ,
    insert_time timestamp NOT NULL default current_timestamp on update current_timestamp 
    );"

$CMD_MYSQL -e "create table mst_feedback (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tooltip_id int NOT NULL,
    feedback_name varchar(30) NOT NULL
    );"


$CMD_MYSQL -e  "insert into mst_tooltipDB values (1,'西田','エンジニア','','',0,0);"
$CMD_MYSQL -e  "INSERT INTO trn_feedback(tooltip_id ,user_id) VALUES (0,0)"

ALTER TABLE tooltip_DB.mst_tooltip MODIFY COLUMN view_number int 1 NOT NULL;