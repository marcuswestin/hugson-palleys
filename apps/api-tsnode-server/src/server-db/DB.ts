import { assert } from "console"
import { MongoClient } from "mongodb"
import {
  AccountID,
  Availability,
  AvailabilityID,
  DisplayName,
  PhoneNumber,
} from "../shared/universal/api/types"
import { config } from "../shared/universal/config"

const mongoDB = new MongoClient(config.mongoDB.url)

const db = mongoDB.db(config.mongoDB.dbName)
const Users = db.collection("Users")
const Availabilities = db.collection("Availabilities")

const DB = new (class DB {
  constructor() {}

  async connect() {
    await mongoDB.connect()
    await Users.createIndex("phoneNumber", { unique: true })
    await Availabilities.createIndex("accoundID", { unique: false })
  }

  async createAccount(phoneNumber: PhoneNumber, displayName: DisplayName): Promise<AccountID> {
    let res = await Users.insertOne({ phoneNumber, displayName })
    assert(res.acknowledged)
    return AccountID(res.insertedId.toString())
  }

  async createAvailability(accountID: AccountID, time: Date) {
    let res = await Availabilities.insertOne({ accountID: accountID, time: time })
    assert(res.acknowledged)
    return AvailabilityID(res.insertedId.toString())
  }

  async getAccountAvailabilities(accountID: AccountID) {
    let res = await Availabilities.find({ accountID })
    return (await res.toArray()) as unknown as Availability[]
  }
})()

export default DB
