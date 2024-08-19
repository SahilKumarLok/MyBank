#!/usr/bin/env node
import inquirer from "inquirer";
class BankAccountImpl {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.`);
            console.log(`Remaining Balance: $${this.balance}`);
        }
        else {
            console.log(`Insufficient funds.`);
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful`);
        console.log(`Remaining Balance: $${this.balance} `);
    }
    checkBalance() {
        console.log(`Your current balance is: $${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, mobileNumber, age, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccountImpl(1100, 500),
    new BankAccountImpl(1010, 1000),
    new BankAccountImpl(1001, 1500),
];
const customers = [
    new Customer("Hamza", "Khan", "Male", 35, 3161234567, accounts[0]),
    new Customer("Ayesha", "Khan", "Female", 24, 3331234567, accounts[1]),
    new Customer("Sahil", "Kumar", "Male", 35, 3411234567, accounts[2]),
];
async function service() {
    console.log("Welcome to XYZ Bank");
    console.log("Please enter your account number to proceed");
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            message: "Enter your account number",
            type: "number",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}`);
            console.log("Please select an option from the menu below");
            const ans = await inquirer.prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
            });
            switch (ans.action) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter the amount you want to deposit: ",
                        type: "number",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter the amount you want to withdraw: ",
                        type: "number",
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the program...");
                    console.log("\nThank you for using our bank services");
                    console.log("Have a great day!");
                    return;
            }
        }
        else {
            console.log("Account not found. Please contact the nearby branch");
        }
    } while (true);
}
service();
