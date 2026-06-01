<?php

class Database
{
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "blood_bank";

    public function connect()
    {
        $conn = mysqli_connect(
            $this->host,
            $this->username,
            $this->password,
            $this->dbname
        );

        if (!$conn) {
            die("Connection Failed: " . mysqli_connect_error());
        }

        return $conn;
    }
}