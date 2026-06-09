<?php

class Database
{
    private $host = "sql101.infinityfree.com";
    private $username = "if0_42129506";
    private $password = "BPLygCcET7o21";
    private $dbname = "if0_42129506_blood_bank_mangement_system";

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