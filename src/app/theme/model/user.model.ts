export class User {
    constructor(public email: string,// User email
                public password: string,// User password
                public nickName?: string, // User nickname
                public firstName?: string, // User firstname
                public lastName?: string,// User lastnamel
                public birth?: any,// User birth
                public role?: number,// User role in the LAN MANAGER
                public lock?: boolean,// User lock or unlock for The LAN MANAGER
                public street?: string,// User address street
                public nr?: number,// User address street number
                public postalCode?: number,// User address postal code
                public city?: string,// User address city
                public agb?: boolean, // AGB
                public seat?: number,// User seat on the LAN Party
                public clan?: string,
                public packetId?: number,// Packet id (LAN Packet | 0 = spar, 1 = complete, 2 = individually)
                public packetPaid?: boolean,// Packet paid or not
                public packetPrice?: number,// Packet price
                public lanFood?: number,// Food id
                public lanVegi?: boolean,// User vegitable
                public lanSum?: number,// Outher coast like drinks, snacks and so on
                public lanPaid?: boolean// Paid all

    ) {
    }
}
