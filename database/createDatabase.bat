@echo off
echo DROP DATABASE IF EXISTS Users; | psql
echo CREATE DATABASE Users; | psql 
psql jobdb < schema.sql
psql jobdb < users.sql