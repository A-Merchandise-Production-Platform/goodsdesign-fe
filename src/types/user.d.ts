//         "id": "13a6a8c8-3a23-4b49-8718-f357315f496c",
//         "email": "admin@gmail.com",
//         "userName": "admin",
//         "phoneNumber": null,
//         "gender": true,
//         "dateOfBirth": "1990-01-01T00:00:00Z",
//         "imageUrl": "https://example.com/admin.jpg",
//         "role": "customer"

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  gender: boolean;
  dateOfBirth: Date;
  role: string;
  imageUrl: string;
}
