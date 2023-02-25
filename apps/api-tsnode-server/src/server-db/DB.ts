import { PrismaClient } from "@prisma/client"
import { AccountID, DisplayName, PhoneNumber } from "../shared/universal/api/types"
import { config } from "../shared/universal/config"

const prisma = new PrismaClient({ datasources: { db: { url: config.pgDB.getURL() } } })
const Accounts = prisma.account
const Users = prisma.user
const Posts = prisma.post

const DB = new (class DB {
  constructor() {}

  async connect() {
    await prisma.$connect()
  }

  async createAccount(phoneNumber: PhoneNumber, displayName: DisplayName): Promise<AccountID> {
    console.log("CREATEA CCOUNT")
    const user = await Accounts.create({ data: { phoneNumber, displayName } })
    console.log("ACCOUNT CREATED", user)
    return AccountID(user.id)
  }

  async createAvailability(accountID: AccountID, time: Date) {
    // let res = await Availabilities.insertOne({ accountID: accountID, time: time })
    // assert(res.acknowledged)
    // return AvailabilityID(res.insertedId.toString())
  }

  async getAccountAvailabilities(accountID: AccountID) {
    // let res = await Availabilities.find({ accountID })
    // return (await res.toArray()) as unknown as Availability[]
  }
})()

async function test() {
  DB.connect()
  //   DB.createAccount(PhoneNumber("+14156015653"), DisplayName("Marcus"))
  const accounts = Accounts.findMany({ where: { phoneNumber: { startsWith: "+" } } })

  console.log("ACCOUNTS", await accounts)
}
test()

export default DB
