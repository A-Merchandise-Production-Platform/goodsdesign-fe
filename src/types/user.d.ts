//         "id": "0e2763ac-e4a7-438a-832b-7e0ece12d241",
//         "displayName": "Admin",
//         "handle": "@admin",
//         "email": "admin@example.com",
//         "bio": null,
//         "avatarUrl": null,
//         "verified": false,
//         "role": "USER",
//         "isBanned": false,
//         "isDeleted": false,
//         "createdAt": "2024-11-28T01:30:22.143Z",
//         "updatedAt": "2024-11-28T01:30:22.143Z"

export interface User {
  id: string
  displayName: string
  handle: string
  email: string
  bio: string | null
  avatarUrl: string | null
  verified: boolean
  role: RoleEnum
  isBanned: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
