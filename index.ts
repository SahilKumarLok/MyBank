#!/usr/bin/env node

import inquirer from "inquirer";

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

class BankAccountImpl implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrawal of $${amount} successful.`);
      console.log(`Remaining Balance: $${this.balance}`);
    } else {
      console.log(`Insufficient funds.`);
    }
  }

  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(`Deposit of $${amount} successful`);
    console.log(`Remaining Balance: $${this.balance} `);
  }

  checkBalance(): void {
    console.log(`Your current balance is: $${this.balance}`);
  }
}

class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    mobileNumber: number,
    age: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

const accounts: BankAccount[] = [
  new BankAccountImpl(1100, 500),
  new BankAccountImpl(1010, 1000),
  new BankAccountImpl(1001, 1500),
];

const customers: Customer[] = [
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

    const customer = customers.find(
      (customer) => customer.account.accountNumber === accountNumberInput.accountNumber
    );

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
    } else {
      console.log("Account not found. Please contact the nearby branch");
    }
  } while (true);
}

service();