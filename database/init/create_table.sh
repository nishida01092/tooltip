#!/bin/sh
CMD_MYSQL="mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}"

$CMD_MYSQL -e "create table sample (
    id int(10)  AUTO_INCREMENT NOT NULL primary key,
    name varchar(50) NOT NULL
    );"

$CMD_MYSQL -e "create table mst_tooltipDB (
    id int  AUTO_INCREMENT NOT NULL primary key,
    word varchar(50) NOT NULL,
    description varchar(100) NOT NULL,
    url varchar(50),
    image_url varchar(50),
    view_number int NOT NULL,
    login_type int NOT NULL
    );"

$CMD_MYSQL -e "create table trn_feedback (
    id int AUTO_INCREMENT NOT NULL,
    tooltip_id int NOT NULL,
    user_id int ,
    insert_time timestamp NOT NULL
    );"

$CMD_MYSQL -e "create table mst_feedback (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tooltip_id int NOT NULL,
    feedback varchar(100)
    );"


$CMD_MYSQL -e  "insert into mst_tooltipDB values (1,'西田','エンジニア','','',1,1);"