"use strict";

enum Gender {
  male = "male",
  female = "female",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      address: {
        address: string;
        city: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        postalCode: string;
        state: string;
      };
      department: string;
      name: string;
      title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
      coin: string;
      wallet: string;
      network: string;
    };
  };
}

let usersArr: unknown;

async function getData() {
  try {
    await fetch("https://dummyjson.com/users")
      .then((res) => res.json() as Promise<User>)
      .then((users) => {
        usersArr = users;
      });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

//added smt...
