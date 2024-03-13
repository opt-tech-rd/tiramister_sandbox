package org.example

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

object TestTable: IntIdTable("test_exposed") {
    val name = varchar("name", 50)
    val age = integer("age")
}

fun main() {
    val host = "### SENSORED ###"
    val port = 5432
    val database = "### SENSORED ###"
    val username = "### SENSORED ###"
    val password = "### SENSORED ###"

    Database.connect(
        "jdbc:postgresql://$host:$port/$database",
        driver = "org.postgresql.Driver",
        user = username,
        password = password
    )

    transaction {
        addLogger(StdOutSqlLogger)

        // テーブル作成
        SchemaUtils.create(TestTable)

        TestTable.insert {
            it[name] = "Hanako"
            it[age] = 30
        }

        TestTable.selectAll().forEach { row ->
            println("${row[TestTable.id]}: ${row[TestTable.name]} is ${row[TestTable.age]} years old")
        }
    }
}
